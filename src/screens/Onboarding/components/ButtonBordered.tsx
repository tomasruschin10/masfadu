import { Box, HStack, Image, Text } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function ButtonBordered({
  setCarrier,
  carrier,
  created_at,
  image,
  image_id,
  name,
  updated_at,
  id,
}) {
  return (
    <TouchableOpacity onPress={() => setCarrier(id)} style={{ width: "48%" }}>
      <HStack
        // pt={4}
        px={3}
        mb={2.5}
        borderWidth={1}
        borderRadius={8}
        alignItems='center'
        backgroundColor={"white"}
        justifyContent={"center"}
        alignContent={"center"}
        borderColor={carrier === id ? "brand.primary" : "light.200"}
        style={styles.shadow}
        w={170.38}
        h={136.97}
      >
        <Box alignItems={"center"}>
          <Box>
            <Image
              rounded={"full"}
              w={55}
              h={55}
              source={{ uri: image }}
              alt="career_image"
            />
          </Box>
          <Box mt={3} mb={2}>
            <Text fontSize={13} noOfLines={2} textAlign={"center"}>
              {name}
            </Text>
          </Box>
        </Box>
      </HStack>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: "white",
    elevation: 15,
    shadowColor: "rgba(48,110,237,.7)",
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 5,
  },
});
