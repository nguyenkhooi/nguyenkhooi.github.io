// /* eslint-disable indent */
// import { IS_ANDROID, scale } from "../helpers"
// import { IPtypoCarp } from "../typings"
// import { sanFranciscoWeights, robotoWeights } from "react-native-typography"
// import { TextStyle } from "react-native"

// /**
//  * @description Typography preset based on Carmec's design system
//  *
//  * The various styles of fonts are defined in the <Text /> component.
//  *
//  * @see TfontFamily for fontFamily on Android
//  */
// export const typoCarp: IPtypoCarp = {
//   largeTitle: IS_ANDROID
//     ? ({
//         // fontFamily: "Montserrat-Bold",
//         fontFamily: "Montserrat-Bold",
//         letterSpacing: -1.5,
//         fontSize: scale(30),
//       } as TextStyle)
//     : ({
//         fontFamily: `Montserrat-Bold`,
//         fontWeight: "700",
//         letterSpacing: -1,
//         fontSize: scale(30),
//       } as TextStyle),
//   headline: IS_ANDROID
//     ? ({ ...robotoWeights.medium, fontSize: scale(24) } as TextStyle)
//     : ({ ...sanFranciscoWeights.semibold, fontSize: scale(24) } as TextStyle),
//   title: IS_ANDROID
//     ? ({ ...robotoWeights.regular, fontSize: scale(20) } as TextStyle)
//     : ({ ...sanFranciscoWeights.regular, fontSize: scale(20) } as TextStyle),
//   titleEmphasized: IS_ANDROID
//     ? ({ ...robotoWeights.medium, fontSize: scale(20) } as TextStyle)
//     : ({ ...sanFranciscoWeights.semibold, fontSize: scale(20) } as TextStyle),
//   subtitle: IS_ANDROID
//     ? ({ ...robotoWeights.regular, fontSize: scale(16) } as TextStyle)
//     : ({ ...sanFranciscoWeights.regular, fontSize: scale(16) } as TextStyle),
//   subtitleEmphasized: IS_ANDROID
//     ? ({ ...robotoWeights.medium, fontSize: scale(16) } as TextStyle)
//     : ({ ...sanFranciscoWeights.semibold, fontSize: scale(16) } as TextStyle),
//   body: IS_ANDROID
//     ? ({ ...robotoWeights.regular, fontSize: scale(14) } as TextStyle)
//     : ({ ...sanFranciscoWeights.regular, fontSize: scale(14) } as TextStyle),
//   bodyEmphasized: IS_ANDROID
//     ? ({ ...robotoWeights.medium, fontSize: scale(14) } as TextStyle)
//     : ({ ...sanFranciscoWeights.semibold, fontSize: scale(14) } as TextStyle),
//   caption: IS_ANDROID
//     ? ({ ...robotoWeights.regular, fontSize: scale(12) } as TextStyle)
//     : ({ ...sanFranciscoWeights.regular, fontSize: scale(12) } as TextStyle),
//   captionEmphasized: IS_ANDROID
//     ? ({ ...robotoWeights.bold, fontSize: scale(12) } as TextStyle)
//     : ({ ...sanFranciscoWeights.bold, fontSize: scale(12) } as TextStyle),
// }

// export const fontCarp = {
//   xxlarge: scale(30),
//   xlarge: scale(24),
//   large: scale(20),
//   medium: scale(16),
//   normal: scale(14),
//   small: scale(12),
//   xsmall: scale(11),
// }
