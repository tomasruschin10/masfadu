import {
  Box,
  FlatList,
  IconButton,
  Text,
  Image,
  ScrollView,
} from "native-base";
import * as React from "react";
import { HeaderPerfil } from "../../components/Header";
import BottomTab from "../../components/BottomTab";
import Sections from "./Sections";
import switchIcon from "../../utils/switchIcon";
import { StyleSheet, TouchableOpacity, View } from "react-native";
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    width: 200,
    padding: 20,
    position: "absolute",
    right: 0,
    top: 0,
  },
  menuItem: {
    fontSize: 16,
    marginBottom: 10,
  },
});

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

              
        <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Home", {

                    })
                  }
                >
        <View
          style={{
            backgroundColor: "#EB5E29",
            height: 50,
            width: 218,
            marginLeft :'20%'
          }}

        >
          <Text
            style={{
              
              color: "#ffffff",
              fontSize: 11,
              textAlign: "center",
              marginTop: 15,
            }}
          >
            Cerrar
          </Text>
        </View>
                </TouchableOpacity>



      </ScrollView>

  {/*     <BottomTab  navigation={navigation} route={route} /> */}
    </Box>
  );
}

export default Menu;
