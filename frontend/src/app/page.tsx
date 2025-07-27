"use client"

import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useImages } from "@/hooks/useImages";
import { ImageType } from "@/type/image";
import { IconBrandFacebook, IconBrandGithub, IconBrandGoogle, IconBrandNextjs, IconBrandReact, IconBrandX } from "@tabler/icons-react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {AnimatePresence, motion} from "motion/react"
import Loader from "@/components/loader";

export default function Home() {
  const [href, setHref] = useState('/signin')
  const { resolvedTheme } = useTheme()
  const {images, loading} = useImages()
  const [currentImage, setCurrentImage] = useState<ImageType>()
  // const [isPresent, safeToRemove] = usePresence()
  // const [scope, animate] = useAnimate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const href = (!token || !userId) ? "/signin" : "/rooms"
    setHref(href)
  }, [])

  useEffect(() => {
    setCurrentImage(images[0])
  }, [loading])


  // useEffect(() => {
  //   if(!isPresent){
  //     const exitAnimation = async () => {

  //       await animate(scope.current, {
  //         scale : 1.02
  //       }, {
  //         ease : "easeInOut",
  //         duration: 0.3
  //       })

  //       await animate(scope.current, {
  //         opacity : 0,
  //         x : -100
  //       }, {
  //         delay : 0.8
  //       })

  //       safeToRemove()
  //     }

  //     exitAnimation()
  //   }
  // }, [isPresent])


  const handleNext = () => {
    const currentIndex = images.findIndex((image) => image.public_id === currentImage?.public_id);
    setCurrentImage(() => {
      if((currentIndex + 1) === images.length){
        return images[0];
      }
      return images[currentIndex + 1];
    })
  }

  const handlePrev = () => {
    const currentIndex = images.findIndex((image) => image.public_id === currentImage?.public_id);

    setCurrentImage(() => {
      if(currentIndex === 0){
        return images[images.length - 1]
      }
      return images[currentIndex - 1];
    })
  }


  if(loading){
    return <div
      style={{
          maskImage: resolvedTheme === "light" ? `linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0,0,0,1) 10%,
      rgba(0, 0, 0, 1) 80%,
      rgba(0, 0, 0, 0) 100%
    )` : "",
        }}
    className="bg-gradient-to-br from-blue-300/90 via-white to-rose-300 h-[41rem] w-full dark:bg-none dark:bg-background">
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
    </div>
  }


  const MotionImage = motion.create(Image);

  return (
    <div>
      <div
        style={{
          maskImage: resolvedTheme === "light" ? `linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0,0,0,1) 10%,
      rgba(0, 0, 0, 1) 80%,
      rgba(0, 0, 0, 0) 100%
    )` : "",
        }}
        className="bg-gradient-to-br from-blue-300/90 via-white to-rose-300 h-[30rem] w-full dark:bg-none dark:bg-background"
      >
        <div className="flex flex-col justify-center items-center gap-4 h-full">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-forground font-poppins text-7xl font-bold">
              Muxi
            </h1>
            <p className="mt-4 text-neutral-700 md:max-w-xl max-w-[90%] mx-auto text-center dark:text-neutral-100">
              Muxi is a simple and elegant music app designed to help you
              discover, play, and enjoy your favorite tunes. Experience seamless
              music streaming with a beautiful interface and intuitive controls.
            </p>
          </div>
          <div>
            <Link href={href}>
              <InteractiveHoverButton
                style={{
                  maskImage:
                    "linear-gradient(-75deg,var(--primary) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--primary) calc(var(--x) + 100%))",
                }}
              >
                Go to Dashboard
              </InteractiveHoverButton>
            </Link>
          </div>
        </div>

      </div>
      <div className="w-[90%] md:w-full max-w-xl md:max-w-4xl mx-auto mt-10 text-forground h-72 md:h-[30rem]">
      {currentImage && (
        <div>
          <div className="w-full h-72 md:h-[30rem] border-2 border-forground p-2">
          <AnimatePresence>
            <MotionImage 
          exit={{
            x : -200,
            opacity : 0
          }}
          transition={{
            duration : 0.3,
            ease:"linear"
          }}
          // ref={scope}
          src={currentImage?.url || '/globe.svg'} width={800} height={800} alt={currentImage?.filename || "imagealt"} className="w-full h-full" />
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center items-center mt-2">
          <div className="flex justify-center gap-10 w-20 md:w-40">
            <div className="p-3 rounded-full border-2 border-forground cursor-pointer hover:bg-rose-200 dark:hover:bg-neutral-800" onClick={handlePrev}><ArrowBigLeft className="w-8 h-8" /></div>
          <div className="p-3 rounded-full border-2 border-forground cursor-pointer hover:bg-rose-200 dark:hover:bg-neutral-800" onClick={handleNext}><ArrowBigRight className="w-8 h-8" /></div>
          </div>
        </div>
        </div>
      )}
      </div>
      <div className="w-full max-w-4xl mx-auto mt-40 text-forground h-[20rem] overflow-x-hidden"
        style={{
          maskImage: `linear-gradient(
          to right,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 1) 20%,
          rgba(0, 0, 0, 1) 90%,
          rgba(0, 0, 0, 0) 100%
          )`
        }}
      >
        <div className="flex justify-center gap-20 transition animate-marque">
          {[IconBrandGoogle, IconBrandX, IconBrandGithub, IconBrandFacebook, IconBrandNextjs, IconBrandReact].map((ItemComponent, index) => (
            <div className="flex justify-center" key={index}>
              <ItemComponent className="h-20 w-20" />
            </div>
          ))}
        </div>

      </div>
      
    </div>
  );
}
