import { MaterialIcons } from "@expo/vector-icons";
import { Box, Button, Icon, Image, Input, Text, VStack } from "native-base";
import * as React from "react";
import Container from "../../components/Container";
import { NoHeader } from "../../components/Header";
import Hr from "../../components/Hr";
import { postServices } from "../../utils/hooks/services";
import { getUserDataWithToken } from "../../utils/storage";
import { useDispatch, useSelector } from "react-redux";
import { updatetoken } from "../../redux/actions/token";
import { updateMessage } from "../../redux/actions/message";
import { AntDesign } from "@expo/vector-icons";

import * as Google from "expo-auth-session/providers/google";

import {
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  TouchableOpacity,
} from "react-native";
import jwtDecode from "jwt-decode";
import * as AppleAuthentication from "expo-apple-authentication";
import {
  getAuth,
  OAuthProvider,
  signInWithCredential,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { updateUserdata } from "../../redux/actions/user";
import { baseApi } from "../../utils/api";

function LoginScreen({ route, navigation }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const { uid } = useSelector((state: any) => state.user);

  React.useEffect(() => {
    if (__DEV__) {
      setEmail("alumno@erickcampas.com");
      setPassword("alumno");
    }
  }, []);
  const getLogin = async () => {
    if (email === "" || password === "") {
      dispatch(
        updateMessage({
          body: "Por favor llena todos los campos para logearte.",
          open: true,
          type: "danger",
        })
      );
      return false;
    }
    setLoading(true);
    postServices("auth/login", {
      userOrEmail: email,
      password: password,
    })
      .then((res: any) => {
        dispatch(updatetoken(res.data.token));
        getUserDataWithToken(res.data.token);
        let data: any = jwtDecode(res.data.token);
        if (data.userData.career) {
          navigation.navigate("Home");
        } else {
          navigation.navigate("Onboarding1");
        }
      })
      .catch((e) => {
        if (__DEV__) {
          console.log("🚀 ~ file: LoginScreen.tsx ~ line 41 ~ getLogin ~ e", e);
        }
        dispatch(
          updateMessage({
            body: "Las credenciales no coinciden.",
            open: true,
            type: "danger",
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "58870024888-9kjr3cuc1ol7e9okdcrvmtrl3jap2e9d.apps.googleusercontent.com",
    responseType: "id_token",
    expoClientId:
      "58870024888-jltdo7pnna5a43nm8f6lueg8k93ikona.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      setIsLoading(true);

      const { id_token } = response.params;
      console.log(
        "🚀 ~ file: GoogleScreen.tsx ~ line 35 ~ React.useEffect ~ response",
        response
      );

      const auth = getAuth();
      console.log(
        "🚀 ~ file: GoogleScreen.tsx ~ line 38 ~ React.useEffect ~ auth",
        auth
      );
      try {
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential)
          .then(async (res) => {
            // console.log('user',user)

            let user = res.user;

            const newUser = {
              userOrEmail: user?.email,
              password: user?.uid,
            };
            await baseApi
              .post(`/auth/login`, newUser, {})
              .then((us) => {
                console.log(
                  "🚀 ~ file: GoogleScreen.tsx ~ line 51 ~ signInWithCredential ~ us",
                  us
                );

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
            console.log(
              "🚀 ~ file: LoginScreen.tsx ~ line 193 ~ signInWithCredential ~ err",
              err
            );
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
        console.log(
          "🚀 ~ file: LoginScreen.tsx ~ line 176 ~ newPromise ~ error",
          error
        );
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [response]);

  const LoginGoogle = async () => {
    await promptAsync().finally(() => {
      setIsLoading(true);
      if (response?.type === "success") {
        const { id_token } = response.params;

        const auth = getAuth();
        try {
          const credential = GoogleAuthProvider.credential(id_token);
          signInWithCredential(auth, credential)
            .then(async (res) => {
              // console.log('user',user)

              let user = res.user;

              const newUser = {
                userOrEmail: user?.email,
                password: user?.uid,
              };
              await baseApi
                .post(`/auth/login`, newUser, {})
                .then((us) => {
                  console.log(
                    "🚀 ~ file: GoogleScreen.tsx ~ line 51 ~ signInWithCredential ~ us",
                    us
                  );

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
              console.log(
                "🚀 ~ file: LoginScreen.tsx ~ line 193 ~ signInWithCredential ~ err",
                err
              );
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
          console.log(
            "🚀 ~ file: LoginScreen.tsx ~ line 176 ~ newPromise ~ error",
            error
          );
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    });
  };

  return (
    <Container>
      <NoHeader />
      <ScrollView keyboardShouldPersistTaps={"handled"}>
        <VStack px={5}>
          <Box mt={20} alignItems="center">
            <Image
              w={100}
              mb={5}
              h={100}
              alt="Logo de Fadu"
              source={require("../../../assets/logo.png")}
            />
            <Input
              mx="3"
              mb={4}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
              w="90%"
            />
            <Input
              value={password}
              onChangeText={(text) => setPassword(text)}
              w={{
                base: "90%",
                md: "25%",
              }}
              mb={4}
              type={showPassword ? "text" : "password"}
              InputRightElement={
                <Icon
                  as={
                    <MaterialIcons
                      name={showPassword ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              placeholder="Contraseña"
            />
            <Button onPress={getLogin} mb={3} w="90%" isLoading={loading}>
              Iniciar Sesión
            </Button>
            <Button
              onPress={() => navigation.navigate("RecoveryPassword")}
              isLoading={loading}
              variant="link"
            >
              ¿Te olvidaste la contraseña?
            </Button>
          </Box>
          <Box py={2} px={5}>
            <Hr text={"ó"} />
          </Box>

          <Box alignItems="center">
            <Button
              mb={5}
              w="90%"
              onPress={() => LoginGoogle()}
              // onPress={() => navigation.navigate("GoogleLogin")}
              _spinner={{ color: "black" }}
              isLoading={isLoading}
              leftIcon={
                <TouchableWithoutFeedback>
                  <Image
                    source={require("../../../assets/icons/google.png")}
                    size={5}
                    mr="2"
                    alt={"logo de google"}
                  />
                </TouchableWithoutFeedback>
              }
              _text={{ color: "darkText" }}
              colorScheme={"ligth"}
              color={"darkText"}
            >
              Iniciar Sesión con Google
            </Button>

            {Platform.OS === "ios" ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "#000000",
                  borderRadius: 5,
                  padding: 10,
                  margin: 10,
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
                onPress={async () => {
                  try {
                    const credential = await AppleAuthentication.signInAsync({
                      requestedScopes: [
                        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                        AppleAuthentication.AppleAuthenticationScope.EMAIL,
                      ],
                    });
                    const identuityToken = credential.identityToken;
                    if (identuityToken) {
                      const provider = new OAuthProvider("apple.com");
                      provider.addScope("email");
                      provider.addScope("fullName");
                      const credential = provider.credential({
                        idToken: identuityToken,
                      });
                      const auth = getAuth();

                      await signInWithCredential(auth, credential)
                        .then(async (res) => {
                          // console.log('user',user)

                          let user = res.user;

                          const newUser = {
                            userOrEmail: user?.email,
                            password: user?.uid,
                          };
                          await baseApi
                            .post(`/auth/login`, newUser, {})
                            .then((us) => {
                              console.log(
                                "🚀 ~ file: GoogleScreen.tsx ~ line 51 ~ signInWithCredential ~ us",
                                us
                              );

                              dispatch(updatetoken(us.data.token));
                              dispatch(
                                updateMessage({
                                  body: "Inicio correcto. ",
                                  open: true,
                                  type: "success",
                                })
                              );
                              setLoading(false);
                              const dataa = jwtDecode(us.data.token);
                              dispatch(updateUserdata(dataa));
                              navigation.reset({
                                routes: [{ name: "SplashScreen" }],
                                index: 0,
                              });
                            })
                            .catch((err) => {
                              if (err.response.status === 401) {
                                setLoading(false);
                                dispatch(
                                  updateMessage({
                                    body: "Su usuario no existe en nuestro banco de datos. ",
                                    open: true,
                                    type: "danger",
                                  })
                                );
                              } else {
                                setLoading(false);
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
                              setLoading(false);
                            });
                        })
                        .catch((err) => {
                          console.log(
                            "🚀 ~ file: LoginScreen.tsx ~ line 193 ~ signInWithCredential ~ err",
                            err
                          );
                          setLoading(false);
                          dispatch(
                            updateMessage({
                              body: "Ups Algo salio mal, porfavor vuelva a intentar. ",
                              open: true,
                              type: "danger",
                            })
                          );
                        });
                      // signed in
                    }
                  } catch (e) {
                    console.log(
                      "🚀 ~ file: LoginScreen.tsx ~ line 173 ~ onPress={ ~ e",
                      e
                    );
                    if (e.code === "ERR_CANCELED") {
                      // handle that the user canceled the sign-in flow
                    } else {
                      // handle other errors
                    }
                  }
                }}
              >
                <AntDesign name="apple1" size={18} color="white" />

                <Text
                  style={{
                    color: "#ffffff",
                    fontWeight: "bold",
                    textAlign: "center",
                    paddingHorizontal: 10,
                    fontSize: 15,
                  }}
                >
                  Iniciar Sesión con Apple
                </Text>
              </TouchableOpacity>
            ) : null}

            <Box flexDirection={"row"} justifyContent={"center"}>
              <Box justifyContent={"center"}>
                <Text>¿No tienes una cuenta?</Text>
              </Box>
              <Button
                isLoading={loading}
                onPress={() => navigation.navigate("Registro")}
                variant="link"
                _text={{ fontWeight: "bold" }}
              >
                Regístrate
              </Button>
            </Box>
          </Box>
        </VStack>
      </ScrollView>
    </Container>
  );
}

export default React.memo(LoginScreen);
