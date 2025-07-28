import { BACKEND_URL } from "@/config/config";
import { getImages } from "@/server/actions";
import { ImageType } from "@/type/image";
import axios from "axios";
import { useEffect, useState } from "react";

export function useImages(){
    const [images, setImages] = useState<ImageType[]>([]);
    const [loading, setLoading] = useState(false)

    const fetchData = async() => {
        try {
            setLoading(true)
            const response = await getImages()
            console.log("response is ", response)
            const data:ImageType[] = response.images
            console.log("image data is ", data)
            setImages(data);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("error ", error)
        }
    }

    useEffect(() => {
        fetchData()
    },[])

    return {
        images,
        loading
    }
}