import { View, Text } from "react-native";
import React from "react";
import Container from "../../components/Container";
import Layout from "../../utils/LayoutHeader&BottomTab";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import ButtonMas from "../../components/ButtonMas";
import { Image } from "native-base";
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
        <View
          style={{
            // backgroundColor: "gray",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",

          }}
        >
          <ButtonMas title="Ver más" />
        </View>
      </Layout>
    </Container>
  );
};

export default MarketDetail;
