


// export interface MessageType {
//     id : string
//     text : string
//     senderId : string
//     timeStamp : Date
//     status : "sent" | "pending" | "errored"
// }






export type Message = {
    id: number
    text: string
    sender: string
    senderName : string
    timestamp: number
    status?: "sending" | "sent" | "delivered" | "read"
    reactions?: string[]
    attachments?: {
      type: "image" | "audio" | "video" | "file"
      url: string
      name: string
    }[]
  }

  export type UserType = {
    id : string,
    email : string,
    name : string,
    password : string,
    roomId : string
  }

  export type MessageFirestore = {
    id: number
    text: string
    sender: string
    senderName : string
    timestamp: object | number
    status?: "sending" | "sent" | "delivered" | "read"
    reactions?: string[]
    attachments?: {
      type: "image" | "audio" | "video" | "file"
      url: string
      name: string
    }[]
  }


  export type RoomType = {
    id : string,
    name : string,
    description : string,
    songId : string
  }


  // export type Room = {
  //   song: {
  //       id: string;
  //       songName: string;
  //       favorite: boolean;
  //       songurl: string;
  //       songImg: string;
  //       songDescription: string;
  //   };
  // } & {
  //     id: string;
  //     name: string;
  //     description: string;
  //     songId: string;
  // } & UserType[]
    
export interface Room {
  id:          string;
  name:        string;
  description: string;
  songId:      string;
  song:        Song;
  users:       User[];
}

export interface Song {
  id:              string;
  songName:        string;
  favorite:        boolean;
  songurl:         string;
  songImg:         string;
  songDescription: string;
}

export interface User {
  id:        string;
  email:     string;
  name:      string;
  picture:   string;
  passsword?: string;
  roomId?:    string;
}

export interface UserProfileType {
  id: string;
  email: string;
  name: string;
  given_name: string;
  picture: string;
  verified_email: boolean;
}



  
export type TrackType = {
  id : string,
  songName : string,
  favorite : boolean,
  songurl : string,
  songImg : string,
  songDescription : string
}

