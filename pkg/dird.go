package devhub

import (
	"errors"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"strings"
)

// A DirD implements FileSystem using the native file system restricted to a
// specific directory tree.
type DirD struct {
	Dir string
	Def string
}

// Open : if a file is not found in DirD.Dir,
// it will serve a default file specified by DirD.Def
// While the FileSystem.Open method takes '/'-separated paths, a Dir's string
// value is a filename on the native file system, not a URL, so it is separated
// by filepath.Separator, which isn't necessarily '/'.
//
// An empty Dir is treated as ".".
func (d DirD) Open(name string) (http.File, error) {
	if filepath.Separator != '/' && strings.ContainsRune(name, filepath.Separator) ||
		strings.Contains(name, "\x00") {
		return nil, errors.New("http: invalid character in file path")
	}
	dir := string(d.Dir)
	if dir == "" {
		dir = "."
	}
	f, err := os.Open(filepath.Join(dir, filepath.FromSlash(path.Clean("/"+name))))
	if err != nil {
		fDef, errDef := os.Open(filepath.Join(dir, filepath.FromSlash(path.Clean("/"+d.Def))))
		if errDef != nil {
			return nil, errDef
		}
		return fDef, nil
	}
	return f, nil
}
