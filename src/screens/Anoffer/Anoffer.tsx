import { Ionicons, FontAwesome } from "@expo/vector-icons";
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
import { Dimensions, Linking, Platform } from "react-native";
import Container from "../../components/Container";
import Layout from "../../utils/LayoutHeader&BottomTab";
import { TouchableOpacity } from "react-native";
import { fontStyles } from "../../utils/colors/fontColors";
import { horizontalScale, screenWidth, verticalScale } from "../../utils/media.screens";
import { ImageModal } from "../AboutSubject/Modals";

function Anoffer({ route, navigation }) {
  const [menuShow, setMenu] = useState(false)  
  const [showImage, setShowImage] = useState(null)
  const [openModal, setOpeModal] = useState<boolean>(false)
  const { mainTitle, title, buttonValue, url, partner, description, id, name, phone, company, image } =
    route.params;

    const handleShowImage = (image) => {
      setShowImage(image)
      setOpeModal(true)
    }
  
    const hideModal = () => {
      setOpeModal(false)
      setShowImage(null)
    }

  return (
    <Container>      
      <ImageModal image={showImage} showImage={openModal} hideModal={hideModal} />
      <Layout route={route} navigation={navigation} title={mainTitle}>
        <ScrollView>
          <Box mx="3" mt="3" mb={"48"}>
            <TouchableOpacity onPress={() => handleShowImage(image)}>
              {
                !openModal &&
                <Box position="absolute" zIndex={99} right={2} top={2}>
                  <FontAwesome name="expand" size={24} color="#DA673A" />
                </Box>
              }
              <Image
                style={{
                  height: 180,
                  maxHeight: 200,
                  width: "100%",
                  borderRadius: 8,
                  marginBottom: "10%"
                }}
                alt="LOGO"
                resizeMode={"cover"}
                source={{
                  uri: image,
                }}
              />
            </TouchableOpacity>
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
                {title}
              </Text>
              <HStack alignItems={"flex-start"}>
                <IconButton
                  onPress={() =>
                    Linking.openURL(
                      `https://fadu-1c40d.web.app/app?offer=${id}`
                    )
                  }
                  rounded={8}
                  backgroundColor={"primary.900"}
                  icon={
                    <Icon
                      as={Ionicons}
                      name="share-social"
                      size="md"
                      color="brand.primary0"
                    />
                  }
                />
              </HStack>
            </Box>

            {name && (
              <Box p={3} mt="3" mb={3}
                rounded={8}
                backgroundColor={"white"}>
                <Text fontSize={14}><Text style={[fontStyles.headingText, { fontSize: 16 }]}>Ofrecido por: </Text>{name}</Text>
              </Box>
            )}

            <Box p={3}  mt={3}
              rounded={8}
              backgroundColor={"white"}>
              <Text style={[fontStyles.headingText, { fontSize: 16 }]} mb="3">Descripción: </Text>
              <Text fontSize={14} mb="3">
                {description}
              </Text>
            </Box>
          </Box>
        </ScrollView>

        <Box alignSelf={"center"} position={"absolute"} top={Dimensions.get("screen").height - (Platform.OS === "ios" ? 160 : 280)}>

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
                height: verticalScale(45),
                width: screenWidth - horizontalScale(40),
                borderRadius: 8,
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
