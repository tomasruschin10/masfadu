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


export function HeaderBack({ ...props }) {
  const navigation: any = useNavigation();
  const route = useRoute();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <StatusBar backgroundColor="#e8eef4" barStyle="dark-content" />
      <Box safeAreaTop bg="#e8eef4" />

      <HStack px="5" py="3" w="100%" alignItems="center">
        {navigation.canGoBack() && (
          <IconButton
            rounded="xl"
            backgroundColor="primary.900"
            onPress={handleGoBack}
            icon={
              <Icon
                as={Ionicons}
                name={
                  route.name === 'ThreadSuggestions'
                    ? 'close-sharp'
                    : 'chevron-back'
                }
                size="md"
                color="primary.1000"
              />
            }
          />
        )}
        <Box flex={12}>
          <Text marginLeft={props?.addButtonUrl ? 0 : 3} fontSize="18" fontWeight="600" textAlign={props?.addButtonUrl ? "center" : "left"}>
            {props.title ?? ''}
          </Text>
        </Box>
        {props?.addButtonUrl && (
          <Box >
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
              icon={
                <Icon
                  as={Ionicons}
                  name="add"
                  size="md"
                  color="#f4faff"
                />
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
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <Box safeAreaTop bg="#ffffff" />
    </>
  );
}

export function HeaderPerfil({ showIcon, ...props }) {
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
