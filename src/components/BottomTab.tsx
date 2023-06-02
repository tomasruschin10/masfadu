import { Box, Text, View, useTheme } from "native-base";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { TouchableOpacity, Platform, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useEventNavigation } from "../context";
import Svg, { Use, Image } from "react-native-svg";
import  {InicioMenu, InicioMateria, InicioOpiniones, MenuInicio} from "././iconsMenu/inicio-menu";
import { useDispatch } from "react-redux";


const styles = StyleSheet.create({
  container: {
    bottom: 0,
    position: "absolute",
  },
});

export default function BottomTab({ route, navigation, setMenu }) {
  const dispatch = useDispatch();

  const { colors }: any = useTheme();
  const { name } = route;
  console.log("🚀 ~ file: BottomTab.tsx:20 ~ BottomTab ~ name:", name);

  const { navigationEvent: event, setNavigationEvent: setEvent } =
    useEventNavigation();

  return (
    <Box
      safeAreaBottom
      width={"100%"}
     
      style={[
        styles.container,

      
      ]}
    >
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
              marginBottom: "4%"
            }}
          >
            {/*         <MaterialIcons
          name="home"
          size={36}
          style={{ marginTop: 0 }}
          color={event == "inicio" ? "#E85E29" : "#A8ACAD"}
        /> */}

              <InicioMenu color={event == "inicio" ? "#E85E29" : "#A8ACAD"}/>

            <Text
              /* fontFamily={"Sans"} */
              style={{  fontWeight: "400" }}
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
              marginBottom: "4%"
            }}
          >
{/*             <FontAwesome5
              name="book-open"
              style={{ marginTop: 6 }}
              size={26}
              color={event == "materias" ? "#E85E29" : "#A8ACAD"}
            /> */}


            <InicioMateria color={event == "materias" ? "#E85E29" : "#A8ACAD"}/>

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
              setEvent("publica");
              navigation.navigate("Subsections", {
                title: "Publicar",
              });
            }}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: 60,
              marginBottom: "4%"
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
                <Entypo  name="plus" size={28} color="#f4faff" />
              </Box>
            </Box>
            <Text
              /* fontFamily={"Sans"} */
              fontSize={12}
              style={{ bottom: "-14%", position: "absolute", fontWeight: "400",  }}
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
              marginBottom: "4%"
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
            <InicioOpiniones color={event == "opiniones" ? "#E85E29" : "#A8ACAD"}/>
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

             setMenu(true)


            }}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginTop: "5%",
              marginBottom: "4%"
            
            }}
          >
{/*             <MaterialIcons
              name="star"
              size={36}
              
              color={event == "menu" ? "#E85E29" : "#A8ACAD"}
            /> */}

            <MenuInicio color={event == "menu" ? "#E85E29" : "#A8ACAD"}/>
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
