import { AddTodoType } from "../contexts/TodoContext";
import { Todo } from "../types/todo";
import API from "./api";

export function getTodos(): Promise<Todo[]> {
    return API.get(`/todos`).then(res => res.data);
}

export function deleteTodo(id: string): Promise<void> {
    return API.delete(`/todos/${id}`);
}

export function createTodo(data: AddTodoType): Promise<Todo> {
    return API.post("/todos", data).then(res => res.data);
}

export function updateTodo(todo: Todo): Promise<Todo> {
    return API.put(`/todos/${todo.id}`, todo).then(res => res.data);
}