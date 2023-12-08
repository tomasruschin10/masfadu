import { Ionicons, FontAwesome5, Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Avatar,
  Box,
  HStack,
  Icon,
  IconButton,
  StatusBar,
  Text,
  useTheme,
} from "native-base";
import React from "react";
import { Platform, SafeAreaView, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { fontStyles } from "../utils/colors/fontColors";
import { moderateScale } from "../utils/media.screens";


export function HeaderBack({ ...props }) {
  const navigation: any = useNavigation();
  const route = useRoute();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Box safeAreaTop   />

      <HStack py="3" w="100%" alignItems="center">
        {navigation.canGoBack() && (
          <IconButton
            rounded="xl"
            onPress={handleGoBack}
            icon={
              <Icon
                as={Ionicons}
                name={
                  route.name === 'ThreadSuggestions'
                    ? 'close-sharp'
                    : 'chevron-back'
                }
                size={moderateScale(25)}
                color="black"
              />
            }
          />
        )}
        <Box flex={12}>
          <Text marginLeft={0} fontSize="18" style={fontStyles.poppins500} textAlign={"left"}>
            {props.title ?? ''}
          </Text>
        </Box>
        {props?.addButtonUrl && (
          <Box mr={4}>
            <IconButton
              rounded="full"
              backgroundColor="#E85E29"
              onPress={() => {
                if (typeof props.addButtonUrl === "string") {
                  navigation.navigate(props.addButtonUrl);
                } else if (props.addButtonUrl && typeof props.addButtonUrl === "object") {
                  const { name, props: additionalProps } = props.addButtonUrl;
                  navigation.navigate(name, additionalProps);
                }
              }
              }
              size={"40px"}
              icon={
                <Entypo name="plus" size={27} color="#f4faff" />
              }
            />
          </Box>
        )}
      </HStack>
    </>
  );
}
export function NoHeader({ ...props }) {
  return (
    <>
      <StatusBar hidden={true} translucent={true} backgroundColor="#ffffff" barStyle="dark-content" />
      <Box bg="" />
    </>
  );
}

export function HeaderPerfil(props) {
  const { showIcon } = props
  const navigation: any = useNavigation();
  const { colors }: any = useTheme();
  const userdata = useSelector((state: any) => state.user.userdata);

  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor={props.statusBarColor}
        barStyle={props.barStyle}

      />
      <Box safeAreaTop={Platform.OS === "ios" ? 2 : 4} />
      <Box justifyContent="space-between" px={4} flexDirection="row" pb={2}>
        <Avatar bg="#e8eef4" source={{ uri: userdata.image.url }} size="md">
          BR
          <Avatar.Badge bg="#4fd441" />
        </Avatar>

        <Box px={3} flex={1} justifyContent="center">
          <Text color="black" bold fontSize={16} lineHeight="sm">
            {userdata.name} {userdata.lastname}
          </Text>
          <Text color="#50545a" fontSize={13} lineHeight="sm">
            {userdata.career == null
              ? "Carrera Sin Seleccionar"
              : userdata.career.name}
          </Text>
        </Box>

        <Box justifyContent="center">
          {showIcon ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("Config")}
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
          ) : null}
        </Box>
      </Box>
    </SafeAreaView>
  );
}
