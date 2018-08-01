package main

import (
	"context"
	"fmt"
	"runtime"

	"go.opencensus.io/exporter/stackdriver"
	"go.opencensus.io/trace"

	flag "github.com/bborbe/flagenv"
	"github.com/kolide/kit/version"
	"github.com/seibert-media/golibs/log"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"

	devhub "github.com/playnet-public/devhub/pkg"
)

const (
	appName = "DevHub"
	appKey  = "devhub"
)

var (
	dbg         = flag.Bool("debug", false, "enable debug mode")
	sentryDsn   = flag.String("sentryDsn", "", "sentry dsn key")
	versionInfo = flag.Bool("version", true, "show version info")
	port        = flag.Int("port", 8080, "http server port (default: 8080)")
	noop        = flag.Bool("noop", false, "disable all external api calls and only log actions")
	projectID   = flag.String("project-id", "", "stackdriver project id for tracing")
)

func main() {
	flag.Parse()

	if *versionInfo {
		v := version.Version()
		fmt.Printf("-- PlayNet %s --\n", appName)
		fmt.Printf(" - version: %s\n", v.Version)
		fmt.Printf("   branch: \t%s\n", v.Branch)
		fmt.Printf("   revision: \t%s\n", v.Revision)
		fmt.Printf("   build date: \t%s\n", v.BuildDate)
		fmt.Printf("   build user: \t%s\n", v.BuildUser)
		fmt.Printf("   go version: \t%s\n", v.GoVersion)
	}
	runtime.GOMAXPROCS(runtime.NumCPU())

	var zapFields []zapcore.Field
	if !*dbg {
		zapFields = []zapcore.Field{
			zap.String("app", appKey),
			zap.String("version", version.Version().Version),
		}
	}

	logger := log.New(*sentryDsn, *dbg).WithFields(zapFields...)
	defer logger.Sync()

	logger.Sentry.SetRelease(version.Version().Version)

	logger.Info("preparing")

	ctx := log.WithLogger(context.Background(), logger)

	log.From(ctx).Info("creating stackdriver client")
	err := initStackdriver(ctx, *projectID)
	if err != nil {
		log.From(ctx).Fatal("creating stackdriver client")
	}

	srv := &devhub.Server{
		Port: *port,
	}

	err = srv.PrepareAndServe(ctx)
	if err != nil {
		log.From(ctx).Fatal("server error", zap.Error(err))
	}

	log.From(ctx).Info("finished")
}

func initStackdriver(ctx context.Context, projectID string) error {
	exporter, err := stackdriver.NewExporter(stackdriver.Options{
		ProjectID: projectID,
		OnError: func(err error) {
			log.From(ctx).Error("stackdriver trace", zap.Error(err))
		},
	})
	if err != nil {
		return err
	}
	trace.RegisterExporter(exporter)
	trace.WithSampler(trace.AlwaysSample())
	return nil
}
