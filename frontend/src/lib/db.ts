import { TrackType } from '@/config/types';
import Dexie, { type EntityTable } from 'dexie';

const db = new Dexie('MusicTable') as Dexie & {
    tracks : EntityTable<TrackType , 'id'>
}

db.version(1).stores({
    tracks : 'id, songName,favorite, songurl,songImg,songDesccription'
})

export { db }