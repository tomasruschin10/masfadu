import * as React from "react";
import { Box, Button, Icon, Image, Input, VStack } from "native-base";
import {
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Container from "../../components/Container";
import { HeaderBack } from "../../components/Header";
import Hr from "../../components/Hr";

import { updateMessage } from "../../redux/actions/message";
import { updatetoken } from "../../redux/actions/token";

import { getUserDataWithToken } from "../../utils/storage";
import { postServices } from "../../utils/hooks/services";
import { isValidEmail, isValidPassword } from "../../utils/validators";
import { moderateScale, verticalScale } from "../../utils/media.screens";

import * as WebBrowser from "expo-web-browser";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

function RegisterScreen({ route, navigation }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRePassword, setShowRePassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    email: "",
    emailError: null,
    password: "",
    passwordError: null,
    google_user: false,
    name: "",
    lastname: "",
    role_id: 2,
    username: "",
  });
  const [repeatPass, setRepeatPass] = React.useState("");
  const dispatch = useDispatch();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "1044573282337-t0too7vkon8iaf2dhulhsbcrrmq59vt9.apps.googleusercontent.com",
    androidClientId:
      "1044573282337-clqfcumlk8g4ih4hplta6v88lcn72cks.apps.googleusercontent.com",
    iosClientId:
      "1044573282337-l2n519m10p7bp6aka5eusa0gomh9u720.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    handleRegisterWithGoogle();
  }, [response]);

  const generateUsername = (firstName, lastName) => {
    const combinedName = `${firstName}${lastName}`.toLowerCase();
    const cleanedName = combinedName.replace(/[^a-zA-Z0-9]/g, "");
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${cleanedName}${randomNumber}`;
  };

  const handleRegisterWithGoogle = async () => {
    if (response?.type === "success") {
      try {
        const userData = await getGoogleUserInfo(
          response.authentication.accessToken
        );

        setIsLoading(true);
        const { data, status } = await postServices("auth/register", {
          email: userData.email,
          emailError: null,
          password: userData.id,
          passwordError: null,
          name: userData.given_name,
          lastname: userData.family_name,
          google_user: true,
          role_id: 2,
          username: generateUsername(userData.given_name, userData.family_name),
        });
        if (status === 200) {
          dispatch(updatetoken(data.token));
          getUserDataWithToken(data.token);
          let userData: any = jwtDecode(data.token);
          if (userData.userData.career) {
            navigation.navigate("Home");
          } else {
            navigation.navigate("Onboarding1");
          }
          dispatch(
            updateMessage({
              body: "Registro completado con éxito",
              open: true,
              type: "success",
            })
          );
        }
      } catch (error) {
        dispatch(
          updateMessage({
            body:
              (error.response.data ? error.response.data.message : "") +
              ", por favor elegí otro",
            open: true,
            type: "danger",
          })
        );
      } finally {
        setIsLoading(false);
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

  const setEmail = (val: string) => {
    setForm({
      ...form,
      email: val,
      emailError: !isValidEmail(val),
    });
  };

  const setPassword = (val: string) => {
    setForm({
      ...form,
      password: val,
      passwordError: !isValidPassword(val),
    });
  };

  const getRegister = async () => {
    if (
      form.email === "" ||
      form.password === "" ||
      form.name === "" ||
      form.lastname === "" ||
      form.username === ""
    ) {
      dispatch(
        updateMessage({
          body: "Por favor llená todos los campos para logearte.",
          open: true,
          type: "danger",
        })
      );
      return false;
    }
    if (form.passwordError) {
      dispatch(
        updateMessage({
          body: "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.",
          open: true,
          type: "danger",
        })
      );
      return false;
    }
    if (form.emailError) {
      dispatch(
        updateMessage({
          body: "Asegurate de ingresar un email válido",
          open: true,
          type: "danger",
        })
      );
      return false;
    }
    if (form.password !== repeatPass) {
      dispatch(
        updateMessage({
          body: "Asegurate que las contraseñas coincidan",
          open: true,
          type: "danger",
        })
      );
      return false;
    }
    try {
      setLoading(true);
      const { data, status } = await postServices("auth/register", form);
      if (status === 200) {
        dispatch(updatetoken(data.token));
        getUserDataWithToken(data.token);
        let userData: any = jwtDecode(data.token);
        if (userData.userData.career) {
          navigation.navigate("Home");
        } else {
          navigation.navigate("Onboarding1");
        }
        dispatch(
          updateMessage({
            body: "Registro completado con éxito",
            open: true,
            type: "success",
          })
        );
      }
    } catch (error) {
      dispatch(
        updateMessage({
          body:
            (error.response.data ? error.response.data.message : "") +
            ", por favor elegí otro",
          open: true,
          type: "danger",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ],
      });
      try {
        const { email } = jwtDecode(credential.identityToken);
        setIsLoading(true);
        const { data, status } = await postServices("auth/register", {
          email: email,
          emailError: null,
          password: credential.user,
          passwordError: null,
          name: credential.fullName.givenName,
          lastname: credential.fullName.familyName,
          apple_user: true,
          role_id: 2,
          username: generateUsername(
            credential.fullName.givenName,
            credential.fullName.familyName
          ),
        });
        if (status === 200) {
          dispatch(updatetoken(data.token));
          getUserDataWithToken(data.token);
          let userData: any = jwtDecode(data.token);
          if (userData.userData.career) {
            navigation.navigate("Home");
          } else {
            navigation.navigate("Onboarding1");
          }
          dispatch(
            updateMessage({
              body: "Registro completado con éxito",
              open: true,
              type: "success",
            })
          );
        }
      } catch (error) {
        dispatch(
          updateMessage({
            body:
              (error.response.data ? error.response.data.message : "") +
              ", por favor elegí otro",
            open: true,
            type: "danger",
          })
        );
      } finally {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <HeaderBack />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraScrollHeight={30}
      >
        <VStack px={5} pb={5}>
          <Box alignItems="center">
            <Image
              w={100}
              mb={5}
              h={100}
              alt="Logo de Fadu"
              source={require("../../../assets/logo.png")}
            />

            <Box
              mb={4}
              style={{
                borderColor: "transparent",
                borderWidth: 1,
                borderRadius: moderateScale(8),
                flexDirection: "row",
                height: verticalScale(55),
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Input
                onChangeText={(text) => setForm({ ...form, name: text })}
                placeholder="Nombre"
                w="100%"
                h={verticalScale(55)}
                placeholderTextColor="#797979"
                focusOutlineColor={"transparent"}
              />
            </Box>

            <Box
              mb={4}
              style={{
                borderColor: "transparent",
                borderWidth: 1,
                borderRadius: moderateScale(8),
                flexDirection: "row",
                height: verticalScale(55),
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Input
                onChangeText={(text) => setForm({ ...form, lastname: text })}
                placeholder="Apellido"
                w="100%"
                h={verticalScale(55)}
                placeholderTextColor="#797979"
                focusOutlineColor={"transparent"}
              />
            </Box>

            <Box
              mb={4}
              style={{
                borderColor: "transparent",
                borderWidth: 1,
                borderRadius: moderateScale(8),
                flexDirection: "row",
                height: verticalScale(55),
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Input
                onChangeText={(text) => setForm({ ...form, username: text })}
                placeholder="Usuario"
                w="100%"
                h={verticalScale(55)}
                placeholderTextColor="#797979"
                focusOutlineColor={"transparent"}
              />
            </Box>
            <Box
              mb={4}
              style={{
                borderColor:
                  form.emailError === true
                    ? "red"
                    : form.email
                    ? "green"
                    : "transparent",
                borderWidth: 1,
                borderRadius: moderateScale(8),
                flexDirection: "row",
                height: verticalScale(55),
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Input
                onChangeText={(text) => setEmail(text)}
                placeholder="Email"
                w="100%"
                h={verticalScale(55)}
                placeholderTextColor="#797979"
                focusOutlineColor={"transparent"}
              />
            </Box>
            <Box
              mb={4}
              style={{
                borderColor:
                  form.passwordError === true
                    ? "red"
                    : form.password
                    ? "green"
                    : "transparent",
                borderWidth: 1,
                height: verticalScale(55),
                borderRadius: moderateScale(8),
                flexDirection: "row",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Input
                onChangeText={(text) => setPassword(text)}
                w={{ base: "100%", md: "100%" }}
                h={verticalScale(55)}
                px={3}
                placeholderTextColor="#797979"
                focusOutlineColor={"transparent"}
                type={showPassword ? "text" : "password"}
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
              />
            </Box>

            <Box
              mb={4}
              style={{
                borderColor: "transparent",
                borderWidth: 1,
                height: verticalScale(55),
                borderRadius: moderateScale(8),
                flexDirection: "row",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Input
                w={{ base: "100%", md: "100%" }}
                h={verticalScale(55)}
                px={3}
                placeholderTextColor="#797979"
                focusOutlineColor={"transparent"}
                type={showRePassword ? "text" : "password"}
                InputRightElement={
                  <TouchableOpacity
                    style={{ marginRight: 9 }}
                    onPress={() => setShowRePassword(!showRePassword)}
                  >
                    <MaterialIcons
                      size={25}
                      name={showRePassword ? "visibility" : "visibility-off"}
                      color={"#797979"}
                    />
                  </TouchableOpacity>
                }
                placeholder="Repetir contraseña"
                onChangeText={(text) => setRepeatPass(text)}
              />
            </Box>

            <Button
              onPress={() => getRegister()}
              mb={3}
              w="100%"
              h={verticalScale(55)}
              rounded={moderateScale(8)}
              isLoading={loading}
              bg="#DA673A"
            >
              Registrarse
            </Button>
          </Box>
          <Box py={2} px={5}>
            <Hr text={"ó"} />
          </Box>
          <View
            style={{
              flexDirection: Platform.OS === "ios" ? "row" : "column",
              justifyContent:
                Platform.OS === "ios" ? "space-between" : "center",
              alignItems: Platform.OS === "ios" ? "stretch" : "center",
            }}
          >
            <Button
              mb={5}
              w={Platform.OS === "ios" ? "48%" : "100%"} // Ajuste del ancho según la plataforma
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
        </VStack>
      </KeyboardAwareScrollView>
    </Container>
  );
}

export default React.memo(RegisterScreen);
