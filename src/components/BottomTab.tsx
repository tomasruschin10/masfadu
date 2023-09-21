import { Box, IconButton, Text, View, useTheme, Image } from "native-base";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { TouchableOpacity, Platform, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useEventNavigation } from "../context";
import Svg, { Use } from "react-native-svg";
import {
  InicioMenu,
  InicioMateria,
  InicioOpiniones,
  MenuInicio,
} from "././iconsMenu/inicio-menu";
import { useDispatch } from "react-redux";

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    position: "absolute",
  },
});

export default function BottomTab({ route, navigation, setMenu }) {
  const dispatch = useDispatch();

  const [menuView, setMenuView] = useState(false);
  const { colors }: any = useTheme();
  const { name } = route;
  console.log("🚀 ~ file: BottomTab.tsx:20 ~ BottomTab ~ name:", name);

  const MenuPublica = () => {
    return (
      <Box
        style={{
          zIndex: 1,
          paddingBottom: 75,
          backgroundColor: "#f4faff",
          bottom: 0,
          borderRadius: 33,
          position: "absolute",
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            marginTop: 30,
            marginLeft: 36,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text fontWeight={"semibold"} fontSize={22}>
              Publicá
            </Text>
          </View>

          <MaterialIcons
            onPress={() => {
              setMenuView(false);
            }}
            style={{ marginRight: 35 }}
            name={"close"}
            size={20}
            color="black"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setEvent("opiniones");
            
            name !== "Subsections"
              ? navigation.navigate("Subsections", {
                  title: "Opiniones de materias",
                })
              : navigation.navigate("Subsections", {
                  title: "Opiniones de materias",
                });


            setMenuView(false)    
          }}



          style={{
            marginTop: 20,
            marginRight: 35,
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          <IconButton
            marginRight={35}
            size={3.5}
            icon={
              <Box
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  alt="imagen"
                  source={require("../../assets/icons/menuArrow.png")}
                  resizeMode="contain" // Ajustar imagen al contenedor
                  style={{ width: "100%", height: "100%" }} // Reducir el tamaño de la imagen
                />
              </Box>
            }
          />
          <View style={{ flex: 1 }}>
            <Box>
              <Text color={"#838487"} fontWeight={"medium"} fontSize={15}>
                Un hilo sobre una materia
              </Text>
              <Text color={"#84869A"} fontWeight={"medium"} fontSize={9}>
                Compartí tu experiencia con los demás
              </Text>
            </Box>
          </View>
          <IconButton
            marginRight={2}
            size={8}
            icon={
              <Box
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  alt="imagen"
                  source={require("../../assets/icons/menuHilo.png")}
                  resizeMode="contain" // Ajustar imagen al contenedor
                  style={{ width: "100%", height: "100%" }} // Reducir el tamaño de la imagen
                />
              </Box>
            }
          />
        </TouchableOpacity>
        <View
          style={{
            width: "83%",
            marginLeft: "8%",

            borderBottomWidth: 0.5,
            marginTop: 10,
            borderBottomColor: "#84869A",
          }}
        />
        <TouchableOpacity
          style={{
            marginTop: 20,
            marginRight: 32,
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
          onPress={() => {
             navigation.navigate("OfferForm")
          }}

        >
          <IconButton
            marginRight={35}
            size={3.5}
            icon={
              <Box
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  alt="imagen"
                  source={require("../../assets/icons/menuArrow.png")}
                  resizeMode="contain" // Ajustar imagen al contenedor
                  style={{ width: "100%", height: "100%" }} // Reducir el tamaño de la imagen
                />
              </Box>
            }
          />
          <View style={{ flex: 1 }}>
            <Box>
              <Text color={"#838487"} fontWeight={"medium"} fontSize={15}>
                En el Mercado de Fadu!
              </Text>
              <Text color={"#84869A"} fontWeight={"medium"} fontSize={9}>
                Lo que encontraste, reclamá algo perdido o regalá!
              </Text>
            </Box>
          </View>
          <IconButton
            marginRight={2}
            size={8}
            icon={
              <Box
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  alt="imagen"
                  source={require("../../assets/icons/menuMercado.png")}
                  resizeMode="contain" // Ajustar imagen al contenedor
                  style={{ width: "100%", height: "100%" }} // Reducir el tamaño de la imagen
                />
              </Box>
            }
          />
        </TouchableOpacity>
        <View
          style={{
            width: "83%",
            marginLeft: "8%",

            borderBottomWidth: 0.5,
            marginTop: 10,
            borderBottomColor: "#84869A",
          }}
        />
      </Box>
    );
  };

  const { navigationEvent: event, setNavigationEvent: setEvent } =
    useEventNavigation();

  return (
    <Box safeAreaBottom width={"100%"} style={[styles.container]}>
      {menuView ? <MenuPublica /> : null}

      <Box
        style={{
          paddingBottom: 20,
          backgroundColor: "#f4faff",
          bottom: 0,
          position: "absolute",
          width: "100%",
        }}
      >
        <Box flexDirection={"row"} justifyContent={"space-between"}>
          <TouchableOpacity
            onPress={() => {
              name !== "Home" ? navigation.navigate("Home") : null;
              setEvent("inicio");
            }}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginTop: "5%",
              marginBottom: "4%",
            }}
          >
            {/*         <MaterialIcons
          name="home"
          size={36}
          style={{ marginTop: 0 }}
          color={event == "inicio" ? "#E85E29" : "#A8ACAD"}
        /> */}

            <InicioMenu color={event == "inicio" ? "#E85E29" : "#A8ACAD"} />

            <Text
              /* fontFamily={"Sans"} */
              style={{ fontWeight: "400" }}
              fontSize={12}
              color={event == "inicio" ? "#E85E29" : "#A8ACAD"}
            >
              Inicio
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setEvent("materias");
              navigation.navigate("AboutSubject");
            }}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginTop: "5%",
              marginBottom: "4%",
            }}
          >
            {/* <FontAwesome5
              name="book-open"
              style={{ marginTop: 6 }}
              size={26}
              color={event == "materias" ? "#E85E29" : "#A8ACAD"}
            /> */}

            <InicioMateria
              color={event == "materias" ? "#E85E29" : "#A8ACAD"}
            />

            <Text
              /* fontFamily={"Sans"} */
              style={{ marginTop: -2, fontWeight: "400" }}
              fontSize={12}
              color={event == "materias" ? "#E85E29" : "#A8ACAD"}
            >
              Materias
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setMenuView(true);
            }}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: 60,
              marginBottom: "4%",
            }}
          >
            <Box
              position={"absolute"}
              style={{
                bottom: 10,
                borderColor: "#f4faff",
                borderWidth: 10,
                backgroundColor: "#f4faff",
                borderRadius: 50,
                margin: 0,
              }}
            >
              <Box
                style={{
                  backgroundColor: "#E85E29",
                  borderColor: "#f6f6f6",
                  borderRadius: 50,
                  padding: 6,
                }}
              >
                <Entypo name="plus" size={28} color="#f4faff" />
              </Box>
            </Box>
            <Text
              fontSize={12}
              style={{
                bottom: "-14%",
                position: "absolute",
                fontWeight: "400",
              }}
              color={event == "publica" ? "#E85E29" : "#A8ACAD"}
            >
              Publicá
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginTop: "5%",
              marginBottom: "4%",
            }}
            onPress={() => {
              setEvent("opiniones");
              name !== "Subsections"
                ? navigation.navigate("Subsections", {
                    title: "Opiniones de materias",
                  })
                : navigation.navigate("Subsections", {
                    title: "Opiniones de materias",
                  });
            }}
          >
            <InicioOpiniones
              color={event == "opiniones" ? "#E85E29" : "#A8ACAD"}
            />
            <Text
              /* fontFamily={"Sans"} */
              style={{ marginTop: -2, fontWeight: "400" }}
              fontSize={12}
              color={event == "opiniones" ? "#E85E29" : "#A8ACAD"}
            >
              Opiniones
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setEvent("menu");
              /*  navigation.navigate("Menu"); */

              setMenu(true);
            }}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginTop: "5%",
              marginBottom: "4%",
            }}
          >
            {/*             <MaterialIcons
              name="star"
              size={36}
              
              color={event == "menu" ? "#E85E29" : "#A8ACAD"}
            /> */}

            <MenuInicio color={event == "menu" ? "#E85E29" : "#A8ACAD"} />
            <Text
              /* fontFamily={"Sans"} */
              style={{ marginTop: -2, fontWeight: "400" }}
              fontSize={12}
              color={event == "menu" ? "#E85E29" : "#A8ACAD"}
            >
              Menú
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
}
