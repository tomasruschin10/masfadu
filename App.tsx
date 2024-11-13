import "react-native-gesture-handler";

import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import {
  SourceSansPro_200ExtraLight,
  SourceSansPro_200ExtraLight_Italic,
  SourceSansPro_300Light,
  SourceSansPro_300Light_Italic,
  SourceSansPro_400Regular,
  SourceSansPro_400Regular_Italic,
  SourceSansPro_600SemiBold,
  SourceSansPro_600SemiBold_Italic,
  SourceSansPro_700Bold,
  SourceSansPro_700Bold_Italic,
  SourceSansPro_900Black,
  SourceSansPro_900Black_Italic,
} from "@expo-google-fonts/source-sans-pro";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { Box, StorageManager } from "native-base";
import { ColorMode, extendTheme, NativeBaseProvider } from "native-base";
import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Navigator from "./src/navigation/Navigators";
import { Update } from "./src/utils/helpers/helpers";
import { useFonts } from "expo-font";
import {
  Manrope_200ExtraLight,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";
import { Theme } from "./src/utils/Theme";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as amplitude from "@amplitude/analytics-react-native";
import { persistor, store } from "./src/redux/store";
import Message from "./src/components/Message";
import { navigationRef } from "./src/navigation/RootNavigation";
import { initializeApp } from "firebase/app";
import ModalRestriction from "./src/screens/modal/ModalRestriction";

SplashScreen.preventAutoHideAsync();

const firebaseConfig = {
  apiKey: "AIzaSyDVXoVRviTdtElSiS7c0O_vSjuxgbsM_aM",
  authDomain: "muy-fadu.firebaseapp.com",
  projectId: "muy-fadu",
  storageBucket: "muy-fadu.appspot.com",
  messagingSenderId: "306204851546",
  appId: "1:306204851546:web:c96a2f48279e16a3408763",
  measurementId: "G-0K1LQY8PR1",
};

initializeApp(firebaseConfig);
export default ({ children }: any) => {
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
    SourceSansPro_200ExtraLight,
    SourceSansPro_200ExtraLight_Italic,
    SourceSansPro_300Light,
    SourceSansPro_300Light_Italic,
    SourceSansPro_400Regular,
    SourceSansPro_400Regular_Italic,
    SourceSansPro_600SemiBold,
    SourceSansPro_600SemiBold_Italic,
    SourceSansPro_700Bold,
    SourceSansPro_700Bold_Italic,
    SourceSansPro_900Black,
    SourceSansPro_900Black_Italic,
  });
  /*   const [appIsReady, setAppIsReady] = React.useState(false);
   */
  // 	LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  // LogBox.ignoreAllLogs();//Ignore all log notifications
  const theme = extendTheme(Theme);
  const colorModeManager: StorageManager = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem("@my-app-color-mode");
        return val === "dark" ? "dark" : "light";
      } catch (e) {
        return "light";
      }
    },
    set: async (value: ColorMode) => {
      try {
        await AsyncStorage.setItem("@my-app-color-mode", value);
      } catch (e) {
        console.error(e);
      }
    },
  };
  Update();
  React.useEffect(() => {
    amplitude.init("4d36681a6f63af74279031f7e817a436");
    onLayoutRootView();
  }, [fontsLoaded]);
  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
          <NavigationContainer ref={navigationRef}>
            <ModalRestriction navigation={navigationRef} />
            <Navigator />
            <Message />
          </NavigationContainer>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};
