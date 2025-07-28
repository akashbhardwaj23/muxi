"use client";

import MusicPlayer from "@/components/musicplayer";
import { useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useMusicContext } from "@/context/provider/musiccontext";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";
import { IconBubbleText } from "@tabler/icons-react";
import { MusicIcon } from "lucide-react";
import ChatComponent from "@/components/chats";
import ListView from "@/components/listview";
import { Model } from "@/components/model";
import axios from "axios";
import { BACKEND_URL } from "@/config/config";
import { Room } from "@/config/types";

export default function RoomComponent({}) {
  const params = useParams();
  const [tab, setTab] = useState<"chat" | "list">("chat");
  const [openModel, setModelOpen] = useState(false);
  const [room, setRoom] = useState<Room>();
  const [loading, setLoading] = useState(false);
  const [roomErrror, setRoomError] = useState("");
  const { tracks, currentTrack, setCurrenTrack, error } = useMusicContext();
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
        router.push('/signin')
    }
    const fetchRoom = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/rooms/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const room: Room = response.data.room;
        console.log("the room is ", room)
        setRoom(room);
        setLoading(false);
        setCurrenTrack(room.song);
      } catch (error) {
        console.log(error);
        setRoomError(error as string);
        setLoading(false);
      }
    };

    fetchRoom();
  }, []);

  if ((!tracks && !error) || loading) {
    return <Loader />;
  }

  if (error || !tracks || !currentTrack || roomErrror || !room) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-2xl mt-10">
        {error}
      </div>
    );
  }

  return (
    <main className={`max-w-4xl mx-auto md:max-w-full`}>
      <div className="mx-auto p-4 flex flex-col gap-4 md:gap-0 max-w-7xl mb-2">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-6">
          <div className="lg:col-span-5 h-full">
            <MusicPlayer
              tracks={tracks}
              currentTrack={currentTrack}
              setCurrentTrack={setCurrenTrack}
            />
          </div>
          <div className="lg:col-span-7 h-full relative">
            <div className="absolute -top-3 md:-top-4 right-0 grid grid-cols-2 z-10 border overflow-hidden border-border bg-card rounded-[10px] w-40 h-10">
              <motion.div
                key={"chat"}
                className={`flex justify-center items-center gap-2 cursor-pointer p-2 w-full ${
                  tab === "chat"
                    ? "bg-neutral-800 text-white"
                    : "hover:bg-accent"
                }`}
                onClick={() => setTab("chat")}
              >
                <IconBubbleText className="h-4 w-4" /> <span>Chat</span>
              </motion.div>
              <motion.div
                key={"list"}
                className={`flex justify-center items-center gap-2 cursor-pointer p-2 w-full ${
                  tab === "list"
                    ? "bg-neutral-800 text-white"
                    : "hover:bg-accent"
                }`}
                onClick={() => setTab("list")}
              >
                <MusicIcon className="w-4 h-4" /> <span>List</span>
              </motion.div>
            </div>
            {tab === "chat" ? (
              <div className="h-full">
                <ChatComponent room={room} />
              </div>
            ) : (
              <div className="h-full">
                <ListView
                  tracks={tracks}
                  setModelOpen={setModelOpen}
                  setCurrenTrack={setCurrenTrack}
                />
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
