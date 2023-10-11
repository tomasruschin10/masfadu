import { MaterialIcons } from "@expo/vector-icons";
import { Box, Button, Icon, Image, Input, Text, View, VStack } from "native-base";
import * as React from "react";
import Container from "../../components/Container";
import { NoHeader } from "../../components/Header";
/* import Hr from "../../components/Hr"; */
import { postServices } from "../../utils/hooks/services";
import { getUserDataWithToken } from "../../utils/storage";
import { useDispatch } from "react-redux";
import { updatetoken } from "../../redux/actions/token";
import { updateMessage } from "../../redux/actions/message";

/* import * as Google from "expo-auth-session/providers/google";*/
import {
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
  PixelRatio,
} from "react-native";
import jwtDecode from "jwt-decode";
import * as AppleAuthentication from "expo-apple-authentication";

import {
  getAuth,
  OAuthProvider,
  signInWithCredential,
  /*   FacebookAuthProvider,
    GoogleAuthProvider, */
} from "firebase/auth";
import { updateUserdata } from "../../redux/actions/user";
import { baseApi } from "../../utils/api";
import { fontStyles } from "../../utils/colors/fontColors";
import DefaultButton from "../../components/DefaultButton";
import { moderateScale, verticalScale } from "../../utils/media.screens";

const { height, width } = Dimensions.get("window");
/* const bodyOffset = height * 0.15;
const contentWidth = width / 1.2; */

const bodyOffset = height * 0.15;
const contentWidth = width / 1.2;

function LoginScreen({ route, navigation }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  /*   const [isLoading, setIsLoading] = React.useState(false);
    const { uid } = useSelector((state: any) => state.user);
   */

  React.useEffect(() => {
    if (__DEV__) {
      setEmail("alumno@erickcampas.com");
      setPassword("alumno");
    }
  }, []);

  const [alert, setAlert] = React.useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const closeAlert = () => {
    setAlert(null);
  };


  const getLogin = async () => {
    if (email === "" || password === "") {
      dispatch(
        updateMessage({
          body: "Por favor, llená todos los campos para iniciar sesión.",
          open: true,
          type: "danger",
        })
      );
      /*  showAlert("error", "Por favor, llená todos los campos para iniciar sesión.") */
      return false;
    }
    setLoading(true);
    postServices("auth/login", {
      userOrEmail: email,
      password: password,
    })
      .then((res: any) => {
        showAlert('success', 'Inicio correcto!')
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
        )

      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <NoHeader />

      <ScrollView keyboardShouldPersistTaps={"handled"}>
        <VStack maxWidth={contentWidth} mx={"auto"}>
          <Box style={{ marginTop: bodyOffset }} alignItems="center">
            <Image
              w={100}
              mb={verticalScale(50)}
              h={100}
              alt="Logo de Fadu"
              source={require("../../../assets/logo.png")}
            />

            <Input
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
              type={"text"}
              mx="3"
              mb={4}
              w="100%"
              h={verticalScale(50)}
              rounded={moderateScale(14)}
 
            />
            <Input
              value={password}
              onChangeText={(text) => setPassword(text)}
              w={{
                base: "100%",
                md: "25%",
              }}
              mb={4}
              h={verticalScale(50)}
              rounded={moderateScale(14)}
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
            <DefaultButton buttonStyle={{
              backgroundColor: "#DA673A",
              borderRadius: moderateScale(14),
              height: verticalScale(50),
              width: 500,
              maxWidth: contentWidth,
            }}
              textStyle={
                {
                  fontSize: moderateScale(12)
                }
              }

              containerStyle={{
                marginBottom: PixelRatio.roundToNearestPixel(15)
              }}

              title="Iniciar Sesión"
              callBack={getLogin} />

            <Button
              onPress={() => navigation.navigate("RecoveryPassword")}
              isLoading={loading}
              variant="link"
            >
              <Text style={[fontStyles.poppins400, {
                color: "#797979"
              }]} >
                ¿Te olvidaste la contraseña?
              </Text>
            </Button>
          </Box>
          {/*           <Box py={2} px={5}>
            <Hr text={"ó"} />
          </Box> */}

          <Box alignItems="center" pt={PixelRatio.roundToNearestPixel(50)}>
            <Button
              mb={5}
              w="100%"
              h={verticalScale(50)}
              rounded={ moderateScale(14)}
              backgroundColor={"#FFFFFF"}
              onPress={() => navigation.navigate("GoogleLogin")}
              _spinner={{ color: "black" }}
              isLoading={loading}

              _text={{ color: "#797979", fontSize:  moderateScale(12) }}
              colorScheme={"ligth"}
              color={"darkText"}
            >
              Iniciar Sesión con Google
            </Button>
            {Platform.OS === "ios" ? (
              <AppleAuthentication.AppleAuthenticationButton
                buttonType={
                  AppleAuthentication.AppleAuthenticationButtonType.CONTINUE
                }
                buttonStyle={
                  AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
                }
                cornerRadius={moderateScale(14)}
                style={{
                  width: 500,
                  maxWidth: contentWidth,
                  borderRadius: moderateScale(14),
                  height: verticalScale(50),
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
                          console.log('user', res)

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

                              /*   showAlert('sucess', 'Inicio correcto!') */
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
                                    body: "El usuario no existe :(",
                                    open: true,
                                    type: "warning",
                                  })
                                );

                                /*  showAlert('warning', 'El usuario no existe :(') */
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
                              body: "Ups Algo salió mal, por favor volvé a intentar.' ",
                              open: true,
                              type: "danger",
                            })
                          );

                          /*  showAlert('error', 'Ups Algo salió mal, por favor volvé a intentar.') */
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
              />
            ) : null}


            <Box flexDirection={"row"} justifyContent={"center"}>
              <Box justifyContent={"center"}>
                <Text color="#797979">¿No tenés una cuenta?</Text>
              </Box>
              <Button
                isLoading={loading}
                onPress={() => navigation.navigate("Registro")}
                variant="link"
                _text={{ fontWeight: "bold", color: "#797979" }}
              >
                Registrate
              </Button>
            </Box>
          </Box>
        </VStack>
      </ScrollView>
    </Container>
  );
}

export default React.memo(LoginScreen);
