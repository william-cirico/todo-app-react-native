import { useAuth } from "../contexts/AuthContext";
import { TodoContextProvider } from "../contexts/TodoContext";
import { GuestRoutes } from "./GuestRoutes";
import { ProtectedRoutes } from "./ProtectedRoutes";

export function AppRoutes() {
    const { isLogged } = useAuth();

    if (!isLogged) {
        return <GuestRoutes />
    }

    return <TodoContextProvider>
        <ProtectedRoutes />
    </TodoContextProvider>
}