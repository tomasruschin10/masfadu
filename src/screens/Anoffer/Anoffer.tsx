import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  ScrollView,
  Text,
  Image,
  View
} from "native-base";
import React, { useState } from "react";
import { Linking } from "react-native";
import Container from "../../components/Container";
import Layout from "../../utils/LayoutHeader&BottomTab";
import { TouchableOpacity } from "react-native-gesture-handler";

function Anoffer({ route, navigation }) {
  const [menuShow, setMenu] = useState(false)
  const { mainTitle, title, buttonValue, url, description, id, partner, image } =
    route.params;

  return (
    <Container>
      <Layout route={route} navigation={navigation} title={mainTitle}>
        <ScrollView>
          <Box mx="5" mt="3" mb={"48"}>
            <Image
              style={{
                height: 140,
                width: "50%",
                marginLeft: "25%",
                borderRadius: 15,
                marginBottom: "10%"
              }}
              source={{
                uri: image,
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
                fontSize={"xl"}
                mb={1}
              >
                {title}
              </Text>
              <HStack alignItems={"flex-start"}>
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
              </HStack>
            </Box>

            <Box mt="2" mb={12}>
              <Text fontSize={14}>Ofrecido por: {partner?.name}</Text>
            </Box>
            <Box>
              <Text fontSize={16} fontWeight="bold" mb="3">
                Descripción
              </Text>
              <Text fontWeight={14} mb="4">
                {description}
              </Text>
            </Box>
          </Box>
        </ScrollView>

        <Box alignSelf={"center"} position={"absolute"} bottom={32}>

          <TouchableOpacity
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              justifyContent: 'center',
            }}
            onPress={() =>
              Linking.openURL(url.includes("http") ? url : `https://${url}`)
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
}

export default Anoffer;
