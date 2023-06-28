import { Box, Icon, Text } from "native-base";
import * as React from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEventNavigation } from "../context";

const SimpleAccordion = ({
  title = "",
  description,
  viewInside,
  startCollapsed = true,
  showContentInsideOfCard = true,
  showArrows = true,
  arrowColor = "#000000",
  viewContainerStyle = {},
  bannerStyle = {},
  titleStyle = {},
}: {
  title?: string;
  description?: string;
  viewInside: JSX.Element;
  startCollapsed?: boolean;
  showContentInsideOfCard?: boolean;
  showArrows?: boolean;
  arrowColor?: string;
  viewContainerStyle?: StyleProp<ViewStyle>;
  bannerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(startCollapsed);
  const { navigationEvent } = useEventNavigation();
  let marginBotom = 0;
  if (navigationEvent === "materias") {
    marginBotom = -20;
  }
  console.log(
    "🚀 ~ file: SimpleAccordion.tsx:42 ~ navigationEvent:",
    navigationEvent
  );

  return (
    // ITEM PADRE
    <View>
      {/* items  */}
      <TouchableOpacity
        activeOpacity={10}
        onPress={() => setIsCollapsed(!isCollapsed)}
      >
        <Box style={[styles.defaultBannerStyle]}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* {navigationEvent === "materias" && ( */}
            <Image
              source={require("../../assets/icons/star.png")}
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
                marginLeft: -5,
              }}
            />
            {/* )} */}

            <View>
              <Text
                allowFontScaling={false}
                bold={true}
                style={{
                  fontSize: 14.5,
                  fontWeight: "bold",

                  color: "#000000",
                  marginBottom: -2,
                }}
              >
                {title}
              </Text>
              {description && (
                <Text style={{ color: "#939aa0", fontSize: 13, marginTop: 2 }}>
                  {description}
                </Text>
              )}
            </View>
          </View>
          {/* Button ver mas */}

          <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
            {/* {navigationEvent === "materias" ? ( */}
            <Box
              backgroundColor={"#ffffff"}
              style={{
                borderColor: "#c7cbce",
                borderWidth: 1,
                borderRadius: 2,
                padding: 2,
                marginRight: 8,
              }}
              px={1}
              py={0.2}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text
                color={"#6e7981"}
                style={{
                  padding: 3,
                  marginHorizontal: 5,
                  fontWeight: "bold",
                }}
                fontSize={9}
              >
                {isCollapsed ? "Ver más" : "Ver menos"}
              </Text>
            </Box>
          </TouchableOpacity>
          {/* {
                    showArrows &&
                    <Image source={isCollapsed ? downArrow : upArrow} style={[styles.arrows, {tintColor: arrowColor}]}/>
                } */}
        </Box>
        <Collapsible
          collapsed={isCollapsed}
          style={
            navigationEvent === "materias"
              ? { paddingBottom: 12, marginTop: -10 }
              : { paddingBottom: 0 }
          }
        >
          <View
            style={[
              styles.defaultViewContainer,
              showContentInsideOfCard ? styles.card : styles.nothing,
              viewContainerStyle,
              navigationEvent === "materias"
                ? { marginBottom: marginBotom }
                : {},
            ]}
          >
            {viewInside}
          </View>
        </Collapsible>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  nothing: {},
  arrows: {
    height: 32,
    width: 32,
    resizeMode: "contain",
  },
  defaultBannerStyle: {
    height: 80,
    marginHorizontal: 5,
    borderRadius: 8,
    // marginBottom: 10,
    marginTop: 12,
    // marginBottom: -10,
    // backgroundColor: "#294871",
    flexDirection: "row",
    backgroundColor: "#fbfbfb",
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.24,
    shadowRadius: 6.27,

    elevation: 10,
  },
  defaultViewContainer: {
    // padding: 8,
    // backgroundColor: "#eff6ff",
    // marginHorizontal: 5,
    // borderRadius: 8,
    // marginBottom: 4,
  },
  card: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  collapsible: {
    paddingBottom: 0,
  },
});

export { SimpleAccordion };
