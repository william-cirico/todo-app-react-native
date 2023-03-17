import { User } from "../types/user";
import API from "./api";


export function createUser(user: User): Promise<User> {
    return API.post("/users", user).then(res => res.data);
}