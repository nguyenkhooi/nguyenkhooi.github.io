/** REVIEW Ertypes
 * @description "Ertypes" is list of all pre-defined error/message types formatted as "all cap w underline" style
 * @summary
 *  We can import this pre-defined "Errtypes" to prevent from mistyping
 *  To highlight Errtypes, regex search: `Ertypes.\w+,`
 * @example
 * import {Ertypes} from `@utils;
 *
 * [...]
 * case Ertypes.CHANNEL_ADD: //* auto-complete, instead of manually typing `case "CHANNEL_ADD"`
 */

export const Ertypes = {
  //* SECTION firebase
  /** @this getFCM () */
  FCM_EXISTS: `FCM_EXISTS`,
  FCM_GRANTED: `FCM_GRANTED`,
  FCM_IOS: `FCM_IOS`,
  FCM_GET_ERROR: `FCM_GET_ERROR`,
  FCM_REJECTED: `FCM_REJECTED`,
  /** @this getDB () */
  uDB_EXISTS: `uDB_EXISTS`,
  uDB_NO_EXIST: `uDB_NO_EXIST`,
  pDB_EXISTS: `uDB_EXISTS`,
  pDB_NO_EXIST: `uDB_NO_EXIST`,
  GETDB_ERR: `GETDB_ERR`,
  /** @this uploadMedia () */
  ERR_UNAUTHORIZED: `ERR_UNAUTHORIZED`,
  ERR_TASK_CANCELLED: `ERR_TASK_CANCELLED`,
  ERR_UNKNOWN: `ERR_UNKNOWN`,
  ERR_MEDIA_UPLOAD: `ERR_MEDIA_UPLOAD`,
  //* SECTION auth
  /** @this connectWithFB () */
  REQUEST_SUCCESSFUL: `REQUEST_SUCCESSFUL`,
  /** @this connectToFRBS (),loadingApp () */
  ACC_EXISTS_COMPLETED: `ACC_EXISTS_COMPLETED`,
  ACC_EXISTS_INCOMPLETED: `ACC_EXISTS_INCOMPLETED`,
  ACC_EXISTS: `ACC_EXISTS`,
  ACC_NO_EXIST: `ACC_NO_EXIST`,
  /** @this connectToFRBS () */
  GETUID_COMPLETED: `GETUID_COMPLETED`,
  GETUID_ERR: `GETUID_ERR`,
  /** @this otherFunction  */
  PHOTO_GALLERY_DONE_IMPORTED: `PHOTO_GALLERY_DONE_IMPORTED`,
  PHOTO_GALLERY_ERR: `PHOTO_GALLERY_ERR`,
  PHOTO_GALLERY_CANCELLED: `PHOTO_GALLERY_CANCELLED`,
  PHOTO_CAM_DONE_IMPORTED: `PHOTO_CAM_DONE_IMPORTED`,
  PHOTO_CAM_ERR: `PHOTO_CAM_ERR`,
  PHOTO_CAM_CANCELLED: `PHOTO_CAM_CANCELLED`,
}
