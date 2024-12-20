import { MaterialIcons } from "@expo/vector-icons";
import { Box, Button, Icon, Image, Input, View, VStack } from "native-base";
import React, { useEffect, useCallback } from "react";
import Container from "../../components/Container";
import { NoHeader } from "../../components/Header";
import { postServices } from "../../utils/hooks/services";
import { getUserDataWithToken } from "../../utils/storage";
import { useDispatch, useSelector } from "react-redux";
import { updatetoken } from "../../redux/actions/token";
import { updateMessage } from "../../redux/actions/message";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import {
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Text,
} from "react-native";
import jwtDecode from "jwt-decode";
import * as AppleAuthentication from "expo-apple-authentication";

import { fontStyles } from "../../utils/colors/fontColors";
import { moderateScale, verticalScale } from "../../utils/media.screens";

import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";

import { baseApi } from "../../utils/api";
import { updateUserdata } from "../../redux/actions/user";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as amplitude from "@amplitude/analytics-react-native";

WebBrowser.maybeCompleteAuthSession();

const { height, width } = Dimensions.get("window");

const bodyOffset = height * 0.15;
const contentWidth = width / 1.08;

function LoginScreen({ route, navigation }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "1044573282337-t0too7vkon8iaf2dhulhsbcrrmq59vt9.apps.googleusercontent.com",
    androidClientId:
      "1044573282337-clqfcumlk8g4ih4hplta6v88lcn72cks.apps.googleusercontent.com",
    iosClientId:
      "1044573282337-l2n519m10p7bp6aka5eusa0gomh9u720.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  useFocusEffect(
    useCallback(() => {
      amplitude.logEvent("Pantalla visitada", { screen: "Login" });
    }, [])
  );

  const handleSignInWithGoogle = async () => {
    if (response?.type === "success") {
      try {
        const userData = await getGoogleUserInfo(
          response.authentication.accessToken
        );
        setLoading(true);
        postServices("auth/login", {
          userOrEmail: userData.email,
          password: userData.id,
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
          .catch((error) => {
            if (error.response.status === 401) {
              dispatch(
                updateMessage({
                  body: "No existe una cuenta con este email, primero registrate.",
                  open: true,
                  type: "danger",
                })
              );
            }
          });
      } catch (error) {
        console.error("Error al autenticar con Google:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getGoogleUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();

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

  const getLogin = async () => {
    if (email === "" || password === "") {
      dispatch(
        updateMessage({
          body: "Por favor, llená todos los campos para iniciar sesión.",
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
        showAlert("success", "Inicio correcto!");
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

  const loginVisit = () => {
    setLoading(true);
    postServices("auth/login", {
      userOrEmail: "alumno@erickcampas.com",
      password: "alumno",
    })
      .then((res: any) => {
        showAlert("success", "Has ingresado como invitado!");
        dispatch(updatetoken(res.data.token));
        const { userData }: any = jwtDecode(res.data.token);
        userData.userRole[0].role.name = "Visit"; // Make visit
        dispatch(updateUserdata(userData));
        navigation.navigate("Home");
      })
      .catch((e) => {
        dispatch(
          updateMessage({
            body: "Ha ocurrido un error al ingresar como invitado.",
            open: true,
            type: "danger",
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAppleLogin = async () => {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      ],
    });
    const { email } = jwtDecode(credential.identityToken);
    setLoading(true);
    postServices("auth/login", {
      userOrEmail: email,
      password: credential.user,
    })
      .then((res: any) => {
        showAlert("success", "Inicio correcto!");
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
        dispatch(
          updateMessage({
            body: "No existe una cuenta con este Apple id.",
            open: true,
            type: "danger",
          })
        );
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
              w={120}
              mb={verticalScale(50)}
              h={120}
              alt="Logo de Fadu"
              source={require("../../../assets/logo.png")}
            />

            <Input
              type="text"
              value={email}
              variant="unstyled"
              fontSize={moderateScale(14)}
              placeholder="Email o Usuario"
              h={verticalScale(55)}
              onChangeText={(text) => setEmail(text)}
              mb={4}
              placeholderTextColor="#797979"
              rounded={8}
              bg="#FFFFFF"
              borderColor="#FFFFFF"
              focusOutlineColor="#FFFFFF"
              shadow="none"
              style={styles.inputField}
            />
            <Input
              value={password}
              variant="unstyled"
              type={showPassword ? "text" : "password"}
              w={{
                base: "100%",
                md: "100%",
              }}
              mb={4}
              h={verticalScale(55)}
              rounded={8}
              InputRightElement={
                <TouchableOpacity
                  style={{ marginRight: 9 }}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <MaterialIcons
                    size={25}
                    name={showPassword ? "visibility" : "visibility-off"}
                    color={"#797979"}
                  />
                </TouchableOpacity>
              }
              placeholder="Contraseña"
              placeholderTextColor="#797979"
              fontSize={moderateScale(14)}
              bg="#FFFFFF"
              borderColor="#FFFFFF"
              focusOutlineColor="#FFFFFF"
              onChangeText={(text) => setPassword(text)}
              shadow="none"
              style={styles.inputField}
            />

            <Button
              width={500}
              maxWidth={contentWidth}
              borderRadius={moderateScale(8)}
              height={verticalScale(55)}
              onPress={() => getLogin()}
              isLoading={loading}
              backgroundColor={"#DA673A"}
            >
              <Text
                style={[
                  fontStyles.poppins400,
                  {
                    color: "white",
                    fontWeight: "600",
                    fontSize: moderateScale(14),
                  },
                ]}
              >
                Iniciar Sesión
              </Text>
            </Button>
            <Button
              onPress={() => navigation.navigate("RecoveryPassword")}
              variant="link"
            >
              <Text
                style={[
                  fontStyles.poppins400,
                  {
                    color: "#797979",
                    fontSize: moderateScale(14),
                  },
                ]}
              >
                ¿Te olvidaste la contraseña?
              </Text>
            </Button>
            <Button onPress={() => loginVisit()} variant="link">
              <Text
                style={[
                  fontStyles.poppins400,
                  {
                    color: "#DA673A",
                    fontSize: moderateScale(14),
                  },
                ]}
              >
                Ingresar como invitado
              </Text>
            </Button>
          </Box>

          <Box pt={PixelRatio.roundToNearestPixel(5)}>
            <View
              style={{
                flexDirection: Platform.OS === "ios" ? "row" : "column",
                justifyContent:
                  Platform.OS === "ios" ? "space-between" : "center",
                alignItems: Platform.OS !== "ios" ? "center" : "stretch",
              }}
            >
              <Button
                mb={5}
                w={Platform.OS === "ios" ? "48%" : "100%"}
                h={verticalScale(55)}
                rounded={moderateScale(8)}
                backgroundColor={"#FFFFFF"}
                onPress={() => promptAsync()}
                _spinner={{ color: "black" }}
                _text={{
                  color: "#797979",
                  fontSize: moderateScale(13),
                  fontWeight: "400",
                }}
                colorScheme={"light"}
                color={"darkText"}
                leftIcon={
                  <TouchableWithoutFeedback>
                    <Image
                      source={require("../../../assets/icons/google.png")}
                      size={5}
                      alt={"logo de google"}
                    />
                  </TouchableWithoutFeedback>
                }
              >
                Iniciar sesión
              </Button>

              {Platform.OS === "ios" && (
                <TouchableOpacity
                  style={{
                    width: "48%",
                    height: verticalScale(55),
                    backgroundColor: "black",
                    borderRadius: moderateScale(8),
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingHorizontal: 10,
                  }}
                  onPress={handleAppleLogin}
                >
                  <AntDesign name="apple1" size={20} color="white" />
                  <Text
                    style={{
                      color: "white",
                      marginLeft: 5,
                      fontSize: moderateScale(14),
                      fontWeight: "400",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  >
                    Iniciar sesión
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <Box flexDirection={"row"} justifyContent={"center"}>
              <Box justifyContent={"center"}>
                <Text style={{ color: "#797979" }}>¿No tenés una cuenta?</Text>
              </Box>
              <Button
                px={1.5}
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

const styles = StyleSheet.create({
  inputField: {
    shadowColor: "#FFFFFF",
    color: "#797979",
    borderRadius: 8,
    borderBottomColor: "#FFFFFF",
    borderColor: "#FFFFFF",
  },
});

export default React.memo(LoginScreen);
