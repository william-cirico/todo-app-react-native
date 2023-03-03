import { createContext, ReactNode, useContext, useState } from "react";
import { Todo } from "../types/todo";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";

type TodoContextType = {
    todos: Todo[];
    addTodo: (name: string, dueDate: string) => void;
    removeTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextType>(null!);

export function TodoContextProvider({ children }: { children: ReactNode }) {
    const [todos, setTodos] = useState<Todo[]>([
        { id: "1", name: "Estudar React", doneAt: "", dueDate: "2023-02-28T20:00:00" },
        { id: "2", name: "Estudar React Native", doneAt: "", dueDate: "2023-02-28T20:00:00" },
    ]);

    function addTodo(name: string, dueDate: string) {
        const newTodo: Todo = {
            id: uuid(),
            name,
            dueDate,
            doneAt: ""
        }

        setTodos([...todos, newTodo]);
    }

    function removeTodo(id: string) {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    }

    function toggleTodo(id: string) {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.doneAt = dayjs().toISOString();
            }

            return todo;
        });

        setTodos(updatedTodos);
    }

    return (
        <TodoContext.Provider value={{ todos, addTodo, removeTodo, toggleTodo }}>
            { children }
        </TodoContext.Provider>
    );
}

export const useTodo = () => useContext(TodoContext);