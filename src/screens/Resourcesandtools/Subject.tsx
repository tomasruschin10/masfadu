import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  ScrollView,
  Spinner,
  Text,
} from "native-base";
import React, { useEffect } from "react";
import { TouchableHighlight, TouchableOpacity, View } from "react-native";
import { SimpleAccordion } from "../../components/SimpleAccordion";
import Container from "../../components/Container";
import { getServices } from "../../utils/hooks/services";
import Layout from "../../utils/LayoutHeader&BottomTab";
import { Feather, AntDesign } from "@expo/vector-icons";
function Subjects({ route, navigation }) {
  const { viewName, id } = route.params;
  const [subjectCategory, setSubjectCategory] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    getServices("subject-category/all")
      .then(({ data }: any) => {
        setSubjectCategory(data.data.filter((it) => it.career_id == id));
      })
      .catch((error) => {
        __DEV__ &&
          console.log(
            "🚀 ~ file: On2Screen.tsx ~ line 21 ~ getServices ~ error",
            error
          );
      })
      .finally(() => setLoading(false));
  }, [setSubjectCategory]);

  const Communication = ({ item }) => {
    const { id, name } = item;
    return (
      <View
        style={{
          minHeight: 36,
          width: "100%",
          marginHorizontal: 6,
          marginTop: -10,
          //   backgroundColor: "red",
        }}
      >
        <Box
          minHeight={58}
          flexDirection={"row"}
          justifyContent={"space-between"}
          my="1"
          style={{
            backgroundColor: "#fff",
            marginBottom: 15,
            marginRight: 15,
            borderRadius: 8,
          }}
          //   borderBottomWidth={1}
          //   borderBottomColor={"#5c5353"}
        >
          <Box justifyContent={"center"} pl={4} width={"72%"}>
            <Text color={"#8b9399"} numberOfLines={4} fontSize={12}>
              {name}
            </Text>
          </Box>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SubjectContent", {
                viewName: viewName,
                name: name,
                subjectId: id,
              })
            }
          >
            <Box
              backgroundColor={"#ffffff"}
              style={{
                marginTop: 14,
                borderColor: "#c7cbce",
                borderWidth: 1,
                borderRadius: 2,
                padding: 2,
                marginRight: 80,
                height: 25,
                width: 70,
                marginLeft: 8,
              }}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text
                color={"#6e7981"}
                style={{ padding: 1, marginHorizontal: 8, fontWeight: "bold" }}
                fontSize={10}
              >
                Ver más
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
      </View>
    );
  };

  return (
    <Container>
      <Layout route={route} navigation={navigation} title={route.params.name}>
        <IconButton
          mt={-57}
          onPress={() =>
            navigation.navigate("SearchCourse", {
              title: "Info. Carrera " + route.params.name,
              url: route.params.description_url,
            })
          }
          ml={"auto"}
          mx={5}
          rounded={50}
          icon={<Icon name={"infocirlce"} as={AntDesign} />}
        />
        <ScrollView>
          {!loading ? (
            <Button display={"none"} />
          ) : (
            <HStack mb={3} space={2} justifyContent="center">
              <Spinner accessibilityLabel="Loading posts" />
              <Heading color="brand.primary" fontSize="md">
                Cargando
              </Heading>
            </HStack>
          )}
          <Box
            mt={4}
            mb={20}
            // borderColor={"#D5D5D5"}
            borderRadius={10}
            // borderWidth={1}
            mx={5}
            style={{}}
          >
            {subjectCategory.length > 0 &&
              subjectCategory.map((it, index) => (
                <SimpleAccordion
                  title={it.name}
                  key={it.id}
                  viewInside={
                    <Box
                      key={it.id}
                      // mx="2"
                      mt="2"
                      flexDir={"row"}
                      flexWrap={"wrap"}
                      justifyContent={"space-between"}
                    >
                      {it.subject.map((item) => (
                        <Communication key={item.id} item={item} />
                      ))}
                    </Box>
                  }
                  showContentInsideOfCard={false}
                  arrowColor="#3A71E1"
                  titleStyle={{
                    color: "#3A71E1",
                    fontWeight: "600",
                    fontFamily: "Poppins_400Regular",
                    fontSize: 17.61,
                  }}
                  bannerStyle={[
                    {
                      backgroundColor: "white",
                      borderBottomColor: "#D4D4D4",
                      borderBottomWidth: 1,
                      height: 60,
                      padding: 0,
                      marginLeft: 10,
                      marginRight: 10,
                    },
                    subjectCategory.length - 1 === index && {
                      borderBottomWidth: 0,
                    },
                  ]}
                />
              ))}
          </Box>

          {subjectCategory.length === 0 && !loading && (
            <Text
              mx="5"
              textAlign={"center"}
              color="#3A71E1"
              fontSize="2xl"
              fontFamily={"Manrope"}
            >
              Parece Que No Hay Elementos Para Mostrar
            </Text>
          )}
        </ScrollView>
      </Layout>
    </Container>
  );
}

export default Subjects;
