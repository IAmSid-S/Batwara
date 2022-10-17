import AsyncStorage from "@react-native-community/async-storage";
import { LOCALSTORAGE_USER_KEYS } from "../Types/User/User";


export type LocalStorageConstants = LOCALSTORAGE_USER_KEYS



export const storeData = async (key: LocalStorageConstants, keyModifier: string, value: any): Promise<boolean> => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(`${key}-${keyModifier}`, jsonValue)
    } catch (e) {
        console.log('Saving error: ', e)
        return false
    }
    return true
}

export const getData = async<Type>(key: LocalStorageConstants, keyModifier: string): Promise<Type | null> => {
    try {
        const jsonValue = await AsyncStorage.getItem(`${key}-${keyModifier}`)
        const result: Type = jsonValue != null ? JSON.parse(jsonValue) : null;

        if (result === null) { }
        return result;
    } catch (e) {
        console.log('Error while fetching', e);
        return null;
    }
}

export const removeKey = async (key: LocalStorageConstants, keyModifier: string): Promise<boolean> => {
    try {
        const jsonValue = await AsyncStorage.removeItem(`${key}-${keyModifier}`)
    } catch (e) {
        console.log('Error while fetching', e);
        return false;
    }
    return true;
}