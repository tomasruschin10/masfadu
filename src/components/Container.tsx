import { Box } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import Menu from "../screens/Menu/Menu";

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#e8eef3',
	},
  });
  

export default function Container({ children,  ...props }) {
  return (
    <Box style={styles.container} flex={1}>
      
      {children}
    </Box>
  );
}
