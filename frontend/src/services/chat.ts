import { limitToLast, onValue, push, query, ref } from "firebase/database";
import { db } from "./initialize";
import { Message, MessageFirestore } from "@/config/types";


export class ChatService {
    static async sendMessage(roomId : string, userId : string, message : MessageFirestore){
        const messageRef = ref(db, `chats/${roomId}/messages`);
        console.log("message is ",message)
        console.log("message ref ", messageRef)

        const sentMessage = {...message, status : "sent"}

        // console.log(sentMessage.timestamp)

        return push(messageRef, sentMessage)
    }

    static subscribeToMessage(roomId : string, callback : (message : Message[]) => void){
        const messageRef = ref(db, `chats/${roomId}/messages`);
        const recentMessage = query(messageRef, limitToLast(50));
        return onValue(recentMessage, (snapshot) => {
            const messages:Message[] = [];
            snapshot.forEach((m) => {
                messages.push({id : m.key, ...m.val()})
            })

            callback(messages)
        })
    }
}