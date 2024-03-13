import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  ScrollView,
  Spinner,
  Text,
} from "native-base";

import { getServices } from "../../utils/hooks/services";
import { RenderOffer } from "../../utils/hooks/useMultiple";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Layout from "../../utils/LayoutHeader&BottomTab";
import { useDispatch, useSelector } from "react-redux";
import { updateModal } from "../../redux/actions/user";

function CoursesAndWorkshops({ route, navigation, mainTitle }) {
  const [courses, setCourses] = useState([]);
  const [advertisement, setAdvertisement] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const SLIDER_WIDTH = (Dimensions.get("window").width - 45) / 2;
  const [menuShow, setMenu] = useState(false);
  useEffect(() => {
    setLoading(true);

    getServices("offer/all/course")
      .then(({ data }: any) => {
        console.log("data <>", data);
        setCourses(data);
      })
      .catch((error) => {
        if (__DEV__) {
          console.log(error);
        }
      });
    getServices("advertisement/all/active?key=courses_workshops")
      .then(({ data }: any) => {
        setAdvertisement(data);
      })
      .catch((error) => {
        if (__DEV__) {
          console.log(error);
        }
      })
      .finally(() => setLoading(false));
  }, [setCourses]);

  const byWords = () => {
    setLoading(true);
    getServices(`offer/all/course?search=${searchText.trim()}`)
      .then(({ data }: any) => {
        setCourses(data);
        setSearchText("");
      })
      .catch((error) => {
        __DEV__ && console.log(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    byWords();
  }, [searchText]);

  const user = useSelector((state: any) => state.user.userdata);
    const dispatch = useDispatch()
    const handleNavigate = (route: string, additional?: any) => {
      if (user?.userRole[0]?.role?.name === "Visit") {
        dispatch(updateModal(true))
        return
      }
      navigation.navigate(route, additional)
    }

  return (
    <Layout
      route={route}
      navigation={navigation}
      title="Cursos & Workshops"
      addButtonUrl={"CoursesForm"}
    >
      <ScrollView keyboardShouldPersistTaps={"handled"}>
        <Box>
          <Box
            mx="5"
            alignItems={"center"}
            justifyContent="center"
            flexDir={"row"}
          >
            <MaterialIcons
              name={"search"}
              size={17}
              color="gray"
              style={{ position: "absolute", left: "3%", zIndex: 1 }}
            />
            <Input
              rounded={8}
              style={{ marginLeft: "8%" }}
              fontSize={12.27}
              onChangeText={(text) => setSearchText(text)}
              w={{ base: "87%", md: "25%" }}
              pb="1"
              type={"text"}
              placeholder={"Buscar"}
              placeholderTextColor="#666666"
              mr="2"
            />

            <HStack alignItems={"flex-start"}>
              <IconButton
                rounded={8}
                backgroundColor={"#fff"}
                icon={
                  <Icon
                    as={AntDesign}
                    name="close"
                    size="md"
                    color={"muted.400"}
                  />
                }
              />
            </HStack>
          </Box>

          {!loading ? (
            <Button display={"none"} />
          ) : (
            <HStack mt={2} space={2} justifyContent="center">
              <Spinner
                color="brand.primary"
                accessibilityLabel="Loading posts"
              />
              <Heading color="brand.primary" fontSize="md">
                Cargando
              </Heading>
            </HStack>
          )}

          {courses.length === 0 && !loading && (
            <Text
              mx={8}
              mt={4}
              fontWeight={"bold"}
              color={"brand.primary"}
              fontSize={20}
            >
              No hay Workshops
            </Text>
          )}

          <Box mt="5" mb={24}>
            {courses.length > 0 &&
              courses.map((item) => (
                <RenderOffer
                  key={item.id}
                  image={item.image.url}
                  title={item.title}
                  text={item.description}
                  url={item.url}
                  time={item.partner}
                  name={item.name}
                  hours={""}
                  method={""}
                  rating={item.point}
                  navigation={navigation}
                  mainTitle={mainTitle}
                  buttonValue={"Quiero hacerlo!"}
                  redirect_to={"Anoffer"}
                  border={false}
                  subject_id={0}
                  id={item.id}
                  firstLetter={item.title.toString().substring(0, 1)}
                />
              ))}
          </Box>
        </Box>
      </ScrollView>
    </Layout>
  );
}

export default CoursesAndWorkshops;
