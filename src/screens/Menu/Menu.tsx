import {
  Box, Text
} from "native-base";
import * as React from "react";
import { HeaderPerfil } from "../../components/Header";
import { PixelRatio, StyleSheet, TouchableOpacity, View } from "react-native";
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
    icon: require("../../../assets/menu/opiniones.png"),
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
    title: "Recursos y herramientas",
    icon: require("../../../assets/menu/recursos.png"),
    iconType: "Entypo",
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
          <Box marginLeft={horizontalScale(5)} marginBottom={horizontalScale(10)}>
            <HeaderPerfil
              showICon={false}
              statusBarColor="#e8eef3"
              barStyle="dark-content"
              navigation={navigation}
            />

          </Box>
          {carriers?.length ? carriers.map(item => {
            return (
              <Box justifyContent={"center"} my={verticalScale(7)} alignContent={"center"}>
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


          <DefaultButton
            buttonStyle={{
              backgroundColor: "#DA673A",
              borderRadius: moderateScale(14),
              height: verticalScale(50),
              width: screenWidth - (screenWidth / 3),
              paddingTop: verticalScale(5.5)
            }}
            textStyle={
              {
                fontSize: moderateScale(14),
                color: "white"
              }
            }
            containerStyle={{
              marginTop: verticalScale(75)
            }}
            callBack={() => setMenu(false)} title="Cerrar" />
        </View>
        <TouchableOpacity
          style={styles.leftColumn}
          onPress={() => setMenu(false)}
        >
          <Text>Columna Izquierda</Text>
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
    opacity: 0
  },
  rightColumn: {
    flex: 80, // Ocupa el 80% del ancho total
    backgroundColor: "#F5FAFE",
    padding: 10,
  },
});

export default Menu;
