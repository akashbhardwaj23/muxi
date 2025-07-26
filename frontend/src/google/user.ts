import { BACKEND_URL } from "@/config/config";
import { UserProfileType } from "@/config/types";
import axios, { AxiosError } from "axios";



export async function sendSigninRequest(profile: UserProfileType) {
    // const userId = localStorage.getItem("userId");
    try {
        let response = await axios.post(`${BACKEND_URL}/api/v1/login`, {
        email: profile.email,
        password: profile.given_name,
    })

    return response
    } catch (error: unknown) {
            let e = error as AxiosError
            if (e.status !== 200 && e.status !== 500) {
            console.log("user is not present")
            let response = await axios.post(`${BACKEND_URL}/api/v1/register`, {
                email: profile.email,
                name: profile.name,
                password: profile.given_name,
            })
            return response


        }

        
        console.log("error is ", error)
        throw error
    }
}