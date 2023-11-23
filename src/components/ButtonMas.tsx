import { View, Text, TouchableOpacity, PixelRatio } from "react-native";
import React from "react";
import { fontStyles } from "../utils/colors/fontColors";
import { Box, Button } from "native-base";

interface Props {
  title: string;
  callback?: Function;
  isLoading?: boolean
}

const ButtonMas = ({ title }: Props) => {
  return (
    <TouchableOpacity
      style={{
        width: 200,
        height: 40,
        borderRadius: 10,
        backgroundColor: "#ea5e29",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "#fff",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const defaultButtonTouchable = ({ title, callback }: Props) => {
  return (
    <TouchableOpacity
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
      }}
      onPress={() =>
        callback()
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
          {title || "Ver más"}
        </Text>
      </View>
    </TouchableOpacity>

  );
};

const defaultButton = ({ title, callback, isLoading }: Props) => {

  return (
      <Button
        onPress={() =>
          callback()
        }
        style={{
          backgroundColor: "#EB5E29",
          borderRadius: 10,
          width: "100%"
        }}
        width={"100%"}
        mb={3} isLoading={isLoading}>
        <Text style={[fontStyles.poppins400, {
          color: "#ffffff",
          fontSize: PixelRatio.roundToNearestPixel(20),
          textAlign: "center",
          marginVertical: 30,
          fontWeight: "bold",
          letterSpacing: 0.5
        }]} >
          {title}
        </Text>
      </Button >
  );
};


export { defaultButton, defaultButtonTouchable };


export default ButtonMas;
