"use client"
import { BACKEND_URL } from "@/config/config";
import { TrackType } from '@/config/types'
import axios, { AxiosError } from "axios";
import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "@/lib/db";


interface MusicContextType {
    tracks: TrackType[] | undefined,
    setTracks: Dispatch<SetStateAction<TrackType[] | undefined>>,
    error: string,
    setError: Dispatch<SetStateAction<string>>,
    currentTrack: TrackType | undefined,
    setCurrenTrack: Dispatch<SetStateAction<TrackType | undefined>>
}

const MusicContext = createContext<MusicContextType | null>(null);




export default function MusicContextProvider({
    children
}: {
    children: React.ReactNode
}) {
    const [tracks, setTracks] = useState<TrackType[] | undefined>();
    const [error, setError] = useState('')
    const [currentTrack, setCurrenTrack] = useState<TrackType | undefined>();
    const dbTracks = useLiveQuery(() => db.tracks.toArray());

    const fetchTracks = useCallback(async (token: string) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/songs`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data)

            const data: TrackType[] = response.data.songs;
            await db.tracks.bulkAdd(data)

            const current = data[0];
            console.log(data)
            setTracks(data)
            setCurrenTrack(current)
        } catch (e) {
            console.log(e);
            const axioserror = e as AxiosError;
            setError(axioserror.message)
        }
    }, [])
    console.log("tracks are ", dbTracks)
    console.log("dexie track ", dbTracks)
    // console.log("db of dexie is ", db)

    useEffect(() => {
        const token = localStorage.getItem("token")!
        // db populating the first data / db creation at the first time
        db.on("populate", async () => {
            console.log("here in populate")
            fetchTracks(token)
        }
        )

        if ((dbTracks && dbTracks.length === 0)) {
            console.log("There is no db track")
            fetchTracks(token)
        } else if (dbTracks && dbTracks.length > 0) {
            console.log("Db tracks setting")
            setTracks(dbTracks)
            setCurrenTrack(dbTracks[0])
        }
    }, [dbTracks])

    return (
        <MusicContext.Provider value={{ tracks, setTracks, error, setError, currentTrack, setCurrenTrack }}>
            {children}
        </MusicContext.Provider>
    )
}


export function useMusicContext() {
    const context = useContext(MusicContext);

    if (!context) {
        throw Error("No Context Provided")
    }


    return context
}
