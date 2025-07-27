import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLODINARY_API_KEY,
    api_secret: process.env.CLODINARY_API_SECRET,
    secure: true
});


const dateToSearch = new Date('2025-04-01T00:00:00Z');
 const isoDateString = dateToSearch.toISOString();
export async function getAllImages(){
        let expressionImage = `resource_type:image AND created_at>="${isoDateString}"`
        // const resourceTypeImage = `resource_type:"image"`
        const responseImages = await cloudinary.search.expression(expressionImage).sort_by('created_at', 'asc').max_results(500).execute()
        return responseImages;
}


export async function getAllMp3(){
    let expressionVideo = `resource_type:video AND created_at>="${isoDateString}"`
     // const resourceTypeVideo = `resource_type:"video"`
     const responseVideo = await cloudinary.search.expression(expressionVideo).sort_by('created_at', 'asc').max_results(500).execute()
     return responseVideo
}