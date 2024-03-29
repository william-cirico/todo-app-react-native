import { useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../api/api";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

type AuthContextType = {
    userId: string;
    isLogged: boolean;
    login: (data: Login) => void;
    logout: VoidFunction;
}

const AuthContext = createContext<AuthContextType>(null!);

type Login = {
    username: string;
    password: string;
}

export function AuthContextProvider({ children }: { children: ReactNode }) {
    const [userId, setUserId] = useState("");

    function login({ username, password }: Login) {
        auth()
            .signInWithEmailAndPassword(username, password)
            .catch(() => Alert.alert("Falha!", "E-mail ou senha incorretos"))
    }

    // Integração com API
    // const { mutate: login } = useMutation({
    //     mutationFn: (data: Login) => userLogin(data.username, data.password),
    //     mutationKey: ["login"],
    //     onError: () => Alert.alert("Falha", "O login falhou. Verifique o e-mail e a senha"),
    //     onSuccess: async ({ token }) => {
    //         const decodedToken = jwtDecode<{ sub: string}>(token);
    //         await AsyncStorage.setItem("@AccessToken_key", token);
    //         API.defaults.headers.common["Authorization"] = "Bearer "+token;
    //         setUserId(decodedToken.sub);
    //     }
    // });

    const queryClient = useQueryClient();

    function logout() {
        auth().signOut();
    }
    // async function logout() {
    //     await AsyncStorage.removeItem("@AccessToken_key");
    //     API.defaults.headers.common["Authorization"] = "";
    //     queryClient.invalidateQueries(["todos"]);
    //     setUserId("");
    // }

    const isLogged = !!userId;

    // useEffect(() => {
    //     (async () => {
    //         const token = await AsyncStorage.getItem("@AccessToken_key");
    //         const decodedToken = jwtDecode<{ sub: string }>(token);
    //         API.defaults.headers.common["Authorization"] = "Bearer "+token;
    //         setUserId(decodedToken.sub);
    //     })();
    // }, []);

    return (
        <AuthContext.Provider value={{ login, userId, isLogged, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);