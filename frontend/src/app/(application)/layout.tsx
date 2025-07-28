"use client";



import { ChatProvider } from "@/context/provider/chatprovider";
import MusicContextProvider from "@/context/provider/musiccontext";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ChatProvider>
      <MusicContextProvider>
         <TooltipProvider>
        <main className="w-[90%] mx-auto lg:w-full">{children}</main>
        </TooltipProvider>
      </MusicContextProvider>
    </ChatProvider>
  );
}
