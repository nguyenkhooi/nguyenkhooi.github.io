import { scale } from "utils"

/** `imageInfo` (e.g. imageInfo00, imageInfo01) contains props of such image */
export interface IPimageInfo {
  /** Local path of an image */
  path: string | null
  /** Image size */
  size: { height: number | null; width: number | null }
  /** Uri of an image, usually FRBS link */
  uri?: string | null
  /** Storage bucket of an image, usually FRBS's Storage subfolders */
  bucket?: "users" | "food" | null
}

export const __imageInfo: IPimageInfo = {
  path: `https://randomuser.me/api/portraits/women/95.jpg`,
  size: { height: scale(134), width: scale(134) },
  uri: "https://randomuser.me/api/portraits/women/95.jpg",
  bucket: null,
}

/** `photoZZ` (e.g. photo00, photo01) is the uri/path of image */
export type photoZZ = string

export type mediaType = "photo" | "video"
//* REVIEW PROMISE

export interface IRuploadMedia {
  /**
   * Promise message
   */
  message: string
  /**
   * Upload status
   */
  status: null | {
    state: "cancelled" | "error" | "paused" | "running" | "success"
    progress: number
  }
  /**
   * Uri link
   */
  uri: string
}
