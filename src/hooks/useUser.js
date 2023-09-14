import { useLocalStorage } from "./useLocalStorage";

export const useUser = () =>{
    const [token, setToken] = useLocalStorage("user", '');

    return [token, setToken];
}