import { Platform, Linking } from 'react-native'
import * as Updates from 'expo-updates';
import { Alert } from "react-native";

export function capitalizeFirstLetter(string:string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export const openAppStore = () => {
  if (Platform.OS === 'android') {
    Linking.canOpenURL(`market://details?id=nameapp.app`)
      .then(() => {
        Linking.openURL(`market://details?id=nameapp.app`)
      })
      .catch((e) => console.log(e))
  } else if (Platform.OS === 'ios') {
    Linking.canOpenURL(`itms-apps://itunes.apple.com/app/id1525818781`)
      .then(() => Linking.openURL(`itms-apps://itunes.apple.com/app/id1525818781`))
      .catch((e) => console.log(e))
  }
}
export const SetObjectToModel = (obj:any, model:any) => {
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const val = obj[key]
      model[key] = val
    }
  }
}
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
export const RetryRequestIfFailed: <T>(fn: () => Promise<T>, limit?: number) => Promise<T> = async (fn, limit = 3) => {
  let tries = 1
  do {
    try {
      const data = await fn()
      if (!data) throw new Error('dont work')
      return data
    } catch (e) {
      tries++
      if (__DEV__) console.log(e, 'RetryRequestIfFailed')
    }
    await sleep(1000 * tries)
  } while (tries <= limit)
  throw new Error('retries exceeded')
}
export const Update = async ()=>{
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      

      // setState(true)
      Alert.alert('Actualización','Tu app se ha actualizado con exito.',[
        {
          text:'Re-inicializar',
          onPress: async ()=> await Updates.reloadAsync()
        }
      ],
      {cancelable:false});
      
    }
  } catch (e) {
    // handle or log error
  }
}