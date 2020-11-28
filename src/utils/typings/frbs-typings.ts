

/**
 * Any type of ID (userID, profileID...)
 */
export type zID = string | null

export interface IRgetFCM {
  /**
   * Promise message
   */
  message: string
  /**
   * User Data (flat list)
   */
  userData: object
}

export const RequestStatusTypes = {
  WAITING_FOR_RESPONSE: `Waiting for response`,
  UPCOMING: `Upcoming`,
  REQUEST_TO_MECH: `Request to mech`,
  CANCELLED: `Cancelled`,
  DONE: `Done`,
}
