import { Box } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#F5F5F5',
	},
  });

export default function Container({ children, ...props }) {
  return (
    <Box style={styles.container} flex={1} background={"#e8eef4"}>
      {children}
    </Box>
  );
}
