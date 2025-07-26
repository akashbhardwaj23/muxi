import { prisma } from "../db/db"
import { v2 as cloudinary } from "cloudinary"

export let SONG_UPLOADED = false

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLODINARY_API_KEY,
    api_secret: process.env.CLODINARY_API_SECRET,
    secure: true
});


export async function songUpload() {
    const songs = await prisma.songs.findMany({})
    if (songs.length === 0) {

        const dateToSearch = new Date('2025-04-01T00:00:00Z');
        const isoDateString = dateToSearch.toISOString();
        let expressionImage = `resource_type:image AND created_at>="${isoDateString}"`
        let expressionVideo = `resource_type:video AND created_at>="${isoDateString}"`
        // const resourceTypeImage = `resource_type:"image"`
        // const resourceTypeVideo = `resource_type:"video"`
        const responseImages = await cloudinary.search.expression(expressionImage).sort_by('created_at', 'asc').max_results(500).execute()

        const responseVideo = await cloudinary.search.expression(expressionVideo).sort_by('created_at', 'asc').max_results(500).execute()
        const imageData:SongImageTypeCloudinary[]= responseImages.resources;
        const videoData:SongTypeCloudinary[] = responseVideo.resources;


        console.log("length ", videoData.length)
        // FIX THIS FUNCTION

        const prismaData = videoData.map((item) => {
            const songImage = imageData.find((image) => {
                    const mp3Array = item.filename.split("_");
                    const imageArray = image.filename.split("_");

                    if(mp3Array[0].toLowerCase() === imageArray[0].toLowerCase()) return image
                })?.url || imageData[0].url

            return {
                songName: item.filename,
                songurl: item.url,
                duration : item.duration,
                songImg: songImage,
                songDescription: ''
            }
        })

        // console.log("prismaData ", prismaData)
        // console.log("image data is ", imageData)
        // console.log("video data is ", videoData)

        const res = await prisma.songs.createMany({
            data : prismaData
        })

        console.log("res is ", res)

    }

}

