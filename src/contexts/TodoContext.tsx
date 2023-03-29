import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import "react-native-get-random-values";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../api/todos";
import { Todo } from "../types/todo";
import firestore from "@react-native-firebase/firestore";

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
    dueDate: number;
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

    function addTodo({ name, dueDate }: AddTodoType) {
        firestore()
            .collection("todos")
            .add({
                name,
                dueDate,
            })
            .then(() => Alert.alert("Sucesso!", "Tarefa adicionada"))
            .catch(() => Alert.alert("Falha!", "Falha ao adicionar a tarefa"))
    }

    // const { mutate: addTodo } = useMutation({
    //     mutationFn: (todo: AddTodoType) => createTodo(todo),
    //     onMutate: async (todo: AddTodoType) => {
    //         // Cancel any outgoing refetches
    //         // (so they don't overwrite our optimistic update)
    //         await queryClient.cancelQueries({ queryKey: ['todos'] })

    //         // Snapshot the previous value
    //         const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])

    //         // Optimistically update to the new value
    //         if (previousTodos) {
    //             queryClient.setQueryData<Todo[]>(['todos'], [
    //                 ...previousTodos,
    //                 {
    //                     id: Math.random().toString(),
    //                     name: todo.name,
    //                     dueDate: todo.dueDate,
    //                     doneAt: ""
    //                 }
    //             ])
    //         }

    //         return { previousTodos }
    //     },
    //     // If the mutation fails,
    //     // use the context returned from onMutate to roll back
    //     onError: (err, variables, context) => {
    //         if (context?.previousTodos) {
    //             queryClient.setQueryData<Todo[]>(['todos'], context.previousTodos)
    //         }
    //     },
    //     // Always refetch after error or success:
    //     onSettled: () => {
    //         queryClient.invalidateQueries({ queryKey: ['todos'] })
    //     },
    // });

    function removeTodo(id: string) {
        firestore()
            .collection("todos")
            .doc(id)
            .delete()
            .catch(() => Alert.alert("Falha", "não foi possível remover a tarefa"))
    }

    // const { mutate: removeTodo } = useMutation({
    //     mutationFn: (id: string) => deleteTodo(id),
    //     onMutate: async (id: string) => {
    //         await queryClient.cancelQueries({ queryKey: ['todos'] })

    //         // Snapshot the previous value
    //         const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])

    //         // Optimistically update to the new value
    //         if (previousTodos) {
    //             const filteredTodos = previousTodos.filter(todo => todo.id !== id);
    //             queryClient.setQueryData<Todo[]>(['todos'], filteredTodos)
    //         }

    //         return { previousTodos }
    //     },
    //     // If the mutation fails,
    //     // use the context returned from onMutate to roll back
    //     onError: (err, variables, context) => {
    //         if (context?.previousTodos) {
    //             queryClient.setQueryData<Todo[]>(['todos'], context.previousTodos)
    //         }
    //     },
    //     // Always refetch after error or success:
    //     onSettled: () => {
    //         queryClient.invalidateQueries({ queryKey: ['todos'] })
    //     },
    // });

    function toggleTodo(todo: Todo) {
        firestore()
            .collection("todos")
            .doc(todo.id)
            .update({
                doneAt: !!todo.doneAt ? null : firestore.Timestamp.now()
            })
    }

    // const { mutate: toggleTodo } = useMutation({
    //     mutationFn: (todo: Todo) => updateTodo(todo),
    //     onMutate: async (todo: Todo) => {
    //         await queryClient.cancelQueries({ queryKey: ['todos'] })

    //         // Snapshot the previous value
    //         const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])

    //         // Optimistically update to the new value
    //         if (previousTodos) {
    //             const updatedTodos = previousTodos.map(t => {
    //                 if (t.id === todo.id) {
    //                     t.doneAt = t.doneAt ? "" : dayjs().toISOString();
    //                 }

    //                 return t;
    //             });
    //             queryClient.setQueryData<Todo[]>(['todos'], updatedTodos)
    //         }

    //         return { previousTodos }
    //     },
    //     // If the mutation fails,
    //     // use the context returned from onMutate to roll back
    //     onError: (err, variables, context) => {
    //         console.log(err);
    //         if (context?.previousTodos) {
    //             queryClient.setQueryData<Todo[]>(['todos'], context.previousTodos)
    //         }
    //     },
    //     // Always refetch after error or success:
    //     onSettled: () => {
    //         queryClient.invalidateQueries({ queryKey: ['todos'] })
    //     },
    // });

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
    // const { data: todos, isLoading } = useQuery({
    //     queryFn: getTodos,
    //     queryKey: ["todos"],
    //     onError: () => Alert.alert("Falha", "Não foi possível obter as tarefas.")
    // });

    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // one-time read
    // useEffect(() => {
    //     (async () => {
    //         const todosSnapshot = await firestore().collection("todos").get();
    //         const todos = todosSnapshot.docs.map(doc => ({
    //             id: doc.id,      
    //             name: doc.data()?.name,          
    //             doneAt: doc.data()?.doneAt?.seconds,
    //             dueDate: doc.data()?.dueDate?.seconds,
    //             location: doc.data()?.location,
    //         })) as Todo[];

    //         setTodos(todos);
    //         setIsLoading(false);
    //     })();
    // }, []);

    // real-time database
    useEffect(() => {
        const subscriber = firestore()
            .collection("todos")
            .onSnapshot(todosSnapshot => {
                const todos = todosSnapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data()?.name,
                    doneAt: doc.data()?.doneAt?.seconds,
                    dueDate: doc.data()?.dueDate?.seconds,
                    location: doc.data()?.location,
                })) as Todo[];

                setTodos(todos);

                if (isLoading) {
                    setIsLoading(false);
                }
            });

        return () => subscriber();
    }, []);

    return (
        <TodoContext.Provider value={{ todos, isLoading, addTodo, removeTodo, toggleTodo }}>
            {children}
        </TodoContext.Provider>
    );
}

export const useTodo = () => useContext(TodoContext);