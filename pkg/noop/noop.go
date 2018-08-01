// Package noop offers a quick way for us to store the information whether or not the contexts
// chain should do writing external operations or not
package noop

import (
	"context"
)

// Noop context type
type Noop bool

// Key type inside context
type Key string

// DefaultKey for Noop inside context
var DefaultKey = Key("pn-noop-ctx")

// Set the Noop value for the passed in context and return a new one
func Set(ctx context.Context, n bool) context.Context {
	return context.WithValue(ctx, DefaultKey, Noop(n))
}

// From retrieves the boolean value from context
func From(ctx context.Context) bool {
	n, ok := ctx.Value(DefaultKey).(Noop)
	if !ok {
		return false
	}
	return bool(n)
}
