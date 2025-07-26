"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "sonner";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { IconBrandGoogle } from "@tabler/icons-react";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "@/config/config";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";
import { sendSigninRequest } from "@/google/user";
import { useGoogleLogin } from "@react-oauth/google";
import { UserProfileType } from "@/config/types";


export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hover, setHover] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')


  const login = useGoogleLogin({
        onSuccess: (response) => {
            const user = response
            axios
                .get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: "application/json",
                        },
                    }
                )
                .then(async (res) => {
                    const data:UserProfileType = res.data
                    const response = await sendSigninRequest(data);
                    const token = response.data.token;
                    const userId = response.data.userId;
                    localStorage.setItem("token", token);
                    localStorage.setItem("userId", userId);
                    router.push('/')
                    // setUserProfile(res.data);
                })
                .catch((err:AxiosError) =>{
                  setError(err.message);
                  setTimeout(() => {
                    setError('')
                  }, 3000)
                });
        },
        onError: (e) => console.log("error is ", e),
    });

  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      toast.error("Please Enter all the details");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/v1/login`, {
        email,
        password,
      });

      const token = response.data.token;
      const userId = response.data.userId;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      setLoading(false);
      router.push("/");
    } catch {
      toast.error("Error While SignIn");
      setLoading(false);
    }
  };


  const handleGoogleSignIn = async () => {
    login();
  }


  if(error){
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-2">
        <span>{error}</span>
      </div>
    )
  }

  const MotionButtonComponent = motion.create(Button);

  return (
    <div className="flex flex-col relative items-center justify-center h-[40.6rem] gap-10">
      <Toaster />
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col shadow-2xl border border-border bg-background font-poppins relative rounded-[40px] p-6 px-10 w-[40rem] overflow-hidden before:h-10 before:absolute before:bg-conic before:bg-red-700"
      >
        <div
          className="text-4xl flex justify-center p-2 items-center w-full mb-4 font-bold text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-sky-600
        dark:bg-none dark:text-white
        "
        >
          <h1>Sign In</h1>
        </div>

        <div className="flex flex-col gap-4 mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id={"email"}
            placeholder="Enter you'r email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <Label htmlFor="password">Password</Label>
          <Input
            id={"password"}
            type="password"
            placeholder="Enter you'r email"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-center w-full mb-4">
          <MotionButtonComponent
            whileHover={{
              width: "80%",
            }}
            transition={{
              duration: 0.3,
              type : "spring",
              damping : 10,
              ease: "easeInOut",
            }}
            variant={"default"}
            className="w-[60%] cursor-pointer rounded-[40px] shadow-[-2px_5px_20px_-10px_var(--foreground)] bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 dark:bg-none dark:bg-white"
            onClick={handleSignIn}
          >
            {loading ? <Loader className="top-0 h-4" /> : <span>Sign In</span>}
          </MotionButtonComponent>
        </div>

        <div className="text-neutral-600 flex text-sm gap-4 mb-8">
          <p className="relative">
            Don&apos;t have an Account :{" "}
            <Link
              href={"/register"}
              className="text-neutral-400 hover:text-neutral-600"
              onMouseEnter={() => setHover((prev) => !prev)}
              onMouseLeave={() => setHover((prev) => !prev)}
            >
              <span>Register</span>
              <svg
                width="132"
                height="8"
                viewBox="0 0 132 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -right-2 w-20"
              >
                <motion.path
                  initial={{
                    pathLength: 0,
                  }}
                  animate={{
                    pathLength: hover ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  d="M1 7C2.32 7 15.87 7 36.03 6.835C44.6539 6.76442 61.51 6 85.835 5.835C106.926 5.69194 126.32 5.99 128.65 6.995C129.66 7.01 130.32 6.02 130.33 5.015C130.34 4.01 129.68 3.02 129 1"
                  stroke="#00A6F4"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
          </p>
        </div>

        <BorderBeam
          duration={6}
          size={400}
          className="from-transparent via-red-500 to-transparent"
        />
        <BorderBeam
          duration={6}
          delay={3}
          size={400}
          className="from-transparent via-blue-500 to-transparent"
        />
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="absolute inset-2/6 shadow-2xl bg-sky-600/30 rounded-full blur-3xl -z-[100] h-[20rem] w-[30rem]"
      ></motion.div>

      <motion.div
        className="w-[30rem] flex justify-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{
          width: "40rem",
        }}
        transition={{ duration: 0.3 }}
      >
        <Button
          className="w-1/2 p-4 rounded-[40px] shadow-2xl h-10 relative"
          onClick={handleGoogleSignIn}
        >
          <IconBrandGoogle /> <span>SignIn Via Google</span>
          {/* <BorderBeam
          duration={6}
          delay={3}
          size={400}
          className="from-transparent via-blue-500 to-transparent"
        /> */}
        </Button>
        {/* <Button
          className="w-1/2 p-4 rounded-[40px] shadow-2xl h-10 relative"
          onClick={handleSignIn}
        >
          <IconBrandGithub /><span>SignIn Via Github</span>
          {/* <BorderBeam
          duration={6}
          delay={3}
          size={400}
          className="from-transparent via-blue-500 to-transparent"
        /> */}
        {/* </Button> */}
      </motion.div>
    </div>
  );
}
