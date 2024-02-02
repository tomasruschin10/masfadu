import { Box, Button, Text } from "native-base";
import * as React from "react";
import { HeaderBack } from "../../components/Header";
import * as Google from "expo-auth-session/providers/google";
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import { WebView } from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
import { updateMessage } from "../../redux/actions/message";
import { updatetoken } from "../../redux/actions/token";
import { updateUserdata } from "../../redux/actions/user";
import jwtDecode from "jwt-decode";
import { baseApi } from "../../utils/api";

WebBrowser.maybeCompleteAuthSession();

function GoogleScreen({ navigation }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const { uid } = useSelector((state: any) => state.user);
  const [authUrl, setAuthUrl] = React.useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "1044573282337-clqfcumlk8g4ih4hplta6v88lcn72cks.apps.googleusercontent.com",
    iosClientId:
      "1044573282337-l2n519m10p7bp6aka5eusa0gomh9u720.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const auth = getAuth();
      try {
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential)
          .then(async (res) => {
            let user = res.user;
            const newUser = {
              userOrEmail: user?.email,
              password: user?.uid,
            };
            await baseApi
              .post(`/auth/login`, newUser, {})
              .then((us) => {
                dispatch(updatetoken(us.data.token));
                dispatch(
                  updateMessage({
                    body: "Inicio correcto. ",
                    open: true,
                    type: "success",
                  })
                );
                setIsLoading(false);
                const dataa = jwtDecode(us.data.token);
                dispatch(updateUserdata(dataa));
                navigation.reset({
                  routes: [{ name: "SplashScreen" }],
                  index: 0,
                });
              })
              .catch((err) => {
                if (err.response.status === 401) {
                  setIsLoading(false);
                  dispatch(
                    updateMessage({
                      body: "Su usuario no existe en nuestro banco de datos. ",
                      open: true,
                      type: "danger",
                    })
                  );
                } else {
                  setIsLoading(false);
                  dispatch(
                    updateMessage({
                      body: "Ups Algo salio mal, porfavor vuelva a intentar. ",
                      open: true,
                      type: "danger",
                    })
                  );
                }
              })
              .finally(() => {
                setIsLoading(false);
              });
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
            dispatch(
              updateMessage({
                body: "Ups Algo salio mal, porfavor vuelva a intentar. ",
                open: true,
                type: "danger",
              })
            );
          });
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  }, [response]);

  React.useEffect(() => {
    if (request) {
      setAuthUrl(request.url);
    }
  }, [request]);

  return (
    <WebView
      source={{ uri: authUrl }}
      userAgent={
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
      }
    />
  );
}

export default React.memo(GoogleScreen);
