import { BACKEND_URL } from "@/config/config";
import { ImageType } from "@/type/image";
import axios from "axios";
import { useEffect, useState } from "react";




export function useImages(){
    const [images, setImages] = useState<ImageType[]>([]);
    const [loading, setLoading] = useState(false)

    const fetchData = async() => {
        try {
            setLoading(true)
            const response = await axios.get(`${BACKEND_URL}/api/v1/images`);
            console.log("response is ", response.data)
            const data:ImageType[] = response.data.images
            console.log("image data is ", data)
            setImages(data);
            setLoading(false)
        } catch (error) {
            setLoading(false)
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