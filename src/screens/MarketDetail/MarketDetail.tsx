import { View, Linking, Dimensions, Platform } from "react-native";
import { HStack, Icon, IconButton, ScrollView, Text } from "native-base";
import React from "react";
import Container from "../../components/Container";
import Layout from "../../utils/LayoutHeader&BottomTab";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import ButtonMas from "../../components/ButtonMas";
import { Box, Image } from "native-base";
import { TouchableOpacity } from "react-native";
import { fontStyles } from "../../utils/colors/fontColors";
import { Ionicons } from "@expo/vector-icons";

type RootStackParamList = {
  MarketDetail: { data: any };
};

type MarketDetailRouteProp = RouteProp<RootStackParamList, "MarketDetail">;

const MarketDetail = ({ navigation }) => {
  //   console.log("route.params ", route.params);
  const { canGoBack, goBack, navigate } = useNavigation();
  //   const route = useRoute();
  const route = useRoute<MarketDetailRouteProp>();
  const data = route.params?.data ? route.params.data : route.params;

  console.log(
    "🚀 ~ file: MarketDetail.tsx:11 ~ MarketDetail ~ route: ", data?.url,
    JSON.stringify(data, null, 2)
  );

  return (
    <Container>
      <Layout route={route} navigation={navigation} title={"Detalle"}>
        <ScrollView>
          <Box mx="5" mt="3">
            <View>
              <Image
                style={{
                  height: 140,
                  width: "50%",
                  marginLeft: "25%",
                  borderRadius: 15,
                  marginBottom: "10%"
                }}
                alt="LOGO"
                source={{
                  uri: data?.image?.url,
                }}
              />
              <Box
                flexDir="row"
                justifyContent="space-around"
                alignItems={"center"}
              >
                <Text
                  w="88%"
                  fontWeight={700}
                  fontFamily="Manrope"
                  fontSize={24}
                  mb={3}
                >
                {data?.title}
                </Text>
                {/*  <HStack alignItems={"flex-start"}>
                <IconButton
                  onPress={() =>
                    Linking.openURL(
                      `https://fadu-1c40d.web.app/app?offer=${id}`
                    )
                  }
                  rounded={"xl"}
                  backgroundColor={"primary.900"}
                  icon={
                    <Icon
                      as={Ionicons}
                      name="share-social"
                      size="md"
                      color="primary.1000"
                    />
                  }
                />
              </HStack> */}
                {" "}  {" "}    {" "}  {" "}
              </Box>
              <Box>
                <Text fontSize={16} fontWeight="bold" mb="3">
                  Descripción
                </Text>
                <Text fontWeight={14} mb="4">
                  {data?.description}
                </Text>
              </Box>
              {data?.company && <Box>
                <Text fontSize={16} fontWeight="bold" mb="3">
                  Compañía
                </Text>
                <Text fontWeight={14} mb="4">
                  <Text style={{ marginBottom: 10 }}><Text style={[fontStyles.headingText, { fontSize: 16 }]}>Empresa:</Text> {data?.company}</Text>
                </Text>
              </Box>}
            </View>
          </Box>
        </ScrollView>
        <Box alignSelf={"center"} position={"absolute"} top={Dimensions.get("screen").height - (Platform.OS === "ios" ? 160 : 280)}>

          {data?.url && data.url.includes("@") &&
            <TouchableOpacity
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                justifyContent: 'center',
              }}

              onPress={() =>
                Linking.openURL(`mailto:${data.url}`)
              }
            >

              <View
                style={{
                  backgroundColor: "#EB5E29",
                  height: 50,
                  width: 218,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 13,
                    textAlign: "center",
                    marginTop: 13,
                    fontWeight: "bold",
                    letterSpacing: 0.5
                  }}
                >
                  Ver más
                </Text>
              </View>
            </TouchableOpacity>
          }

        </Box>
      </Layout>
    </Container>
  );
};

export default MarketDetail;
