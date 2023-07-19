import { View, Text, Linking, Dimensions, Platform } from "react-native";
import React from "react";
import Container from "../../components/Container";
import Layout from "../../utils/LayoutHeader&BottomTab";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import ButtonMas from "../../components/ButtonMas";
import { Box, Image } from "native-base";
import { TouchableOpacity } from "react-native";
import { fontStyles } from "../../utils/colors/fontColors";

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
        <View style={{ margin: 20 }}>
          <View>
            <Image
              style={{
                height: 140,
                width: "50%",
                marginLeft: "25%",
                borderRadius: 5,
                marginBottom: "10%"
              }}
              alt="LOGO"
              source={{
                uri: data?.image?.url,
              }}
            />
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              {data?.title}
            </Text>
            {data?.name && <Text style={{ marginBottom: 10 }}><Text style={[fontStyles.headingText, { fontSize: 16 }]}>Nombre y apellido:</Text> {data?.name}</Text>}
            {data?.company && <Text style={{ marginBottom: 10 }}><Text style={[fontStyles.headingText, { fontSize: 16 }]}>Empresa:</Text> {data?.company}</Text>}
            {data?.phone && <Text><Text style={[fontStyles.headingText, { fontSize: 16 }]}>Teléfono:</Text> {data?.phone}</Text>}
            {data?.career?.name && <Text style={{ marginBottom: 10 }}><Text style={[fontStyles.headingText, { fontSize: 16 }]}>Carrera:</Text> {data?.career?.name}</Text>}
            <Text>{data?.description}</Text>
          </View>
        </View>
        <Box alignSelf={"center"} position={"absolute"} top={Dimensions.get("screen").height - (Platform.OS === "ios" ? 160 : 280)}>


          <TouchableOpacity
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              justifyContent: 'center',
            }}
            onPress={() =>
              Linking.openURL(data?.url.includes("http") ? data?.url : `https://${data?.url}`)
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
