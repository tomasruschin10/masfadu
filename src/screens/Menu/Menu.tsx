import { Box, FlatList, IconButton, Text, Image, ScrollView } from "native-base";
import * as React from "react";
import { HeaderPerfil } from "../../components/Header";
import BottomTab from "../../components/BottomTab";
import Sections from "./Sections";
import switchIcon from "../../utils/switchIcon";

const carriers = [
  {
    title: "Materias",
    icon: require("../../../assets/icons/materias.svg"),
    iconType: "MaterialIcons",
    comingSoon: false,
  },
  {
    title: "Opiniones de materias",
    icon: require("../../../assets/icons/opiniones.svg"),
    iconType: "MaterialIcons",
    comingSoon: false,
  },
  {
    title: "Objetos perdidos",
    icon: require("../../../assets/icons/perdidos.svg"),
    iconType: "MaterialCommunityIcons",
    comingSoon: false,
  },
  {
    title: "Ofertas Laborales",
    icon: require("../../../assets/icons/ofertas.svg"),
    iconType: "MaterialCommunityIcons",
    comingSoon: false,
  },
  {
    title: "Cursos, charlas y workshops",
    icon: require("../../../assets/icons/cursos-charlas.svg"),
    iconType: "Entypo",
    comingSoon: false,
  },
  {
    title: "Recursos y herramientas",
    icon: require("../../../assets/icons/recursos.svg"),
    iconType: "Entypo",
    comingSoon: false,
  },
  {
    title: "Cuenta",
    icon: require("../../../assets/icons/cuenta.svg"),
    iconType: "MaterialCommunityIcons",
    comingSoon: false,
  },
  {
    title: "Notificaciones",
    icon: require("../../../assets/icons/notificaciones.svg"),
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
];

function Menu({ route, navigation }) {
  return (
    <Box flex={1} mt={0} pt={0} backgroundColor="#E8EEF3">
      <HeaderPerfil
        statusBarColor="#e8eef4"
        barStyle="dark-content"
        navigation={navigation}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box px={3} my={10} alignContent={"center"}>
          <FlatList
            ItemSeparatorComponent={() => <Box mb={10}></Box>}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            numColumns={2}
            keyExtractor={(_, index) => index.toString()}
            data={carriers}
            renderItem={({ item }) => (
              <Sections
                icon={item.icon}
                title={item.title}
                comingSoon={item.comingSoon}
                navigation={navigation}
              />
            )}
          />
        </Box>
        <Text >Texto</Text>
        </ScrollView>
        
        <BottomTab navigation={navigation} route={route} />
     
    </Box>
  );
}

export default Menu;
