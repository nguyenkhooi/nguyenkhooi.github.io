// import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
// import en from "./en.json";
// import vi from "./vi.json";
import { useSheets } from "engines";
import * as R from "ramda";
import Tabletop from "tabletop";
type i18nResolve = { code: "I18N_DONE" };

/**
 * Fetch i18n tr() from sheets
 *
 * ---
 * @version 0.10.19
 * @author nguyenkhooi
 */
export async function fetchi18n() {
  // const { data } = useSheets(0, "i18n");
  const sheetData = await Tabletop.init({
    key: "1QkECelCYiVVxopwsZD2UsLYZdmd1vFzFc0-pLb71rX8",
    /** set `wanted` with specific `sheetName` to get data only from that sheet */
    wanted: ["i18n"],
    simpleSheet: true,
  });
  return new Promise<i18nResolve>((resolve, reject) => {
    try {
      if (!!sheetData) {
        const i18nCodes = R.pluck("code")(sheetData);
        const i18nEns = R.pluck("en")(sheetData);
        const i18nVis = R.pluck("vi")(sheetData);
        let en = R.zipObj(i18nCodes, i18nEns);
        let vi = R.zipObj(i18nCodes, i18nVis);
        i18n.translations = { en, vi };
        setTimeout(() => {
          console.log("here!!!!");
          resolve({ code: "I18N_DONE" });
        }, 3000);
      }
    } catch (error) {
      console.warn("err useSheets: ", error);
      return null;
    }
  });
}

i18n.fallbacks = true;
//* In case such keyword is not in the list yet, return the keyword itself
i18n.missingTranslation = function (keyword) {
  return keyword;
};

// const fallback = { languageTag: "en", isRTL: false };
// const { languageTag } =
//   RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations)) ||
//   fallback;
// i18n.locale = languageTag;
i18n.locale = "en";
