import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, Button, Image, useTheme } from "native-base";
import * as React from "react";
import { Linking, TouchableHighlight } from "react-native";
import Container from "../../components/Container";
import DefaultButton from "../../components/DefaultButton";
import { moderateScale, screenWidth, verticalScale } from "../../utils/media.screens";

function News({ route, navigation }) {
  const { colors }: any = useTheme();
  const { canGoBack, goBack } = useNavigation();
  const { url, image } = route.params;

  return (
    <Container>
      <Box flex={1} zIndex={1} right={7} top={12} position={"absolute"}>
        {canGoBack() && (
          <TouchableHighlight
            onPress={() => goBack()}
            style={{
              backgroundColor: "#ecfeff",
              borderRadius: 10,
              paddingHorizontal: 8,
              paddingVertical: 4,
            }}
            underlayColor=""
          >
            <FontAwesome5
              name="times-circle"
              size={22}
              color={colors.brand.primary}
            />
          </TouchableHighlight>
        )}
      </Box>
      <Box>
        <Box bg={"white"}>
          <Image
            source={{ uri: image }}
            resizeMode={"contain"}
            w={"100%"}
            h={"100%"}
            alt="news1"
          />
        </Box>
        <Box
          py={10}
          safeAreaBottom
          alignItems="center"
          left={0}
          bottom={0}
          right={0}
          position={"absolute"}
        >
         <DefaultButton
            buttonStyle={{
              backgroundColor: "#DA673A",
              borderRadius: moderateScale(14),
              height: verticalScale(50),
              width: screenWidth - (screenWidth / 7),
              paddingTop: verticalScale(5.5)
            }}
            textStyle={
              {
                fontSize: moderateScale(14),
                color: "white"
              }
            }
            containerStyle={{
              marginTop: verticalScale(75)
            }}
         callBack={() =>
              Linking.openURL(url.includes("http") ? url : `https://${url}`)
            }
            title="Ver más"
            />
        </Box>
      </Box>
    </Container>
  );
}

export default News;
