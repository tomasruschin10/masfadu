import { Box, FlatList } from "native-base";
import * as React from "react";
import { HeaderPerfil } from "../../components/Header";
import BottomTab from "../../components/BottomTab";
import Sections from "./Sections";
import switchIcon from "../../utils/switchIcon";

const carriers = [
  {
    title: "Materias",
    icon: "library-books",
    iconType: "MaterialIcons",
    comingSoon: false,
  },
  {
    title: "Opiniones de materias",
    icon: "message",
    iconType: "MaterialIcons",
    comingSoon: false,
  },
  {
    title: "Objetos perdidos",
    icon: "book-search",
    iconType: "MaterialCommunityIcons",
    comingSoon: false,
  },
  {
    title: "Ofertas Laborales",
    icon: "briefcase",
    iconType: "MaterialCommunityIcons",
    comingSoon: false,
  },
  {
    title: "Cursos, charlas y workshops",
    icon: "graduation-cap",
    iconType: "Entypo",
    comingSoon: false,
  },
  {
    title: "Recursos y herramientas",
    icon: "text",
    iconType: "Entypo",
    comingSoon: false,
  },
  {
    title: "Cuenta",
    icon: "account-group",
    iconType: "MaterialCommunityIcons",
    comingSoon: false,
  },
  {
    title: "Notificaciones",
    icon: "bell",
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
    <Box flex={1} mt={0} pt={0} backgroundColor="#3A71E1">
      <HeaderPerfil
        statusBarColor="#3A71E1"
        barStyle="light-content"
        navigation={navigation}
      />

      <Box px={5} my={10} alignContent={"center"}>
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
              iconType={switchIcon(item.iconType)}
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
