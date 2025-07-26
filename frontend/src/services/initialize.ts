import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// import env from "@/config/env"

// console.log(env)

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGESENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
};


console.log("Database Url ", process.env.NEXT_PUBLIC_DATABASE_URL)

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
