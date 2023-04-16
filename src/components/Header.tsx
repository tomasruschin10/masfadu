import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome5, EvilIcons } from "@expo/vector-icons";
import {
  Avatar,
  Box,
  HStack,
  Icon,
  IconButton,
  StatusBar,
  Text,
  useTheme,
  View,
} from "native-base";
import React, { useEffect } from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

export function HeaderBack({ ...props }) {
  const { canGoBack, goBack } = useNavigation();
  // const insets = useSafeAreaInsets()
  const { name } = useRoute();

  return (
    <>
      <StatusBar backgroundColor="#e8eef4" barStyle="dark-content" />
      <Box safeAreaTop bg="#e8eef4" />

      <HStack px="5" py="3" w="100%" maxW="350" alignItems={"flex-start"}>
        {canGoBack() && (
          <IconButton
            rounded={"xl"}
            backgroundColor={"primary.900"}
            onPress={() => {
              goBack();
            }}
            icon={
              <Icon
                as={Ionicons}
                name={
                  name == "ThreadSuggestions" ? "close-sharp" : "chevron-back"
                }
                size="md"
                color="primary.1000"
              />
            }
          />
        )}
        <Box ml={3} h={"100%"} maxH="350" justifyContent="center">
          <Text fontSize="20" fontWeight="600">
            {props.title ?? ""}
          </Text>
        </Box>
      </HStack>
    </>
  );
}
export function NoHeader({ ...props }) {
  // const insets = useSafeAreaInsets();

  const { canGoBack, goBack } = useNavigation();
  return (
    <>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <Box safeAreaTop bg="#ffffff" />
    </>
  );
}
export function HeaderPerfil({ ...props }) {
  const { canGoBack, goBack, navigate }: any = useNavigation();
  // const insets = useSafeAreaInsets();

  const { name } = useRoute();
  const { colors }: any = useTheme();
  const userdata = useSelector((state: any) => state.user.userdata);

  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor={props.statusBarColor}
        barStyle={props.barStyle}
      />
      <Box safeAreaTop={Platform.OS === "ios" ? 2 : 4} bg={"#e8eef4"} />
      <Box justifyContent={"space-between"} px={4} flexDirection={"row"} pb={2}>
        <Avatar bg="#e8eef4" source={{ uri: userdata.image.url }} size="md">
          BR
          <Avatar.Badge bg="#4fd441" />
        </Avatar>

        <Box px={3} flex={1} justifyContent={"center"}>
          <Text
            color={name == "Menu" ? "white" : "black"}
            bold
            fontSize={16}
            lineHeight={"sm"}
          >
            {userdata.name} {userdata.lastname}
          </Text>
          <Text
            color={name == "Menu" ? "white" : "mutedText"}
            fontSize={13}
            lineHeight={"sm"}
          >
            {userdata.career == null
              ? "Carrera Sin Seleccionar"
              : userdata.career.name}
          </Text>
        </Box>

        <Box justifyContent={"center"}>
          {name == "Home" ? (
            <TouchableOpacity
              onPress={() => navigate("Config")}
              style={{
                backgroundColor: "#ffffff",
                paddingHorizontal: 14,
                paddingVertical: 10,
                borderRadius: 12,
              }}
            >
              <FontAwesome5
                name="user-alt"
                size={14}
                color={colors.brand.primary}
              />
            </TouchableOpacity>
          ) : (
            canGoBack() && (
              <TouchableHighlight underlayColor="" onPress={() => goBack()}>
                <EvilIcons name="close" size={30} color={"white"} />
              </TouchableHighlight>
            )
          )}
        </Box>
      </Box>
    </SafeAreaView>
  );
}
