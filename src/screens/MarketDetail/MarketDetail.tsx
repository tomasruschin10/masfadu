import { View, Text, Linking } from "react-native";
import React from "react";
import Container from "../../components/Container";
import Layout from "../../utils/LayoutHeader&BottomTab";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import ButtonMas from "../../components/ButtonMas";
import { Box, Image } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
type RootStackParamList = {
  MarketDetail: { data: any };
};

type MarketDetailRouteProp = RouteProp<RootStackParamList, "MarketDetail">;

const MarketDetail = ({ navigation }) => {
  //   console.log("route.params ", route.params);
  const { canGoBack, goBack, navigate } = useNavigation();
  //   const route = useRoute();
  const route = useRoute<MarketDetailRouteProp>();
  const { data } = route.params;

  const { url } =
  route.params;
  console.log(
    "🚀 ~ file: MarketDetail.tsx:11 ~ MarketDetail ~ route:",
    JSON.stringify(data, null, 2)
  );

  return (
    <Container>
      <Layout route={route} navigation={navigation} title={"Detalle"}>
        <View style={{ margin: 20 }}>
          <View>
          <Image
            style={{
              height: 140,
              width: "50%",
              marginLeft:"25%",
              borderRadius: 5,
              marginBottom: "10%"
            }}
            source={{
              uri: data.image.url,
            }}
          />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              {data.title}
            </Text>
            <Text>{data.description}</Text>
          </View>
        </View>
        <Box alignSelf={"center"} marginTop={"20"}>

          <TouchableOpacity
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              justifyContent: 'center',
            }}
            onPress={() =>
              Linking.openURL(data?.url.includes("http") ? data?.url : `https://${data.url}`)
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
        </Box>
      </Layout>
    </Container>
  );
};

export default MarketDetail;
