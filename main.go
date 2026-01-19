package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	public := "."

	fs := http.FileServer(http.Dir(public))

	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := filepath.Join(public, filepath.Clean(r.URL.Path))

		if info, err := os.Stat(path); err == nil {
			if info.IsDir() {
				http.NotFound(w, r)
				return
			}
			fs.ServeHTTP(w, r)
			return
		}

		http.ServeFile(w, r, filepath.Join(public, "index.html"))
	})

	fmt.Println("http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
