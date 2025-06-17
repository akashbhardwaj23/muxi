"use client";


import { ChatProvider } from "@/context/provider/chatprovider";
import MusicContextProvider from "@/context/provider/musiccontext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ChatProvider>
      <MusicContextProvider>
        <main>{children}</main>
      </MusicContextProvider>
    </ChatProvider>
  );
}
