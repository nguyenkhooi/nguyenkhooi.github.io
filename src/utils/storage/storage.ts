import AsyncStorage from "@react-native-async-storage/async-storage";

export enum ASS_KEY {
  THEME = "@KHOOI:THEME",
  MASTERNAMES = "@KHOOI:MASTERNAME",
}

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
async function loadString(key: ASS_KEY): Promise<string | null> {
  try {
    console.log("🍑" + key + " string loaded!");
    return await AsyncStorage.getItem(key);
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null;
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
async function saveString(key: ASS_KEY, value: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("🍑" + key + " string saved!");
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
async function load(key: ASS_KEY): Promise<any | null> {
  try {
    const almostThere = await AsyncStorage.getItem(key);
    console.log("🍑" + key + " loaded and parsed!");
    return JSON.parse(almostThere);
  } catch {
    return null;
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
async function save(key: ASS_KEY, value: object): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log("🍑" + key + " saved!");
    return true;
  } catch {
    console.log("🍑" + key + " NOT saved!");
    return false;
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
async function remove(key: ASS_KEY): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
    console.log("🍑" + key + " removed!");
  } catch {}
}

/**
 * Burn it all to the ground.
 */
async function clear(): Promise<void> {
  try {
    await AsyncStorage.clear();
    console.log("🍑 ALL ass cleared! Bye bye");
  } catch {}
}

/**
 * ### Utils funtions to "CRUD" AsyncStorage
 * Yep, "ass" that is
 *
 * ---
 * @example
 * import { ass, ASS_KEY } = "utils"
 *
 * let nameC0 = await ass.load(ASS_KEY.MASTERNAMES)
 * async () => { await ass.saveString(ASS_KEY.THEME, "light")}
 * ---
 * @version 0.12.7
 * @author Nguyenkhooi
 */
export const ass = { load, loadString, save, saveString, clear, remove };
