import { View } from "native-base";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  Text,
  TextStyle,
  TouchableOpacityProps,
  TouchableOpacity,
  PixelRatio,
} from "react-native";
import { fontStyles } from "../utils/colors/fontColors";
import { Fonts } from "../utils/Fonts";
import { moderateScale } from "../utils/media.screens";

export const defaultTextStyle = {
  width: 150,
  color: "#ffffff",
  fontSize: 13,
  fontWeight: "semibold",
  letterSpacing: 0.5,
};
interface DefaultButtonProps extends TouchableOpacityProps {
  callBack: () => void;
  title: string;
  containerStyle?: any;
  buttonStyle?: any;
  textStyle?: any;
}

const DefaultButton = ({
  callBack,
  title,
  containerStyle,
  buttonStyle,
  textStyle,
}: DefaultButtonProps) => {
  const containerStyleCombined = { ...styles.container, ...containerStyle };
  const buttonStyleCombined = { ...styles.button, ...buttonStyle };
  const textStyleCombined = { ...styles.text, ...textStyle };
  textStyleCombined.fontFamily =
    Fonts.fontConfig.Poppins[textStyle?.fontWeight || "700"]?.normal;
  return (
    <TouchableOpacity
      style={containerStyleCombined}
      onPress={() => {
        callBack();
      }}
    >
      <View style={buttonStyleCombined}>
        <Text style={textStyleCombined}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#DA673A",
    height: 50,
    width: "100%",
    borderRadius: moderateScale(14),
    paddingHorizontal: "5%",
    alignItems: "center",
    alignContent: "center",
    fontWeight: "300",
  },
  text: {
    ...fontStyles.poppins700,
    color: "#ffffff",
    fontSize: 13,
    textAlign: "center",
    marginTop: 13,
    fontWeight: "semibold",
    letterSpacing: 0.5,
  },
});

export default DefaultButton;
