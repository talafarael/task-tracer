package router

import "net/http"

// func New() * {
// 	return &{
//
// 	}
// }

func New() *http.ServeMux {
	router := http.NewServeMux()
	router.HandleFunc("GET /tasks", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Это GET запрос"))
	})

	return router
}
