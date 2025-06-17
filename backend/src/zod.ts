import {z} from "zod"

export const SignInInputs = z.object({
    email : z.string().email(),
    password : z.string()
})



export const SignUpInputs = z.object({
    email : z.string().email(),
    name : z.string(),
    password : z.string()
})


export const SongInput = z.object({
    id : z.string(),
    songName : z.string(),
    favorite : z.boolean(),
    songImg : z.string(),
    songurl: z.string(),
    songDescription : z.string(),

})