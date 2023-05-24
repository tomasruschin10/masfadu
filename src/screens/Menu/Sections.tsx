import { Box, Icon, IconButton, Text } from "native-base";
import { Image } from "react-native";
import { SvgXml } from "react-native-svg";

export default function Sections({ title, icon, comingSoon, navigation }) {
  //   console.log("🚀 ~ file: Sections.tsx:6 ~ Sections ~ icon:", icon);
  console.log("ddd ", icon);

  return (
    <Box flex={1} alignItems={"center"}>
      <Box>
        {comingSoon ? (
          <IconButton
            backgroundColor={"#9A9A9A"}
            w={20}
            h={20}
            borderRadius={40}
            icon={<Image source={icon} />}
          />
        ) : title == "" ? (
          <IconButton
            w={20}
            h={20}
            borderRadius={40}
            icon={<Image source={icon} />}
          />
        ) : (
          <IconButton
            onPress={() => navigation.navigate("Subsections", { title: title })}
            backgroundColor={"#1f1e25"}
            w={20}
            h={20}
            borderRadius={40}
            icon={<Image source={icon} />}
          />
        )}
        <Box
          position="absolute"
          backgroundColor="#64E889"
          rounded={"full"}
          bottom="30"
          left="0"
          right="0"
        >
          {comingSoon ? (
            <Text textAlign={"center"} fontSize={10}>
              Proximamente
            </Text>
          ) : (
            <Text display={"none"}></Text>
          )}
        </Box>
      </Box>

      <Box mt={0.5} mb={1} mx={3}>
        <Text
          fontSize={12}
          numberOfLines={2}
          textAlign={"center"}
          color={comingSoon ? "#d4fc39" : "#d4fc39"}
        >
          {title}
        </Text>
      </Box>
    </Box>
  );
}
