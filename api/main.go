package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/google/uuid"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type TODO struct {
	Id      string     `json:"id"`
	Name    string     `json:"name"`
	DoneAt  *time.Time `json:"doneAt"`
	DueDate time.Time  `json:"dueDate"`
	UserId  string     `json:"userId"`
}

type USER struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Login struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

var TODOS = []TODO{
	{Id: "1", Name: "Estudar React", DueDate: time.Date(2022, 03, 04, 8, 34, 0, 0, time.Local), UserId: "1"},
}

var USERS = []USER{
	{Id: "1", Name: "React", Email: "react@proway.com", Password: "123456"},
}

func Ping(w http.ResponseWriter, r *http.Request) {
	respondWithJSON(w, http.StatusOK, map[string]string{"message": "Bem-vindo a API de Tarefas"})
}

func GetSubFromToken(r *http.Request) (string, error) {
	authHeader := strings.Split(r.Header.Get("Authorization"), "Bearer ")
	if len(authHeader) != 2 {
		return "", errors.New("token de autorização não foi enviado")
	}

	accessToken := authHeader[1]

	token, err := jwt.ParseWithClaims(accessToken, &TokenClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(AccessTokenSecret), nil
	})

	if err != nil {
		return "", errors.New("token malformado")
	}

	if claims, ok := token.Claims.(*TokenClaims); ok && token.Valid {
		return claims.Sub, nil
	} else {
		return "", errors.New("token inválido")
	}
}

func GetTodosOfUser(w http.ResponseWriter, r *http.Request) {
	sub, err := GetSubFromToken(r)
	if err != nil {
		respondWithJSON(w, http.StatusUnauthorized, map[string]string{"error": err.Error()})
		return
	}

	var userTodos []TODO
	for _, todo := range TODOS {
		if todo.UserId == sub {
			userTodos = append(userTodos, todo)
		}
	}

	respondWithJSON(w, http.StatusOK, userTodos)
}

type TokenClaims struct {
	Sub string `json:"sub"`
	jwt.StandardClaims
}

var AccessTokenSecret = []byte("b13ff247-cf1a-4b92-9102-918af04g6d1c")

func CreateAccessToken(sub string) string {
	expirationTime := time.Now().Add(120 * time.Hour)
	claims := &TokenClaims{
		Sub: sub,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(AccessTokenSecret)
	if err != nil {
		log.Fatal(err)
	}

	return tokenString
}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	var login Login
	if err := json.NewDecoder(r.Body).Decode(&login); err != nil {
		respondWithJSON(w, http.StatusBadRequest, map[string]string{"error": "parâmetros inválidos"})
		return
	}

	for _, user := range USERS {
		if user.Email == login.Username && user.Password == login.Password {
			token := CreateAccessToken(user.Id)
			respondWithJSON(w, http.StatusOK, map[string]string{"token": token})
			return
		}
	}

	respondWithJSON(w, http.StatusUnauthorized, map[string]string{"error": "e-mail ou senha inválidos"})
}

func CreateTodo(w http.ResponseWriter, r *http.Request) {
	sub, err := GetSubFromToken(r)
	if err != nil {
		respondWithJSON(w, http.StatusUnauthorized, map[string]string{"error": err.Error()})
		return
	}

	var todo TODO
	if err := json.NewDecoder(r.Body).Decode(&todo); err != nil {
		respondWithJSON(w, http.StatusBadRequest, map[string]string{"error": "parâmetros inválidos"})
		return
	}

	todo.Id = uuid.NewString()
	todo.UserId = sub
	TODOS = append(TODOS, todo)

	respondWithJSON(w, http.StatusCreated, todo)
}

func UpdateTodo(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	var updatedTodo TODO
	if err := json.NewDecoder(r.Body).Decode(&updatedTodo); err != nil {
		respondWithJSON(w, http.StatusBadRequest, map[string]string{"error": "parâmetros inválidos"})
		return
	}

	for i, todo := range TODOS {
		if todo.Id == id {
			TODOS[i].Name = updatedTodo.Name
			TODOS[i].DueDate = updatedTodo.DueDate
			TODOS[i].DoneAt = updatedTodo.DoneAt

			respondWithJSON(w, http.StatusOK, TODOS[i])
			return
		}
	}

	respondWithJSON(w, http.StatusNotFound, map[string]string{"error": "tarefa não encontrada"})
}

func DeleteTodo(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	for i, todo := range TODOS {
		if todo.Id == id {
			TODOS = append(TODOS[:i], TODOS[i+1:]...)
			respondWithJSON(w, http.StatusNoContent, nil)
			return
		}
	}

	respondWithJSON(w, http.StatusNotFound, map[string]string{"error": "tarefa não encontrada"})
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	var user USER
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		respondWithJSON(w, http.StatusBadRequest, map[string]string{"error": "parâmetros inválidos"})
		return
	}

	user.Id = uuid.NewString()
	USERS = append(USERS, user)
	respondWithJSON(w, http.StatusCreated, user)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	var updatedUser USER
	if err := json.NewDecoder(r.Body).Decode(&updatedUser); err != nil {
		respondWithJSON(w, http.StatusCreated, updatedUser)
		return
	}

	for i, user := range USERS {
		if user.Id == id {
			USERS[i].Name = updatedUser.Name

			respondWithJSON(w, http.StatusOK, USERS[i])
			return
		}
	}

	respondWithJSON(w, http.StatusNotFound, map[string]string{"error": "usuário não encontrado"})
}

func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(payload)
}

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/", Ping).Methods("GET")
	r.HandleFunc("/todos", GetTodosOfUser).Methods("GET")
	r.HandleFunc("/todos", CreateTodo).Methods("POST")
	r.HandleFunc("/todos/{id}", UpdateTodo).Methods("PUT")
	r.HandleFunc("/todos/{id}", DeleteTodo).Methods("DELETE")
	r.HandleFunc("/users", CreateUser).Methods("POST")
	r.HandleFunc("/users/{id}", UpdateUser).Methods("PUT")
	r.HandleFunc("/users/login", LoginUser).Methods("POST")

	handler := handlers.LoggingHandler(os.Stdout, handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "PATH", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Accept", "X-Requested-With", "Content-Type", "Content-Length", "Origin", "Accept-Encoding", "X-CSRF-Token", "Cache-Control", "Authorization", "User-Agent"}),
		handlers.AllowCredentials(),
	)(r))

	handler = handlers.RecoveryHandler(handlers.PrintRecoveryStack(true))(handler)

	srv := &http.Server{
		Addr:    "127.0.0.1:9090",
		Handler: handler,
	}

	fmt.Println("API de tarefas está rodando na porta 9090")

	log.Fatal(srv.ListenAndServe())
}
