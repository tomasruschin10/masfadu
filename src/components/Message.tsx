import {
  Box,
  Button,
  Center,
  CheckIcon,
  CloseIcon,
  Heading,
  HStack,
  Input,
  Slide,
  Text,
  View,
  VStack,
} from "native-base";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateMessage } from "../redux/actions/message";
import { TouchableOpacity } from "react-native";
import { NoHeader } from "./Header";
import { MaterialIcons } from "@expo/vector-icons";
function Message() {
  const message = useSelector((state: any) => state.message);
  const dispatch = useDispatch();
  if (message.open) {
    setTimeout(() => {
      dispatch(updateMessage({ body: "", open: false, type: "" }));
    }, 7000);
  }
  const getColors = (type, resource) => {
    switch (type) {
      case "success":
        if (resource === "color") {
          return "#BAEDE1";
        }
        if (resource === "icon") {
          return (
            <MaterialIcons
           
              name={"check"}
              size={15}
              color="black"
            />
          );
        }
        break;

      case "info":
        if (resource === "color") {
          return "#CDEDF6";
        }
        if (resource === "icon") {
          return (
            <MaterialIcons
             
              name={"info"}
              size={15}
              color="black"
            />
          );
        }
        break;

      case "warning":
        if (resource === "color") {
          return "#FFEACA";
        }
        if (resource === "icon") {
          return (
            <MaterialIcons
             
              name={"warning"}
              size={15}
              color="black"
            />
          );
        }
        break;
      case "danger":
        if (resource === "color") {
          return "#FFCACA";
        }
        if (resource === "icon") {
          return (
            <MaterialIcons
              
              name={"warning"}
              size={15}
              color="black"
            />
          );
        }
        break;
    }
  };
  return (
    <Center>
      <Box>
        <Slide in={message.open} placement="top">
          <View
            style={{
              marginTop: "10%",
              borderWidth: 1,
              borderColor: "#d6e9c6",
              padding: 5,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "90%",
              position: "absolute",
              left: "5%",
              right: 0,
              borderRadius: 50,
            }}
            bg={getColors(message.type, "color") as string}
          >
            <TouchableOpacity
              onPress={() =>
                dispatch(updateMessage({ body: "", open: false, type: "" }))
              }
            >
              <HStack px={2} space={5}>
                <Box>{getColors(message.type, "icon")}</Box>
                <Text
                  color="black"
                  textAlign="left"
                  fontWeight="normal"
                  style={{
    
                    maxWidth: "75%",
                    overflow: "hidden",
                    fontSize: 13, // Tamaño de fuente más pequeño (puedes ajustarlo según tus necesidades)
                  }}
                >
                  {message.body}
                 
                 {/*  Tu sesion se ha expirado, por favor vuelve a iniciar */}
                </Text>
                <Box >
                  <MaterialIcons          
                   
                    name={"close"}
                    size={20}
                    color="black"
                  />
                </Box>
              </HStack>
            </TouchableOpacity>
          </View>
        </Slide>
      </Box>
    </Center>
  );
}
export default memo(Message);
