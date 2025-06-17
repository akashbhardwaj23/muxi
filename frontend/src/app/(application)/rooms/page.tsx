"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BACKEND_URL } from "@/config/config";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { RoomType } from "@/config/types";
import Loader from "@/components/loader";
import { BorderBeam } from "@/components/magicui/border-beam";
import { toast, Toaster } from "sonner";
import { useMusicContext } from "@/context/provider/musiccontext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { selectRandomColor } from "@/lib/color";
import { ShineBorder } from "@/components/magicui/shine-border";

interface DataType {
  name: string;
  description: string;
}

export default function Rooms() {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [data, setData] = useState<DataType>({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState("");
  const { tracks } = useMusicContext();

  const color = selectRandomColor();

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId");

    if(!token || !userId){
        router.push("/signin")
    }
  }, [])

  const handleClick = async () => {
    const token = localStorage.getItem("token");
    if (!data.name.trim() || !data.description.trim()) {
      console.log("here");
      toast.error("All Fields Are Required");
      return;
    }

    setDataLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/createRoom`,
        {
          name: data.name,
          description: data.description,
          //@ts-expect-error This is an expected error because tracks can be undefined
          songId: tracks[0]!.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const roomId: string = response.data.roomId;
      router.push(`/rooms/${roomId}`);
      setDataLoading(false);
    } catch (error) {
      console.log(error);
      setDataLoading(false);
    }
  };

  console.log("data is ", data);

  const getRooms = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/v1/rooms`);

      const data = response.data;

      setRooms(data.rooms);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error as string);
    }
  }, []);

  useEffect(() => {
    getRooms();
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error && !loading) {
    return (
      <div>
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        maskImage: `linear-gradient(
            to bottom, 
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 1) 10%,
            rgba(0, 0, 0, 1) 90%
            )`,
      }}
      className="bg-gradient-to-br from-blue-300/90 via-white to-rose-300 h-full w-full pb-40 dark:bg-none dark:bg-background"
    >
      <div className="max-w-4xl mx-auto min-h-screen flex flex-col items-center gap-10">
        <Toaster />
        <div className="p-10 bg-card border border-border relative w-[60%] z-50 rounded-[40px] dark:bg-transparent ">
            <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}/>
          <div className="flex flex-col items-center w-full gap-10">
            <h1 className="text-4xl font-poppins font-bold">
              {dataLoading ? <Loader /> : <span>Create Room</span>}
            </h1>
            <div className="w-full flex flex-col gap-2">
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  setData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Label>Description</Label>
              <textarea
                placeholder="Description"
                className="p-2 border border-border rounded-[10px]"
                onChange={(e) =>
                  setData((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </div>
            <div className="w-full flex flex-col gap-2 relative">
              <Button variant={"default"} onClick={handleClick}>
                <span>Create</span>
                <BorderBeam
                  duration={6}
                  initialOffset={1}
                  size={200}
                  className="from-transparent via-red-500 to-transparent"
                />
              </Button>
            </div>
          </div>
        </div>
        <div className="mb-10">
          <h2 className="text-2xl font-poppins font-bold mb-4">Rooms</h2>
          <div className="grid grid-cols-2 gap-4 w-full">
            {rooms.length > 0 &&
              rooms.map((room, index) => (
                <Link href={`/rooms/${room.id}`} key={index}>
                  <div
                    style={{
                      backgroundColor: color,
                    }}
                    className="bg-card w-72 border border-border p-1 rounded-[40px] text-black shadow-sm cursor-pointer"
                    key={index}
                  >
                    <div
                      className={`border border-border bg-white p-8 rounded-[36px]`}
                    >
                      <h2 className="text-xs">
                        <span className="font-poppins font-bold text-sm">
                          Name :{" "}
                        </span>
                        {room.name}
                      </h2>
                      <p className="text-xs">
                        <span className="font-poppins font-bold text-sm">
                          Description :{" "}
                        </span>
                        <span className="w-full break-words">
                          {room.description}
                        </span>
                      </p>
                    </div>
                    <div className="p-8 text-xs">
                      <span className="font-poppins font-bold text-sm">
                        Song Playing :{" "}
                      </span>
                      {room.songId}
                    </div>
                  </div>
                </Link>
              ))}

            {rooms.length === 0 && (
              <div className="w-full bg-white">No Room Found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
