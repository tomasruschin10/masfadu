import * as React from "react";
import { Box, Button, Icon, Image, Input, VStack } from "native-base";
import { ScrollView, TouchableWithoutFeedback } from "react-native";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

import Container from "../../components/Container";
import { HeaderBack } from "../../components/Header";
import Hr from "../../components/Hr";

import { updateMessage } from "../../redux/actions/message";
import { updatetoken } from "../../redux/actions/token";

import { getUserDataWithToken } from "../../utils/storage";
import { postServices } from "../../utils/hooks/services";
import { isValidEmail, isValidPassword } from "../../utils/validators";
import { moderateScale, verticalScale } from "../../utils/media.screens";
import { TouchableOpacity } from "react-native-gesture-handler";

function RegisterScreen({ route, navigation }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRePassword, setShowRePassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    email: "",
    emailError: null,
    password: "",
    passwordError: null,
    name: "",
    lastname: "",
    role_id: 2,
    username: "",
  });
  const [repeatPass, setRepeatPass] = React.useState("");
  const dispatch = useDispatch();

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
          body: "Por favor llena todos los campos para logearte.",
          open: true,
          type: "danger",
        })
      );
      return false;
    }
    if (form.passwordError) {
      dispatch(
        updateMessage({
          body: "La contraseña debe tener al menos 8 caracteres, una mayuscula y un número!",
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

  return (
    <Container>
      <HeaderBack />
      <ScrollView keyboardShouldPersistTaps={"handled"}>
        <VStack px={5} pb={5}>
          <Box alignItems="center">
            <Image
              w={100}
              mb={5}
              h={100}
              alt="Logo de Fadu"
              source={require("../../../assets/logo.png")}
            />
            <Input
              onChangeText={(text) => setForm({ ...form, name: text })}
              mx="3"
              mb={4}
              placeholder="Nombre"
              w="100%"
              h={verticalScale(55)}
              rounded={moderateScale(8)}
              placeholderTextColor="#797979"
              borderColor={"transparent"}
              focusOutlineColor={"transparent"}
            />
            <Input
              onChangeText={(text) => setForm({ ...form, lastname: text })}
              mx="3"
              mb={4}
              placeholder="Apellido"
              w="100%"
              h={verticalScale(55)}
              rounded={moderateScale(8)}
              placeholderTextColor="#797979"
              borderColor={"transparent"}
              focusOutlineColor={"transparent"}
            />
            <Input
              onChangeText={(text) => setForm({ ...form, username: text })}
              mx="3"
              mb={4}
              placeholder="Usuario"
              w="100%"
              h={verticalScale(55)}
              rounded={moderateScale(8)}
              placeholderTextColor="#797979"
              borderColor={"transparent"}
              focusOutlineColor={"transparent"}
            />
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
                w={{ base: "100%", md: "75%" }}
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

            <Input
              w={{ base: "100%", md: "25%" }}
              h={verticalScale(55)}
              rounded={moderateScale(8)}
              placeholderTextColor="#797979"
              focusOutlineColor={"transparent"}
              borderColor={"transparent"}
              mb={4}
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
          <Box alignItems="center">
            <Button
              mb={5}
              onPress={() => navigation.navigate("GoogleRegister")}
              w="100%"
              backgroundColor={"#FFFFFF"}
              h={verticalScale(55)}
              rounded={moderateScale(8)}
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
          </Box>
        </VStack>
      </ScrollView>
    </Container>
  );
}

export default React.memo(RegisterScreen);
