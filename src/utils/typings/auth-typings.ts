import { FirebaseAuthTypes } from "@react-native-firebase/auth"

export interface c2frbsRES {
  code: `ACC_NO_EXIST` | `ACC_EXISTS`
  userData?: object
  profileData?: object
  error?: string
}
export interface getCredentialRES {
  code: `GETUID_COMPLETED` | `GETUID_ERR` | `ACC_xEXIST` | `ACC_EXISTS`
  response?: FirebaseAuthTypes.User
  error?: string
}

export interface IPuserData_fr_FRBS {
  _id: string
  providerID: "facebook" | `phone`
  firstName?: string
  lastName?: string
  phone?: string | null
  email?: string
  photoURL?: string | null
  isOnline: true
  profileID: string
  userID: string
}
