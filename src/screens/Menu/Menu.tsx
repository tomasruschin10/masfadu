import { Box, FlatList } from "native-base";
import * as React from "react";
import { HeaderPerfil } from "../../components/Header";
import BottomTab from "../../components/BottomTab";
import Sections from "./Sections";
import switchIcon from "../../utils/switchIcon";

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
    title: "Objetos perdidos",
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
    title: "Cursos, charlas y workshops",
    icon: require("../../../assets/menu/charlas.png"),
    iconType: "Entypo",
    comingSoon: false,
  },
  {
    title: "Recursos y herramientas",
    icon: require("../../../assets/menu/recursos.png"),
    iconType: "Entypo",
    comingSoon: false,
  },
  {
    title: "Cuenta",
    icon: require("../../../assets/menu/cuenta.png"),
    iconType: "MaterialCommunityIcons",
    comingSoon: false,
  },
  {
    title: "Notificaciones",
    icon: require("../../../assets/menu/notificaciones.png"),
    iconType: "FontAwesome",
    comingSoon: false,
  },
  // {
  //   title: "Gastos",
  //   icon: "wallet",
  //   iconType: "Entypo",
  //   comingSoon: true,
  // },
  // {
  //   title: "Carpool",
  //   icon: "car-hatchback",
  //   iconType: "MaterialCommunityIcons",
  //   comingSoon: true,
  // },
  // {
  //   title: "Mapa de aulas",
  //   icon: "map",
  //   iconType: "FontAwesome",
  //   comingSoon: true,
  // },
  {
    title: "",
    icon: "",
    iconType: "FontAwesome",
    comingSoon: false,
  },
];

function Menu({ route, navigation }) {
  return (
    <Box flex={1} mt={0} pt={0} backgroundColor="#1f1e25">
      {/* <HeaderPerfil
        statusBarColor="#3A71E1"
        barStyle="light-content"
        navigation={navigation}
      /> */}

      <Box px={2} my={10} mt={"56"} alignContent={"center"}>
        <FlatList
          ItemSeparatorComponent={() => <Box mb={3}></Box>}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          numColumns={3}
          keyExtractor={(_, index) => index.toString()}
          data={carriers}
          renderItem={({ item }) => (
            <Sections
              icon={item.icon}
              // iconType={switchIcon(item.iconType)}
              title={item.title}
              comingSoon={item.comingSoon}
              navigation={navigation}
            />
          )}
        />
      </Box>
      <BottomTab navigation={navigation} route={route} />
    </Box>
  );
}

export default Menu;
