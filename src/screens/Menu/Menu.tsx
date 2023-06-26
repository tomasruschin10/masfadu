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
import { useDispatch, useSelector } from "react-redux";
import { removemenu } from "../../redux/actions/menu";
import { store } from "../../redux/store";

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
    title: "Cursos, charlas y workshops",
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
   
    <Box style={{width:"80%", height: "100%", marginLeft:"20%", zIndex: 101, position: "absolute"}} flex={1} mt={0} pt={0} backgroundColor="#F5FAFE">
      <Box marginLeft={"10%"}>
      <HeaderPerfil
      showICon={false}
        statusBarColor="#e8eef3"
        barStyle="dark-content"
        navigation={navigation}
        
      />
      
      </Box>
        <Box px={3} my={10} alignContent={"center"}>
          <FlatList
            ItemSeparatorComponent={() => <Box mb={5}></Box>}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ justifyContent: "space-evenly" }}
            numColumns={2}
            keyExtractor={(_, index) => index.toString()}
            data={carriers}
            renderItem={({ item }) => (
              <Sections
              setMenu={setMenu}
                icon={item.icon}
                title={item.title}
                comingSoon={item.comingSoon}
                navigation={navigation}
              />
            )}
          />
        </Box>

              
        <TouchableOpacity
    style={{
      marginLeft: 'auto',
      marginRight: 'auto',
      justifyContent: 'center',
      position: 'absolute',
      bottom: "5%",
      left: "15.5%",
      right: 0
    }}
    onPress={() => setMenu(false)}
  >
   
  <View
    style={{
      backgroundColor: "#EB5E29",
      height: 50,
      width: 218,
      borderRadius: 10,

      
    }}
  >
    <Text
      style={{
        color: "#ffffff",
        fontSize: 13,
        textAlign: "center",
        marginTop: 13,
        fontWeight: "bold",
        letterSpacing: 0.5
      }}
    >
      Cerrar
    </Text>
  </View>
</TouchableOpacity>


     


    </Box>
  );
}

export default Menu;
