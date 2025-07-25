import { TrackType } from "@/config/types";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Dispatch, SetStateAction } from "react";
import { IconCircleDashedPlus } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function ListView({
  tracks,
  setCurrenTrack,
  setModelOpen
}: {
  tracks: TrackType[];
  setCurrenTrack: Dispatch<SetStateAction<TrackType | undefined>>;
  setModelOpen : Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div className="h-[37.6rem]"><motion.div
    initial={{
      opacity : 0
    }}
    animate={{
      opacity : 1
    }}
    transition={{
      duration : 0.7,
      ease : "easeInOut"
    }}
    className="h-[90%] relative border border-border bg-card shadow-sm rounded-[40px]">
      <div className="p-10 grid grid-cols-3 gap-4">
        <AnimatePresence>
          {tracks &&
            tracks.map((track, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.2,
                }}
                whileTap={{
                  scale: 1.2,
                }}
                className="flex justify-center relative z-10 items-center border border-border shadow-md rounded-[10px] cursor-pointer"
                onClick={() => setCurrenTrack(track)}
              >
                <div className="flex items-center gap-2 px-4 py-2 text-sm max-w-xl">
                  <Image
                    src={track.songImg || "/muxilogo.png"}
                    width={600}
                    height={600}
                    alt={track.songName}
                    className="w-8 h-8 rounded-[12px] object-cover"
                  />{" "}
                  <span> {track.songName}</span>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
      <TooltipProvider
      >
        <Tooltip>
          <div className="w-full p-8 absolute flex justify-end left-0 bottom-2">
          <TooltipTrigger>
            <div className="cursor-pointer" onClick={() => setModelOpen(true)}>
              <IconCircleDashedPlus className="w-10 h-10 text-forground backdrop-blur-md" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add New Songs</p>
          </TooltipContent>
          </div>
        </Tooltip>
      </TooltipProvider>

    </motion.div></div>
  );
}
