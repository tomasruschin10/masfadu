import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Box, ScrollView, Text } from "native-base";
import { Alert, Linking, TouchableHighlight } from "react-native";

import Container from "../../components/Container";
import { updateMessage } from "../../redux/actions/message";
import { updatetoken } from "../../redux/actions/token";
import { updateModal, updateUserdata } from "../../redux/actions/user";
import * as RootNavigation from "../../navigation/RootNavigation";
import { store } from "../../redux/store";
import BottomTab from "../../components/BottomTab";
import { HeaderBack } from "../../components/Header";
import Constants from "expo-constants";
import * as StoreReview from "expo-store-review";
import { removemenu } from "../../redux/actions/menu";
import Menu from "../Menu/Menu";
import { useDispatch, useSelector } from "react-redux";
import { FORGET_NOTICE, forgetNotice } from "../../redux/actions/notice";
import { fontStyles } from "../../utils/colors/fontColors";
import { moderateScale, verticalScale } from "../../utils/media.screens";

const config = [
  { title: "Escribinos tu sugerencia" },
  { title: "Calificar la App" },
  { title: "Tu cuenta" },
  { title: "Editar Perfil" },
  { title: "Cambiar contraseña" },
  { title: "Cambiar de carrera" },
  { title: "Politica de privacidad" },
  { title: "Cerrar Sesión" },
  { title: "Eliminar Cuenta" },
];

function Config({ route, navigation, value }) {
  const [menuShow, setMenu] = useState(false);
  const dispatch = useDispatch();
  const version = Constants?.manifest?.version || "1.0.0";

  const user = useSelector((state: any) => state?.user?.userdata);
  const handleNavigate = (route: string, additional?: any) => {
    if (user?.userRole[0]?.role?.name === "Visit") {
      dispatch(updateModal(true))
      return
    }
    navigation.navigate(route, additional)
  }

  const logout = async () => {
    store.dispatch(
      updateMessage({
        body: "Sesión finalizada con éxito",
        type: "success",
        open: true,
      })
    );
    store.dispatch(updateUserdata({}));
    store.dispatch(updatetoken(""));
    store.dispatch(removemenu());
    RootNavigation.reset("Login");
  };

  const reviewApp = async () => {
    if (await StoreReview.hasAction()) {
      StoreReview.requestReview();
    }
  };

  const RenderConfig = ({ title, navigation }) => (
    <Box>
      {title == "Tu cuenta" ? (
        <Box mt={5} mb={4}>
          <Text fontFamily={"Manrope"} fontSize={20} fontWeight="700">
            {title}
          </Text>
        </Box>
      ) : (
        <TouchableHighlight
          underlayColor=""
          onPress={() => {
            title === "Cerrar Sesión"
              ? Alert.alert("Importante", "¿Estas seguro de cerrar sesión?", [
                  {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "Aceptar",
                    onPress: () => logout(),
                    style: "destructive",
                  },
                ])
              : title == "Calificar la App"
              ? reviewApp()
              : handleNavigate("RedirectTo", { title: title });
            dispatch(forgetNotice({ type: FORGET_NOTICE, value: false }));
          }}
        >
          <Box
            bg={"white"}
            mb={3}
            py={verticalScale(7)}
            borderRadius={moderateScale(14)}
            flexDir={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box ml={9}>
              <Text
                style={fontStyles.poppins300}
                color="#171717"
                fontSize={14}
                py={3}
              >
                {title}
              </Text>
            </Box>
            <Box
              mr={4}
              background={"#FBF0EB"}
              borderRadius={"full"}
              p={moderateScale(5)}
            >
              <Ionicons
                name="arrow-forward"
                size={moderateScale(20)}
                color="#DA673A"
              />
            </Box>
          </Box>
        </TouchableHighlight>
      )}
    </Box>
  );
  return (
    <Container>
      {menuShow ? (
        <Menu navigation={navigation} route={route} setMenu={setMenu} />
      ) : null}
      <HeaderBack title={"Configuración"} />
      <ScrollView>
        <Box mx={5} mb={"32"}>
          {config.map((item) => (
            <RenderConfig
              key={item.title}
              title={item.title}
              navigation={navigation}
            />
          ))}
          <Box justifyContent={"center"}>
            <Text textAlign={"center"} color={"gray.400"}>
              v {version}
            </Text>
          </Box>
        </Box>
      </ScrollView>

      <BottomTab setMenu={setMenu} navigation={navigation} route={route} />
    </Container>
  );
}

export default Config;
