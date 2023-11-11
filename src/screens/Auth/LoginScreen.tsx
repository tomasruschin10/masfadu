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
              fontSize={moderateScale(14)}
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
              fontSize={moderateScale(14)}
            />
            <DefaultButton buttonStyle={{
              backgroundColor: "#DA673A",
              borderRadius: moderateScale(14),
              height: verticalScale(50),
              width: 500,
              maxWidth: contentWidth,
              paddingTop: verticalScale(7)
            }}
              textStyle={
                {
                  fontSize: moderateScale(14),
                  fontWeight:"500",
                  color: "white",

                }
              }

              containerStyle={{
                marginBottom: PixelRatio.roundToNearestPixel(15),
              }}

              title="Iniciar Sesión"
              callBack={getLogin} />

            <Button
              onPress={() => navigation.navigate("RecoveryPassword")}
              isLoading={loading}
              variant="link"
            >
              <Text style={[fontStyles.poppins400, {
                color: "#797979",
                fontSize: moderateScale(14),
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

              _text={{ color: "#797979", fontSize: moderateScale(14), fontWeight: "400" }}
              colorScheme={"ligth"}
              color={"darkText"}
            >
              Iniciar Sesión con Google
            </Button>

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
