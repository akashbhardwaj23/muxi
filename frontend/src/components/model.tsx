import {motion} from "motion/react"
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";


const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const handleClick = (event : MouseEvent) => {
        if(ref.current && !ref.current.contains(event.target as Node)){
          callback()
        }
      }

      document.addEventListener("click", handleClick);
  
      return () => {
        document.removeEventListener("click", handleClick)
      }
    }, [])
  
    return ref;
  }
  
  
  export function Model({
    setModelOpen
  } : {
    setModelOpen : Dispatch<SetStateAction<boolean>>
  }) {
    const ref = useOutsideClick(() => setModelOpen(false))
    return (
      <motion.div
      initial={{
        scale : 0.8,
        opacity : 0
      }}
      animate={{
        opacity : 1,
        scale : 1
      }}
      transition={{
        duration : 0.3,
        ease : "easeInOut"
      }}
      className="w-1/2 absolute z-10 left-80 top-4" ref={ref}>
        <div className="flex flex-col justify-center items-center gap-4 border border-border rounded-[40px] p-10 bg-[rgba(255, 255, 255, 0.15)] backdrop-blur-2xl shadow-glass w-full">
  
          <div className="flex justify-center items-center font-inter text-4xl font-bold">
            <h1>Add Music</h1>
          </div>
          <div className="w-full flex flex-col justify-center gap-2">
            <Label>Music File</Label>
            <Input type="file" content="/mp3" accept=".mp3" />
          </div>
          <div className="w-full flex flex-col justify-center gap-2">
            <Label>Name</Label>
            <Input type="text" placeholder="Enter Name of the file" />
          </div>
          <div className="w-full flex flex-col justify-center gap-2">
            <Label>Description</Label>
            <textarea className="p-2 border border-border" placeholder="Enter Name of the file" />
          </div>
          <div className="w-full flex flex-col justify-center gap-2">
            <Label>Image</Label>
            <Input type="file" accept=".png .jpeg .jpg .png .webp" />
          </div>
  
          <div className="w-full flex flex-col justify-center gap-2">
            <Button className="cursor-pointer">Submit</Button>
          </div>
        </div>
      </motion.div>
    );
  }
  