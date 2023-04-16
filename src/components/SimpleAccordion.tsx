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
import { Feather } from "@expo/vector-icons";
const SimpleAccordion = ({
  title = "",
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

  return (
    <View>
      {/* items  */}
      <Box style={[styles.defaultBannerStyle]}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/icons/star.png")}
            style={{ width: 30, height: 30, marginRight: 10, marginLeft: -5 }}
          />
          <View>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#000000",
              }}
            >
              {title}
            </Text>
            <Text style={{ color: "#939aa0", fontSize: 13.5 }}>
              CICLO BASICO COMUN
            </Text>
          </View>
        </View>
        {/* Button ver mas */}
        <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
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
              style={{ padding: 3, marginHorizontal: 8, fontWeight: "bold" }}
              fontSize={10}
            >
              {isCollapsed ? "Ver más" : "Ver menos"}
            </Text>
            {/* <Feather
              name={isCollapsed ? "arrow-right" : "arrow-left"}
              size={20}
              color="#1ABC9C"
            /> */}
          </Box>
        </TouchableOpacity>
        {/* {
                    showArrows &&
                    <Image source={isCollapsed ? downArrow : upArrow} style={[styles.arrows, {tintColor: arrowColor}]}/>
                } */}
      </Box>
      <Collapsible collapsed={isCollapsed} style={[styles.collapsible]}>
        <View
          style={[
            styles.defaultViewContainer,
            showContentInsideOfCard ? styles.card : styles.nothing,
            viewContainerStyle,
          ]}
        >
          {viewInside}
        </View>
      </Collapsible>
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
    height: 60,
    marginHorizontal: 5,
    borderRadius: 8,
    marginBottom: 10,
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
    paddingBottom: 8,
  },
});

export { SimpleAccordion };
