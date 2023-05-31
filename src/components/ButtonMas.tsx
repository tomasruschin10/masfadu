import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface Props {
  title: string;
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

export default ButtonMas;
