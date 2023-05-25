import { Box, Text, useTheme } from "native-base";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { TouchableOpacity, Platform, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useEventNavigation } from "../context";

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    position: "absolute",
  },
});

export default function BottomTab({ route, navigation }) {
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
        // Platform.OS == "android"
        //   ? { paddingBottom: 24 }
        //   : { paddingBottom: 24 },
      ]}
    >
      <Box
        py={2}
        px={8}
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
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <MaterialIcons
              name="home"
              size={36}
              style={{ marginTop: 0 }}
              color={event == "inicio" ? "#eb5e29" : "#d1d5d9"}
            />

            <Box justifyContent={"center"}>
              <Text
                fontFamily={"SourceSansPro"}
                style={{ marginTop: -2 }}
                fontSize={"12"}
                color={event == "inicio" ? "#eb5e29" : "#d1d5d9"}
              >
                Inicio
              </Text>
            </Box>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setEvent("materias");
              navigation.navigate("AboutSubject");
            }}
            style={{
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <FontAwesome5
              name="book-open"
              style={{ marginTop: 6 }}
              size={26}
              color={event == "materias" ? "#eb5e29" : "#d1d5d9"}
            />

            <Text
              fontFamily={"SourceSansPro"}
              fontSize={"12"}
              style={{ marginTop: 0 }}
              color={event == "materias" ? "#eb5e29" : "#d1d5d9"}
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
              alignItems: "center",
              flexDirection: "column",
              // backgroundColor: "red",

              width: 60,
            }}
          >
            <Box
              position={"absolute"}
              style={{
                bottom: 12,
                borderColor: "#f4faff",
                borderWidth: 10,
                backgroundColor: "#f4faff",
                borderRadius: 50,
                margin: 0,
              }}
            >
              <Box
                style={{
                  backgroundColor: "#eb5e29",
                  borderColor: "#f6f6f6",
                  // borderWidth: 5,
                  borderRadius: 50,
                  padding: 6,
                }}
              >
                <Entypo name="plus" size={28} color="#f4faff" />
              </Box>
            </Box>
            <Text
              fontFamily={"SourceSansPro"}
              fontSize={"12"}
              style={{ bottom: 0, position: "absolute" }}
              color={event == "publica" ? "#eb5e29" : "#d1d5d9"}
            >
              Publicá
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignItems: "center",
              flexDirection: "column",
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
            <MaterialCommunityIcons
              name="emoticon-happy"
              size={30}
              style={{ marginTop: 3 }}
              color={event == "opiniones" ? "#eb5e29" : "#d1d5d9"}
            />

            <Text
              fontFamily={"SourceSansPro"}
              fontSize={"12"}
              color={event == "opiniones" ? "#eb5e29" : "#d1d5d9"}
            >
              Opiniones
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
           /*    setEvent("menu"); */
              navigation.navigate('Menu');
            }}
            style={{
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <MaterialIcons
              name="star"
              size={36}
              style={{ marginTop: 0 }}
              color={event == "menu" ? "#eb5e29" : "#d1d5d9"}
            />

            <Text
              fontFamily={"SourceSansPro"}
              fontSize={"12"}
              style={{ marginTop: -2 }}
              color={event == "menu" ? "#eb5e29" : "#d1d5d9"}
            >
              Menú
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
}
