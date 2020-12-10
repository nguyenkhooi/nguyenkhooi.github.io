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
export function tr(key: enumKey | string, options?: object) {
  return key ? i18n.t(key, options) : key;
}

type enumKey = "tba";
