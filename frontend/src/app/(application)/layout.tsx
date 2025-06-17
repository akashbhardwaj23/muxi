"use client";




import { ChatProvider } from "@/context/provider/chatprovider";
import MusicContextProvider from "@/context/provider/musiccontext";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId");

    if(!token || !userId){
        redirect("/signin")
    }

  return (
    <ChatProvider>
      <MusicContextProvider>
        <main>{children}</main>
      </MusicContextProvider>
    </ChatProvider>
  );
}
