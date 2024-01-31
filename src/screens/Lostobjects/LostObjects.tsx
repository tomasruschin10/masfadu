import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  ScrollView,
  Spinner,
  Text,
} from "native-base";
import React, { useEffect, useState } from "react";
import { TouchableHighlight, Linking, StyleSheet } from "react-native";
import { getServices } from "../../utils/hooks/services";

export const Item = ({ id, name, image, description, idPress, setIdPress }) => (
  <Box mt={1} w={"50%"} mb="2">
    <TouchableHighlight
      underlayColor=""
      onPress={() => (id === idPress ? setIdPress(90000) : setIdPress(id))}
    >
      <Box
        shadow={"5"}
        style={styles.shadow}
        bgColor={"white"}
        rounded="md"
        mx="1.5"
      >
        <Image
          source={{ uri: image.url }}
          alt="Career_Image"
          mb={2}
          h={150}
          borderTopRadius={"md"}
        />
        <Text mx={2} textAlign={"center"} bold={true}>
          {name}
        </Text>
        <Text mx={2} textAlign={"center"} fontSize={12}>
          {id === idPress && description}
        </Text>
      </Box>
    </TouchableHighlight>
  </Box>
);

function LostObjects({ route, navigation }) {
  const [objects, setObjects] = useState([]);
  const [idPress, setIdPress] = useState(90000);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getServices("lost-object/all")
      .then((res: any) => {
        setObjects(res.data);
      })
      .catch((error) => {
        if (__DEV__) {
          console.log(error);
        }
      })
      .finally(() => setLoading(false));
  }, [setObjects]);

  return (
    <>
      <ScrollView>
        {!loading ? (
          <Button display={"none"} />
        ) : (
          <HStack space={2} justifyContent="center">
            <Spinner color="brand.primary" accessibilityLabel="Loading posts" />
            <Heading color="brand.primary" fontSize="md">
              Cargando
            </Heading>
          </HStack>
        )}
        <Box mt="2" mb={"48"}>
          <Box px="3" flexDir={"row"} flexWrap={"wrap"}>
            {objects.length > 0 &&
              objects.map((item) => (
                <Item
                  id={item.id}
                  key={item.id}
                  name={item.title}
                  description={item.description}
                  image={item.image}
                  idPress={idPress}
                  setIdPress={setIdPress}
                />
              ))}
          </Box>

          {objects.length === 0 && loading === false && (
            <Text
              mx={8}
              mt={4}
              fontWeight={"bold"}
              color={"brand.primary"}
              fontSize={20}
            >
              No hay objetos perdidos
            </Text>
          )}
        </Box>
      </ScrollView>

      <Box mt="7" position={"absolute"} bottom={32} alignSelf={"center"}>
        <Button
          rounded={"xl"}
          fontWeight="bold"
          onPress={() => Linking.openURL("mailto:hola@masfadu.com")}
          mx="5"
          py={3}
        >
          Reconocés o encontraste uno?
        </Button>
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: "white",
    elevation: 15,
    shadowColor: "rgba(48,110,237,.7)",
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 5,
    borderWidth: 2,
    borderColor: "rgba(242,242,242,.2)",
    borderRadius: 10,
  },
});

export default LostObjects;
