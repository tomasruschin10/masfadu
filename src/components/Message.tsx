import {
  Box,
  Center,
  Input,
  Slide,
  Text,
  View,
} from "native-base";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateMessage } from "../redux/actions/message";
import { Dimensions, PixelRatio, TouchableOpacity } from "react-native";
/* import { NoHeader } from "./Header";*/
import { MaterialIcons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");
const messageOffset = height * 0.07;


function Message() {
  const message = useSelector((state: any) => state.message);
  const dispatch = useDispatch();

  if (message.open) {
    setTimeout(() => {
      dispatch(updateMessage({ body: "", open: false, type: "" }));
    }, 10000);
  } 

  //uncomment for manually activation
  /*   useEffect(() => {
      dispatch(updateMessage({ body: "Tú sesión expiró, volvé a iniciar sesión para continuar", type: "danger", open: true }));
  
    }, []) */

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
              borderWidth: 1,
              borderColor: "#d6e9c6",
              width: "95%",
              aspectRatio: 10,
              top: messageOffset,
              position: "absolute",
              alignSelf: "center",
              paddingTop: "0%",
              paddingRight: "2.607%",
              paddingBottom: "2%",
              paddingLeft: "2.669%",
              borderRadius: 20,
            }}
            bg={getColors(message.type, "color") as string}
          >
            <TouchableOpacity
              style={
                { marginTop: "3%" }
              }
              onPress={() =>
                dispatch(updateMessage({ body: "", open: false, type: "" }))
              }
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    color="black"
                    textAlign="left"
                    fontWeight="normal"
                  >
                    {getColors(message.type, "icon")} {" "}
                  </Text>
                  <Text
                    numberOfLines={1}
                    color="black"
                    textAlign="left"
                    fontWeight="normal"
                    style={{
                      overflow: "hidden",
                      fontSize: PixelRatio.roundToNearestPixel(12),
                    }}
                  >
                    {message.body}
                  </Text>
                </View>
                <MaterialIcons
                  name={"close"}
                  size={20}
                  color="black"
                />
              </View>


            </TouchableOpacity>
          </View>
        </Slide>
      </Box>
    </Center>
  );
}
export default memo(Message);
