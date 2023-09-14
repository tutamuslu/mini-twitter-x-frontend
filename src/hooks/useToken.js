import { useLocalStorage } from "./useLocalStorage";

export const useToken = () =>{
    const [token, setToken] = useLocalStorage("token", '');

    return [token, setToken];
}