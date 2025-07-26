


type SongImageTypeCloudinary =  {
      asset_id:string,
      public_id: string,
      folder: string,
      filename: string,
      format: FormatType,
      version: number,
      resource_type: 'image',
      type: string,
      created_at: Date,
      uploaded_at: Date
      aspect_ratio: 1,
      pixels: number,
      duration: number,
      pages: number,
      url: string,
      secure_url: string,
      status: string,
      access_mode: string,
      etag: string,
    }

    type SongTypeCloudinary =  {
      asset_id:string,
      public_id: string,
      folder: string,
      filename: string,
      format: FormatType,
      version: number,
      resource_type: 'video',
      type: string,
      created_at: Date,
      uploaded_at: Date
      aspect_ratio: 1,
      pixels: number,
      duration: number,
      pages: number,
      url: string,
      secure_url: string,
      status: string,
      access_mode: string,
      etag: string,
    }

type FormatType = 'mp3' | 'jpg';

type ResourceType = 'video' | 'image'