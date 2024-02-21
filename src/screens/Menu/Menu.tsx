import {
  Box, Divider, Text
} from "native-base";
import * as React from "react";
import { HeaderPerfil } from "../../components/Header";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import SectionsV2 from "./SectionsV2";
import { horizontalScale, moderateScale, screenWidth, verticalScale } from "../../utils/media.screens";
import DefaultButton from "../../components/DefaultButton";


const carriers = [
  {
    title: "Materias",
    icon: require("../../../assets/menu/materias.png"),
    iconType: "MaterialIcons",
    comingSoon: false,
  },
  {
    title: "Opiniones de materias",
    icon: require("../../../assets/menu/opiniones2.png"),
    iconType: "MaterialIcons",
    comingSoon: false,
  },
  {
    title: "Mercado de Fadu",
    icon: require("../../../assets/menu/mercado.png"),
    iconType: "MaterialCommunityIcons",
    comingSoon: false,
  },
  {
    title: "Ofertas Laborales",
    icon: require("../../../assets/menu/ofertas.png"),
    iconType: "MaterialCommunityIcons",
    comingSoon: false,
  },
  {
    title: "Cursos & Workshops",
    icon: require("../../../assets/menu/charlas.png"),
    iconType: "Entypo",
    comingSoon: false,
  },
];

const carriers2 = [
  {
    title: "Notificaciones",
    icon: require("../../../assets/menu/notificaciones.png"),
    iconType: "FontAwesome",
    comingSoon: false,
  },
  {
    title: "Cuenta",
    icon: require("../../../assets/menu/cuenta.png"),
    iconType: "MaterialCommunityIcons",
    comingSoon: false,
  },

];



function Menu({ route, navigation, setMenu }) {
  return (

    <Box style={{ width: "100%", height: "100%", zIndex: 101, position: "absolute" }} flex={1} mt={0} pt={0} backgroundColor="transparent">
      <View style={styles.container}>
        <View style={styles.rightColumn}>
          <Box>
            <TouchableOpacity
              onPress={() => navigation.navigate("Subsections", { title: "Cuenta" })}
              style={{ marginLeft: horizontalScale(5) }}

            >
              <HeaderPerfil
                showICon={false}
                statusBarColor="#e8eef3"
                barStyle="dark-content"
                navigation={navigation}
              />

            </TouchableOpacity>
            <Box
              mt={6}
              mb={6}
            >
              {carriers?.length ? carriers.map(item => {
                return (
                  <Box justifyContent={"center"} my={1} alignContent={"center"}>
                    <SectionsV2
                      setMenu={setMenu}
                      icon={item.icon}
                      title={item.title}
                      navigation={navigation}
                    />
                  </Box>
                )
              })
                : ""}

              <Box px={5} my={6}>
                <Divider bg="gray.200" />
              </Box>

              {carriers2?.length ? carriers2.map(item => {
                return (
                  <Box justifyContent={"center"} my={1} alignContent={"center"}>
                    <SectionsV2
                      setMenu={setMenu}
                      icon={item.icon}
                      title={item.title}
                      navigation={navigation}
                    />
                  </Box>
                )
              })
                : ""}
            </Box>
          </Box>

          <DefaultButton
            buttonStyle={{
              backgroundColor: "#DA673A",
              borderRadius: moderateScale(8),
              height: verticalScale(50),
              width: screenWidth - (screenWidth / 3),
            }}
            textStyle={
              {
                fontSize: moderateScale(14),
                color: "white",
              }
            }
            callBack={() => setMenu(false)} title="Cerrar" />
        </View>
        <TouchableOpacity
          style={styles.leftColumn}
          onPress={() => setMenu(false)}
        >
        </TouchableOpacity>
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftColumn: {
    flex: 20, // Ocupa el 20% del ancho total
    opacity: 0,
  },
  rightColumn: {
    flex: 80, // Ocupa el 80% del ancho total
    backgroundColor: "#F5FAFE",
    padding: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 50
  },
});

export default Menu;
