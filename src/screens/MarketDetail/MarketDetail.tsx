import { View, Linking, Dimensions, Platform } from "react-native";
import { ScrollView, Text } from "native-base";
import React, { useState } from "react";
import Container from "../../components/Container";
import Layout from "../../utils/LayoutHeader&BottomTab";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Box, Image } from "native-base";
import { TouchableOpacity } from "react-native";
import { fontStyles } from "../../utils/colors/fontColors";
import { FontAwesome } from "@expo/vector-icons";
import { ImageModal } from "../AboutSubject/Modals";

type RootStackParamList = {
  MarketDetail: { data: any };
};

type MarketDetailRouteProp = RouteProp<RootStackParamList, "MarketDetail">;

const MarketDetail = ({ navigation }) => {
  const [showImage, setShowImage] = useState(null);
  const [openModal, setOpeModal] = useState<boolean>(false);
  const route = useRoute<MarketDetailRouteProp>();
  const data = route.params?.data ? route.params.data : route.params;

  console.log(data?.url, JSON.stringify(data, null, 2));

  const handleShowImage = (image) => {
    setShowImage(image);
    setOpeModal(true);
  };

  const hideModal = () => {
    setOpeModal(false);
    setShowImage(null);
  };

  return (
    <Container>
      <ImageModal
        image={showImage}
        showImage={openModal}
        hideModal={hideModal}
      />
      <Layout route={route} navigation={navigation} title={"Detalle"}>
        <ScrollView>
          <Box mx="3" mt="3">
            <View>
              <TouchableOpacity
                onPress={() => handleShowImage(data?.image?.url)}
              >
                {!openModal && (
                  <Box position="absolute" zIndex={99} right={2} top={2}>
                    <FontAwesome name="expand" size={24} color="#DA673A" />
                  </Box>
                )}
                <Image
                  style={{
                    height: 140,
                    width: "100%",
                    // marginLeft: "25%",
                    borderRadius: 8,
                    marginBottom: "10%",
                  }}
                  alt="LOGO"
                  source={{
                    uri: data?.image?.url,
                  }}
                />
              </TouchableOpacity>
              <Box
                flexDir="row"
                justifyContent="space-around"
                alignItems={"center"}
                px={3}
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
              </Box>
              <Box
                mt={3}
                rounded={"lg"}
                backgroundColor={"white"}
                px={3}
                py={3}
              >
                <Text
                  fontSize={16}
                  backgroundColor="white"
                  fontWeight="bold"
                  mb={3}
                >
                  Descripción:{" "}
                </Text>
                <Text fontSize={14} mb="3" backgroundColor="white">
                  {data?.description}
                </Text>
              </Box>
              {data?.company && (
                <Box mt={3} rounded={"lg"} backgroundColor={"white"}>
                  <Text fontSize={16} fontWeight="bold" mb="3">
                    Compañía
                  </Text>
                  <Text fontWeight={14} mb="4">
                    <Text style={{ marginBottom: 10 }}>
                      <Text style={[fontStyles.headingText, { fontSize: 16 }]}>
                        Empresa:
                      </Text>{" "}
                      {data?.company}
                    </Text>
                  </Text>
                </Box>
              )}
            </View>
          </Box>
        </ScrollView>
        <Box
          alignSelf={"center"}
          position={"absolute"}
          top={
            Dimensions.get("screen").height -
            (Platform.OS === "ios" ? 160 : 280)
          }
        >
          {data?.email && (
            <TouchableOpacity
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                justifyContent: "center",
              }}
              onPress={() => Linking.openURL(`mailto:${data.email}`)}
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
                    letterSpacing: 0.5,
                  }}
                >
                  Contactar
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </Box>
      </Layout>
    </Container>
  );
};

export default MarketDetail;
