import { useAppContext } from "engines";
import i18n from "i18n-js";

/**
 * Translates text based on keyword (== "en")
 * If no translation found yet, it'll return the keyword
 * ---
 * @example
 * ```js
 * <Text>{tr("Hello")}</Text>
 * ```
 * ---
 * @version 0.10.19
 * - *(add enumKey)*
 * - *(reduce function name for cleaner code)*
 * @author nguyenkhooi
 */
export function use18(key: enumKey | string, options?: i18n.TranslateOptions) {
  const { lang, setLang } = useAppContext();
  return lang[key] ? lang[key] : key;
}

type enumKey = "tba";

export enum LANG {
  EN = "en",
  VI = "vi",
}
