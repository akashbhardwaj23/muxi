'use server'

import { BACKEND_URL } from "@/config/config";
import axios from "axios";
import { unstable_cache } from "next/cache";



export async function getImages(){
    const data = unstable_cache(async () => {
         const response = await axios.get(`${BACKEND_URL}/api/v1/images`);
         return response.data
    }, ['images-data'], {
        revalidate : 120
    })

    // FIX THIS
    const response = await data()
    return response
}


export async function getAllSongs(token: string){
    console.log("token is ", token)
    const data = unstable_cache(async () => {
        const response = await axios.get(`${BACKEND_URL}/api/v1/songs`, {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })

        return response.data
    }, ['all-songs'], {
        revalidate : 120
    })

    // FIX THIS
    const response = await data();

    return response
}