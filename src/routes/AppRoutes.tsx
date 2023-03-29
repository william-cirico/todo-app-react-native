import { useEffect, useState } from "react";
import { TodoContextProvider } from "../contexts/TodoContext";
import { GuestRoutes } from "./GuestRoutes";
import { ProtectedRoutes } from "./ProtectedRoutes";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export function AppRoutes() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    useEffect(() => {
        const subscriber = auth()
            .onAuthStateChanged(userData => {
                setUser(userData);

                if (initializing) {
                    setInitializing(false);
                }
            });

        return subscriber;
    }, []);

    if (initializing) {
        return null;
    }

    if (!user) {
        return <GuestRoutes />
    }

    return <TodoContextProvider>
        <ProtectedRoutes />
    </TodoContextProvider>
}