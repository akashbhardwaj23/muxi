"use client";
import MusicPlayer from "@/components/musicplayer";
import { useState } from "react";
import Loader from "@/components/loader";
import ListView from "@/components/listview";
import { useMusicContext } from "@/context/provider/musiccontext";
import { IconBubbleText } from "@tabler/icons-react";
import { MusicIcon } from "lucide-react";
import {AnimatePresence, motion} from "motion/react"
import { Model } from "@/components/model";
// import ChatComponent from "@/components/chats";


export default function Dashboard() {
  const { tracks, currentTrack, setCurrenTrack, error } = useMusicContext();
  const [tab, setTab] = useState<"chat" | "list">("chat");
  const [openModel, setModelOpen] = useState(false);

  if (!tracks && !error) {
    return <Loader />;
  }

  if (error || !tracks || !currentTrack) {
    return (
      <div className="flex justify-center items-center text-red-500 text-2xl mt-10">
        {error}
      </div>
    );
  }

  return (
    <main className={`max-w-4xl max-auto md:max-w-full`}>
      <div className="mx-auto px-4 py-6 flex flex-col max-w-7xl mb-[4.2rem]">
        <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 h-full">
            <MusicPlayer
              tracks={tracks}
              currentTrack={currentTrack}
              setCurrentTrack={setCurrenTrack}
            />
          </div>
          <div className="lg:col-span-7 h-full">
            <div className="absolute -top-4 right-0 grid grid-cols-2 z-10 border overflow-hidden border-border bg-card rounded-[10px] w-40 h-10">
              <motion.div
                key={"chat"}
                className={`flex justify-center items-center gap-2 cursor-pointer p-2 w-full ${tab === "chat" ? "bg-neutral-800 text-white" : "hover:bg-accent"}`} 
                onClick={() => setTab("chat")}
              >
                <IconBubbleText className="h-4 w-4" /> <span>Chat</span>
              </motion.div>
              <motion.div
              key={"list"}
                className={`flex justify-center items-center gap-2 cursor-pointer p-2 w-full ${tab === "list" ? "bg-neutral-800 text-white" : "hover:bg-accent"}`}
                onClick={() => setTab("list")}
              >
                <MusicIcon className="w-4 h-4" /> <span>List</span>
              </motion.div>
            </div>
            {tab === "chat" ? (
              <div>
                {/* <ChatComponent /> */}
              </div>
            ) : (
              <div className="h-full">
                <ListView tracks={tracks} setModelOpen={setModelOpen} setCurrenTrack={setCurrenTrack} />
              </div>
            )}
          </div>
          <AnimatePresence>
            {openModel && <Model setModelOpen={setModelOpen} />}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

