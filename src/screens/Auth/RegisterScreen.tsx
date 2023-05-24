import { Box, Button, Icon, Image, Input, VStack } from "native-base";
import * as React from "react";
import Container from "../../components/Container";
import { HeaderBack } from "../../components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import Hr from "../../components/Hr";
import { Platform, ScrollView, TouchableWithoutFeedback } from "react-native";
import { updateMessage } from "../../redux/actions/message";
import { postServices } from "../../utils/hooks/services";
import { useDispatch } from "react-redux";
import * as AppleAuthentication from "expo-apple-authentication";
import {
  getAuth,
  OAuthProvider,
  signInWithCredential,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { baseApi } from "../../utils/api";
import { updatetoken } from "../../redux/actions/token";
import jwtDecode from "jwt-decode";
import { updateUserdata } from "../../redux/actions/user";
function RegisterScreen({ route, navigation }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRePassword, setShowRePassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    email: "",
    password: "",
    name: "",
    lastname: "",
    role_id: 2,
    username: "",
  });
  const [repeatPass, setRepeatPass] = React.useState("");
  const dispatch = useDispatch();

  const getRegister = async () => {
    if (
      form.email === "" ||
      form.password === "" ||
      form.name === "" ||
      form.lastname === ""
    ) {
      dispatch(
        updateMessage({
          body: "Por favor llena todos los campos para logearte.",
          open: true,
          type: "danger",
        })
      );
      return false;
    }
    if (!/^(?=.*\d)(?=.*[A-Z]).{8,}$/.test(form.password)) {
      dispatch(
        updateMessage({
          body: "La contrasenia debe tener al menos 8 caracteres, una mayuscula y un numero!",
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
    setLoading(true);
    postServices("auth/register", form)
      .then(({ data }: any) => {
        dispatch(
          updateMessage({
            body: "Registro exitoso, por favor ahora haga login.",
            open: true,
            type: "success",
          })
        );
        navigation.navigate("Login");
      })
      .catch((error) => {
        __DEV__ &&
          console.log(
            "🚀 ~ file: LoginScreen.tsx ~ line 41 ~ getLogin ~ e",
            error
          );
        dispatch(
          updateMessage({
            body: "Error al intentar registrarse." + error.data.message,
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
      <HeaderBack />
      <ScrollView keyboardShouldPersistTaps={"handled"}>
        <VStack px={5}>
          <Box mt={5} alignItems="center">
            <Image
              w={100}
              mb={5}
              h={100}
              alt="Logo de Fadu"
              source={require("../../../assets/logo.png")}
            />
            <Input
              onChangeText={(text) =>
                setForm({ ...form, name: text, username: text })
              }
              mx="3"
              mb={4}
              placeholder="Nombre"
              w="90%"
            />
            <Input
              onChangeText={(text) => setForm({ ...form, lastname: text })}
              mx="3"
              mb={4}
              placeholder="Apellido"
              w="90%"
            />
            <Input
              onChangeText={(text) => setForm({ ...form, email: text })}
              mx="3"
              mb={4}
              placeholder="Email"
              w="90%"
            />
            <Input
              onChangeText={(text) => setForm({ ...form, password: text })}
              w={{ base: "90%", md: "25%" }}
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
            <Input
              w={{ base: "90%", md: "25%" }}
              mb={4}
              type={showRePassword ? "text" : "password"}
              InputRightElement={
                <Icon
                  as={
                    <MaterialIcons
                      name={showRePassword ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                  onPress={() => setShowRePassword(!showRePassword)}
                />
              }
              placeholder="Repetir contraseña"
              onChangeText={(text) => setRepeatPass(text)}
            />

            <Button
              onPress={() => getRegister()}
              mb={3}
              w="90%"
              isLoading={loading}
            >
              Registrarse
            </Button>
          </Box>
          <Box py={2} px={5}>
            <Hr text={"ó"} />
          </Box>
          <Box alignItems="center">
            <Button
              mb={5}
              onPress={() => navigation.navigate("GoogleRegister")}
              w="90%"
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
              Registrate con Google
            </Button>
            {Platform.OS === "ios" ? (
              <AppleAuthentication.AppleAuthenticationButton
                buttonType={
                  AppleAuthentication.AppleAuthenticationButtonType.CONTINUE
                }
                buttonStyle={
                  AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
                }
                cornerRadius={5}
                style={{ width: 200, height: 44 }}
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
                            username: user?.email,
                            email: user?.email,
                            password: user?.uid,
                            name: user?.displayName,
                            lastname: "",
                            uid: user?.uid,
                            image: user?.photoURL,
                            role_id: 2,
                          };
                          await baseApi
                            .post(`/auth/register`, newUser, {})
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
                                    body: "Usuario no se guardo, o ya esta registrado, intente iniciar sesion. ",
                                    open: true,
                                    type: "danger",
                                  })
                                );
                              } else {
                                setLoading(false);
                                dispatch(
                                  updateMessage({
                                    body: "Usuario no se guardo, o ya esta registrado, intente iniciar sesion. ",
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
              />
            ) : null}
          </Box>
        </VStack>
      </ScrollView>
    </Container>
  );
}

export default React.memo(RegisterScreen);
