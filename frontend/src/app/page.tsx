"use client"

import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { IconBrandFacebook, IconBrandGithub, IconBrandGoogle, IconBrandNextjs, IconBrandReact, IconBrandX } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [href, setHref] = useState('/signin')
  const { resolvedTheme } = useTheme()

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const href = (!token || !userId) ? "/signin" : "/rooms"
    setHref(href)
  }, [])
 

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
          <p className="mt-4 text-sm text-neutral-700 max-w-xl text-center dark:text-neutral-100">
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
    <div className="w-full max-w-4xl mx-auto mt-20 text-forground h-[30rem] overflow-x-hidden"
        style={{
          maskImage : `linear-gradient(
          to right,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 1) 20%,
          rgba(0, 0, 0, 1) 90%,
          rgba(0, 0, 0, 0) 100%
          )`
        }}
        >
          <div className="flex justify-center gap-20 transition animate-marque">
            {[IconBrandGoogle, IconBrandX, IconBrandGithub , IconBrandFacebook , IconBrandNextjs, IconBrandReact].map((ItemComponent, index) => (
              <div className="flex justify-center" key={index}>
                  <ItemComponent className="h-20 w-20" />
              </div>
            ))}
          </div>
          
        </div>
    </div>
  );
}
