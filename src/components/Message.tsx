import { Box, Center, Input, Slide, Text, View } from "native-base";
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
              size={PixelRatio.roundToNearestPixel(12)}
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
              size={PixelRatio.roundToNearestPixel(12)}
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
              size={PixelRatio.roundToNearestPixel(12)}
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
              size={PixelRatio.roundToNearestPixel(12)}
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
          <Box
            w={"95%"}
            position={"absolute"}
            left={"auto"}
            right={"auto"}
            top={messageOffset}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-around"}
            alignSelf={"center"}
            pr={"2.607%"}
            pl={"2.669%"}
            py={"3%"}
            borderRadius={8}
            flex={1}
            flexWrap="wrap"
            // style={{
            //   borderWidth: 1,
            //   borderColor: "#d6e9c6",
            //   width: "95%",
            //   aspectRatio: 10,
            //   top: messageOffset,
            //   position: "absolute",
            //   alignSelf: "center",
            //   // paddingTop: "0%",
            //   paddingRight: "2.607%",
            //   // paddingBottom: "2%",
            //   paddingLeft: "2.669%",
            //   borderRadius: 8,
            // }}
            bg={getColors(message.type, "color") as string}
          >
            <TouchableOpacity
              onPress={() =>
                dispatch(updateMessage({ body: "", open: false, type: "" }))
              }
            >
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                gap={4}
              >
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                >
                  <Text color="black" textAlign="left" fontWeight="normal">
                    {getColors(message.type, "icon")}{" "}
                  </Text>
                  <Text
                    // numberOfLines={1}
                    flex={1}
                    maxWidth={"85%"}
                    flexWrap="wrap"
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
                </Box>
                <Box>
                  <MaterialIcons name={"close"} size={20} color="black" />
                </Box>
              </Box>
            </TouchableOpacity>
          </Box>
        </Slide>
      </Box>
    </Center>
  );
}
export default memo(Message);
