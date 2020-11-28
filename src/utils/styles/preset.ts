import * as R from "ramda";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { CalendarTheme } from "react-native-calendars";
import { dColors } from "utils/typings";
// import { typoCarp } from "./index";
import { getBottomSpace, scale } from "../helpers";
import { colors } from "./color";
import { spacing } from "./spacing";

/**
 * A set of preset styles for the codebase, based on Carmec's design system
 */
export const PRE = (C?: dColors) => {
  let _C = R.isNil(C) ? colors : C;
  return {
    HEADER: {
      SECTIONS: {
        // ...typoCarp.subtitleEmphasized,
        paddingVertical: spacing(2),
        color: _C.grey900,
      } as TextStyle,
      SEPARATOR_CTNR: {
        backgroundColor: _C.surface,
        flexDirection: "row",
        height: scale(30),
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: spacing(3),
      } as ViewStyle,
    },

    /**
     * Technically a styled button
     * that when user click, an input will show up
     *
     * We use this to fix the android input display issue that
     * not show the beginning of the text
     */
    pseudoInput: {
      style: {
        backgroundColor: _C.transparent,
        // alignItems: "flex-start",
        // paddingLeft: spacing(5),
        // paddingVertical: spacing(2),
        // borderWidth: 1,
        // borderColor: _C.line,
        // borderRadius: scale(10),
        // height: scale(50)
      } as ViewStyle,
      textStyle: {
        // ...typoCarp.subtitleEmphasized,
        textAlign: "left",
        color: _C.text,
        // marginVertical: spacing(2),
      } as TextStyle,
    },
    BUTTON: {
      ICON_CTNR: {
        borderRadius: 500, //* round af
        backgroundColor: _C.transparent,
      } as ViewStyle,
      SAFE_ICON_CTNR: {
        padding: scale(5),
        borderRadius: 500, //* round af
        backgroundColor: _C.transparent,
      } as ViewStyle,
    },
    CALENDAR: {
      backgroundColor: _C.pitchWhite,
      calendarBackground: _C.pitchWhite,
      textSectionTitleColor: _C.grey900,
      selectedDayBackgroundColor: _C.primary,
      selectedDayTextColor: _C.text01,
      todayTextColor: _C.awakenVolt,
      dayTextColor: _C.text,
      textDisabledColor: _C.grey500,
      dotColor: "#00adf5",
      selectedDotColor: "#ffffff",
      arrowColor: _C.primaryDarker,
      monthTextColor: _C.primaryDarker,
      textMonthFontFamily: "Montserrat-Bold",
    } as CalendarTheme,
    CARD: {
      ACCORDION: {
        OVERVIEW_CTNR_00: {
          borderColor: _C.surface,
          borderTopLeftRadius: scale(10),
          borderTopRightRadius: scale(10),
          paddingTop: scale(10),
        } as ViewStyle,
        OVERVIEW_CTNR_1: {
          borderColor: _C.surface01,
          borderTopLeftRadius: scale(10),
          borderTopRightRadius: scale(10),
          paddingTop: scale(10),
        } as ViewStyle,
        OVERVIEW_CTNR_2: {
          borderColor: _C.primaryDarker,
          borderTopLeftRadius: scale(10),
          borderTopRightRadius: scale(10),
          paddingTop: scale(10),
        } as ViewStyle,
        CONTENT_CTNR: {
          padding: scale(10),
          backgroundColor: _C.surface01,
          borderBottomEndRadius: scale(10),
          borderBottomLeftRadius: scale(10),
          marginBottom: scale(5),
        } as ViewStyle,
        CONTENT_CTNR_2: {
          padding: scale(10),
          backgroundColor: _C.primaryDarker,
          borderBottomEndRadius: scale(10),
          borderBottomLeftRadius: scale(10),
          marginBottom: scale(5),
        } as ViewStyle,
        CONTENT_CTNR_00: {
          padding: scale(10),
          backgroundColor: _C.surface,
          borderBottomEndRadius: scale(10),
          borderBottomLeftRadius: scale(10),
          marginBottom: scale(5),
        } as ViewStyle,
        CONTENT_BUTTON_CTNR_1: {
          alignItems: "stretch",
          paddingVertical: scale(5),
        } as ViewStyle,
        CONTENT_BUTTON_CTNR_2: {
          alignItems: "center",
          paddingVertical: scale(5),
        } as ViewStyle,
        CONTENT_BUTTON_CTNR_3: {
          alignItems: "flex-end",
          paddingVertical: scale(5),
        } as ViewStyle,
      },
    },
    FORM: {
      CTNR_SAFE: {
        paddingHorizontal: spacing(5),
        backgroundColor: _C.surface,
        // paddingBottom: getBottomSpace("safe"),
      } as ViewStyle,
      CTNR: {
        paddingHorizontal: 0,
        backgroundColor: _C.surface,
      } as ViewStyle,
      INPUT_LABEL: {
        // ...typoCarp.subtitleEmphasized,
        fontFamily: `Montserrat-Bold`,
        color: _C.text,
        flex: 1,
      } as TextStyle,
    },

    /**
     * CARP Preset for Google Places Autocomplete
     */
    PLACES: {
      container: { backgroundColor: _C.transparent } as ViewStyle,
      textInputContainer: {
        height: scale(60),
        backgroundColor: _C.surface,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        justifyContent: "flex-start",
      } as ViewStyle,
      textInput: {
        backgroundColor: _C.transparent,
        // ...typoCarp.subtitle,
        color: _C.text,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 10,
        paddingRight: 10,
        // borderWidth: 1,
      } as TextStyle,
      description: {
        // ...typoCarp.body,
        color: _C.text,
        borderTopWidth: 0,
        borderBottomWidth: 0,
      } as TextStyle,
      predefinedPlacesDescription: {
        // ...typoCarp.subtitle,
        color: _C.primary,
        borderTopWidth: 0,
        borderBottomWidth: 0,
      } as TextStyle,
      separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: _C.transparent,
      } as ViewStyle,
      poweredContainer: {
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: _C.transparent,
      } as ViewStyle,
    },
    SCR: {
      paddingHorizontal: spacing(3),
      // paddingBottom: getBottomSpace("safe"),
    } as ViewStyle,
    /** General footer CTNR */
    FOOTER: {
      paddingHorizontal: spacing(5),
      paddingBottom: getBottomSpace("safe"),
    } as ViewStyle,
  };
};
