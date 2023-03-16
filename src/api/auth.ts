import API from "./api";

export function userLogin(username: string, password: string): Promise<{ token: string}> {
    return API.post("/users/login", { username, password }).then(res => res.data);
}