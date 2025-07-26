import { prisma } from "../db/db"
import { getAllImages, getAllMp3 } from "../lib/utils";

export let SONG_UPLOADED = false


export async function songUpload() {
    const songs = await prisma.songs.findMany({})
    if (songs.length === 0) {

        const responseImages = await getAllImages();
        const responseVideo = await getAllMp3()
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

