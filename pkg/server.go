package devhub

import (
	"context"
	"fmt"
	"net/http"

	"go.opencensus.io/plugin/ochttp"
	"go.opencensus.io/plugin/ochttp/propagation/b3"

	"github.com/gorilla/mux"
	"github.com/seibert-media/golibs/log"
	"go.uber.org/zap"
	secure "gopkg.in/unrolled/secure.v1"
)

// Server creates all required components and starts the http server
type Server struct {
	Port int
}

// PrepareAndServe the handler
func (s *Server) PrepareAndServe(ctx context.Context) error {

	m := mux.NewRouter()
	m.Path("/healthz").Methods("GET").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte(`{"status": "ok"}`))
	})
	m.PathPrefix("/").Methods("GET").Handler(http.FileServer(DirD{Dir: "ui/dist", Def: "index.html"}))

	lmw := &loggingMiddleware{
		log: log.From(ctx),
	}

	secureMiddleware := secure.New(secure.Options{
		STSSeconds:            315360000,
		STSIncludeSubdomains:  true,
		STSPreload:            true,
		FrameDeny:             true,
		ContentTypeNosniff:    true,
		BrowserXssFilter:      true,
		ContentSecurityPolicy: "script-src $NONCE",
	})

	handler := secureMiddleware.Handler(m)
	handler = lmw.handler(&ochttp.Handler{
		Handler:          handler,
		IsPublicEndpoint: true,
		Propagation:      &b3.HTTPFormat{},
	})

	server := &http.Server{
		Addr:    fmt.Sprintf(":%d", s.Port),
		Handler: handler,
	}
	log.From(ctx).Info("listening", zap.Int("port", s.Port))
	return server.ListenAndServe()
}

type loggingMiddleware struct {
	log *log.Logger
}

func (l *loggingMiddleware) handler(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		l.log.Debug("http request", zap.String("method", r.Method), zap.String("url", r.RequestURI))
		defer l.log.Debug("finished http request", zap.String("method", r.Method), zap.String("url", r.RequestURI))
		ctx := r.Context()

		r = r.WithContext(log.WithLogger(ctx, l.log))
		h.ServeHTTP(w, r)
	})
}
