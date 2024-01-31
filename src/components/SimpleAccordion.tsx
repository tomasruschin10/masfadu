import { Box, Text } from "native-base";
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

import { useEventNavigation } from "../context";
import { moderateScale } from "../utils/media.screens";

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

  return (
    <View>
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
            <Image
              source={require("../../assets/icons/star2.png")}
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
                marginLeft: -5,
              }}
            />

            <View>
              <Text
                allowFontScaling={false}
                bold={true}
                style={{
                  fontSize: moderateScale(14),
                  fontWeight: "bold",
                  color: "#000000",
                  marginBottom: -2,
                }}
              >
                {title}
              </Text>
              {description && (
                <Text
                  style={{
                    color: "#646464",
                    fontSize: moderateScale(12),
                    marginTop: 2,
                  }}
                >
                  {description}
                </Text>
              )}
            </View>
          </View>

          <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
            <Box
              style={{
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
                color={"#797979"}
                style={{
                  padding: 3,
                  marginHorizontal: 5,
                }}
                fontSize={12}
              >
                {isCollapsed ? "Ver más" : "Ver menos"}
              </Text>
            </Box>
          </TouchableOpacity>
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
    height: 95,
    marginHorizontal: 5,
    borderRadius: 8,

    marginTop: 12,

    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    alignItems: "center",
  },
  defaultViewContainer: {},
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
