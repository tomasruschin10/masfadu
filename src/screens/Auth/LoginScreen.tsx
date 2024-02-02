import { MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  Icon,
  Image,
  Input,
  Text,
  View,
  VStack,
} from "native-base";
import * as React from "react";
import Container from "../../components/Container";
import { NoHeader } from "../../components/Header";
import { postServices } from "../../utils/hooks/services";
import { getUserDataWithToken } from "../../utils/storage";
import { useDispatch } from "react-redux";
import { updatetoken } from "../../redux/actions/token";
import { updateMessage } from "../../redux/actions/message";

import {
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import jwtDecode from "jwt-decode";

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
    androidClientId:
      "1044573282337-clqfcumlk8g4ih4hplta6v88lcn72cks.apps.googleusercontent.com",
    iosClientId:
      "1044573282337-l2n519m10p7bp6aka5eusa0gomh9u720.apps.googleusercontent.com",
    expoClientId:
      "1044573282337-t0too7vkon8iaf2dhulhsbcrrmq59vt9.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

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
        }).then((res: any) => {
          showAlert("success", "Inicio correcto!");
          dispatch(updatetoken(res.data.token));
          getUserDataWithToken(res.data.token);
          let data: any = jwtDecode(res.data.token);
          if (data.userData.career) {
            navigation.navigate("Home");
          } else {
            navigation.navigate("Onboarding1");
          }
        });
      } catch (error) {
        console.error("Error al autenticar con Google:", error);
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
                md: "25%",
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
          </Box>

          <Box pt={PixelRatio.roundToNearestPixel(50)}>
            <Button
              mb={5}
              w="100%"
              h={verticalScale(55)}
              rounded={moderateScale(8)}
              backgroundColor={"#FFFFFF"}
              onPress={() => promptAsync()}
              _spinner={{ color: "black" }}
              _text={{
                color: "#797979",
                fontSize: moderateScale(14),
                fontWeight: "400",
              }}
              colorScheme={"ligth"}
              color={"darkText"}
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
            >
              Iniciar Sesión con Google
            </Button>

            <Box flexDirection={"row"} justifyContent={"center"}>
              <Box justifyContent={"center"}>
                <Text color="#797979">¿No tenés una cuenta?</Text>
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
