import AsyncStorage from '@react-native-async-storage/async-storage';

export const getInfo = async (key) => {
    try {
        let userid = "root"
        let value = await AsyncStorage.getItem(userid.toString());
        if (value) {
            value = JSON.parse(value);
            let data = value[key];
            return data;
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
}


export const setInfo = async (key, value) => {
    try {
        let userid = "root"
        let cachedData = await getInfo(userid.toString());
        if (cachedData) {
            cachedData = JSON.parse(cachedData);
            await removeInfo(userid.toString());
            cachedData[key] = {};
            cachedData[key] = value;
            await AsyncStorage.setItem(userid.toString(), JSON.stringify(cachedData))
        } else {
            cachedData = {};
            cachedData[key] = value;
            await AsyncStorage.setItem(userid.toString(), JSON.stringify(cachedData))
        }

    } catch (e) {
    }
}

export const removeInfo = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch (exception) {
        return false;
    }
}
