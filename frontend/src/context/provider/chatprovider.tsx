import { Message } from "@/config/types";
import { ChatService } from "@/services/chat";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";



export interface CurrentRoomType {
    id : string
}


export interface ChatStoreType {
    currentRoom : CurrentRoomType
    setCurrentRoom : Dispatch<SetStateAction<CurrentRoomType>>
    messages : Message[]
    setMessages : Dispatch<SetStateAction<Message[]>>
}


export const ChatStore = createContext<ChatStoreType | null>(null);


export function ChatProvider({
    children
} : {
    children : React.ReactNode
}){
    const [currentRoom, setCurrentRoom] = useState<CurrentRoomType>({
        id : '1'
    });
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if(currentRoom?.id){
            const unsubscribe = ChatService.subscribeToMessage(currentRoom.id, setMessages);


            return () => unsubscribe();
        }

    }, [currentRoom])

    return <ChatStore.Provider value={{setMessages, setCurrentRoom, currentRoom, messages}}>
        {children}
    </ChatStore.Provider>
}



export const useChat = () => {
    const context = useContext(ChatStore);

    if(!context){
        throw Error("Context Can't be null")
    }

    return context;
}