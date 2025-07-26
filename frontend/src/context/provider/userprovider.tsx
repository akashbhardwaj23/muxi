"use client"

import { BACKEND_URL } from "@/config/config";
import { User } from "@/config/types";
import axios from "axios";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";



interface UserContext {
    user : User | null,
    setUser : Dispatch<SetStateAction<User | null>>
}


const UserContext = createContext<UserContext | null>(null)

export default function UserProvider({
    children
} : {
    children : React.ReactNode
}){
    const [user, setUser] = useState<User | null>(null)
    
    useEffect(() => {
        const userId = localStorage.getItem("userId")
        if(userId){
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
        }
        setUser(null)
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