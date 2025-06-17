"use client"

import { BACKEND_URL } from "@/config/config";
import { User } from "@/config/types";
import axios from "axios";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";



interface UserContext {
    user : User | undefined,
    setUser : Dispatch<SetStateAction<User | undefined>>
}





const UserContext = createContext<UserContext | null>(null)



export default function UserProvider({
    children
} : {
    children : React.ReactNode
}){
    const [user, setUser] = useState<User>()
    
    useEffect(() => {
        const userId = localStorage.getItem("userId")
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/user/${userId}`);
                const data = response.data;
                setUser(data.user);
            } catch (error) {
                console.log(error)
            }
        }


        fetchUser()
    }, [])



    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )

}



export function useUser(){
    const context = useContext(UserContext);

    if(!context){
        throw Error("User Context Not Present")
    }

    return context
}