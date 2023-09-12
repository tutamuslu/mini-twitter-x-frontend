import { useState } from "react"


export const useLocalStorage = (key, value) =>{
    const [state, setState] = useState(

        () => {
            if(localStorage.getItem(key)){
                return JSON.parse(localStorage.getItem(key))
            }else{
                localStorage.setItem(key, JSON.stringify(value))
                return value
            }
        }
    )

    const updateState = (value) =>{
        localStorage.setItem(key, JSON.stringify(value))
        setState(value)
        return value
    }

    return [state, updateState];
}