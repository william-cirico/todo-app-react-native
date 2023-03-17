import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import { createContext, ReactNode, useContext } from "react";
import { Alert } from "react-native";
import "react-native-get-random-values";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../api/todos";
import { Todo } from "../types/todo";

type TodoContextType = {
    todos: Todo[];
    addTodo: (todo: AddTodoType) => void;
    removeTodo: (id: string) => void;
    toggleTodo: (todo: Todo) => void;
    isLoading: boolean;
}

const TodoContext = createContext<TodoContextType>(null!);

export type AddTodoType = {
    name: string;
    dueDate: string;
}

export function TodoContextProvider({ children }: { children: ReactNode }) {
    // function addTodo(name: string, dueDate: string) {
    //     const newTodo: Todo = {
    //         id: uuid(),
    //         name,
    //         dueDate,
    //         doneAt: ""
    //     }

    //     // setTodos([...todos, newTodo]);
    // }

    const queryClient = useQueryClient();

    const { mutate: addTodo } = useMutation({
        mutationFn: (todo: AddTodoType) => createTodo(todo),
        onMutate: async (todo: AddTodoType) => {
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['todos'] })

            // Snapshot the previous value
            const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])

            // Optimistically update to the new value
            if (previousTodos) {
                queryClient.setQueryData<Todo[]>(['todos'], [
                    ...previousTodos,
                    {
                        id: Math.random().toString(),
                        name: todo.name,
                        dueDate: todo.dueDate,
                        doneAt: ""
                    }
                ])
            }

            return { previousTodos }
        },
        // If the mutation fails,
        // use the context returned from onMutate to roll back
        onError: (err, variables, context) => {
            if (context?.previousTodos) {
                queryClient.setQueryData<Todo[]>(['todos'], context.previousTodos)
            }
        },
        // Always refetch after error or success:
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    });

    const { mutate: removeTodo } = useMutation({
        mutationFn: (id: string) => deleteTodo(id),
        onMutate: async (id: string) => {
            await queryClient.cancelQueries({ queryKey: ['todos'] })

            // Snapshot the previous value
            const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])

            // Optimistically update to the new value
            if (previousTodos) {
                const filteredTodos = previousTodos.filter(todo => todo.id !== id);
                queryClient.setQueryData<Todo[]>(['todos'], filteredTodos)
            }

            return { previousTodos }
        },
        // If the mutation fails,
        // use the context returned from onMutate to roll back
        onError: (err, variables, context) => {
            if (context?.previousTodos) {
                queryClient.setQueryData<Todo[]>(['todos'], context.previousTodos)
            }
        },
        // Always refetch after error or success:
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    });

    const { mutate: toggleTodo } = useMutation({
        mutationFn: (todo: Todo) => updateTodo(todo),
        onMutate: async (todo: Todo) => {
            await queryClient.cancelQueries({ queryKey: ['todos'] })

            // Snapshot the previous value
            const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])

            // Optimistically update to the new value
            if (previousTodos) {
                const updatedTodos = previousTodos.map(t => {
                    if (t.id === todo.id) {
                        t.doneAt = t.doneAt ? "" : dayjs().toISOString();
                    }

                    return t;
                });
                queryClient.setQueryData<Todo[]>(['todos'], updatedTodos)
            }

            return { previousTodos }
        },
        // If the mutation fails,
        // use the context returned from onMutate to roll back
        onError: (err, variables, context) => {
            console.log(err);
            if (context?.previousTodos) {
                queryClient.setQueryData<Todo[]>(['todos'], context.previousTodos)
            }
        },
        // Always refetch after error or success:
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    });

    // function removeTodo(id: string) {
    //     const updatedTodos = todos.filter(todo => todo.id !== id);
    // setTodos(updatedTodos);
    // }

    // function toggleTodo(id: string) {
    //     const updatedTodos = todos.map(todo => {
    //         if (todo.id === id) {
    //             todo.doneAt = todo.doneAt ? "" : dayjs().toISOString();
    //         }

    //         return todo;
    //     });

        // setTodos(updatedTodos);
    // }

    // Sem a biblioteca react-query
    // const [todos, setTodos] = useState<Todo[]>([]);
    // useEffect(() => {
    //     (async () => {
    //         const todos = await getTodos();
    //         setTodos(todos);
    //     })();
    // }, []);

    // Com a biblioteca react-query
    const { data: todos, isLoading } = useQuery({
        queryFn: getTodos,
        queryKey: ["todos"],
        onError: () => Alert.alert("Falha", "Não foi possível obter as tarefas.")
    });

    return (
        <TodoContext.Provider value={{ todos, isLoading, addTodo, removeTodo, toggleTodo }}>
            {children}
        </TodoContext.Provider>
    );
}

export const useTodo = () => useContext(TodoContext);