import { Box, Text, useTheme } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
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
        py={4}
        px={8}
        shadow={0}
        style={{
          backgroundColor: "#fff",
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
              size={26}
              color={event == "inicio" ? "#eb5e29" : "#d1d5d9"}
            />

            <Box justifyContent={"center"}>
              <Text
                fontFamily={"SourceSansPro"}
                fontSize={"12"}
                color={event == "inicio" ? "#eb5e29" : "#d1d5d9"}
              >
                Inicio
              </Text>
            </Box>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignItems: "center",
              flexDirection: "column",
            }}
            onPress={() => {
              navigation.navigate("AboutSubject");
              setEvent("opiniones");
            }}
          >
            <MaterialCommunityIcons
              name="emoticon-happy"
              size={26}
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
              setEvent("materias");
              name !== "Subsections"
                ? navigation.navigate("Subsections", {
                    title: "Opiniones de materias",
                  })
                : navigation.navigate("Subsections", {
                    title: "Opiniones de materias",
                  });
            }}
            style={{
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <FontAwesome5
              name="book-open"
              size={26}
              color={event == "materias" ? "#eb5e29" : "#d1d5d9"}
            />

            <Text
              fontFamily={"SourceSansPro"}
              fontSize={"12"}
              color={event == "materias" ? "#eb5e29" : "#d1d5d9"}
            >
              Materias
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setEvent("menu");
              navigation.navigate("Menu");
            }}
            style={{
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <MaterialIcons
              name="star"
              size={26}
              color={event == "menu" ? "#eb5e29" : "#d1d5d9"}
            />

            <Text
              fontFamily={"SourceSansPro"}
              fontSize={"12"}
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
