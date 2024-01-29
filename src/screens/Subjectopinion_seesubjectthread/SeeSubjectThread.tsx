import React, { useEffect, useRef, useState } from "react";
import { Ionicons, Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";

import { Animated, TouchableHighlight, TouchableOpacity } from "react-native";
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
import BottomTab from "../../components/BottomTab";
import Container from "../../components/Container";
import SeeSubjectThread_Item from "./SeeSubjectThread_Item";
import SeeSubjectThread_Top from "./SeeSubjectThread_Top";
import RecommendedTags from "../../utils/RecommendedTags";
import { HeaderBack } from "../../components/Header";
import { getServices } from "../../utils/hooks/services";
import { updateMessage } from "../../redux/actions/message";
import { useDispatch } from "react-redux";
import Menu from "../Menu/Menu";

function SeeSubjectThread({ route, navigation }) {
  const {
    title,
    description,
    time,
    hours,
    method,
    subject_id,
    id,
    value,
    rating,
    color,
    firstLetter,
  } = route.params;
  const [menuShow, setMenu] = useState(false);
  const [allOpinions, setAllOpinions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [length, setLength] = useState(rating);
  const [allTags, setAllTags] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [limit, setLimit] = useState(0);
  const [changeFilt, setChangeFilt] = useState(true);
  const [form, setForm] = useState<any>({ tags: [] });
  const dispatch = useDispatch();

  const [filteredOpinions, setFilteredOpinions] = useState(allOpinions);

  const handleSearch = (text) => {
    setSearchText(text);

    if (text.trim() === "") {
      setFilteredOpinions(allOpinions);
    } else {
      const filtered = allOpinions.filter(
        (opinion) =>
          (opinion.title &&
            opinion.title.toLowerCase().includes(text.toLowerCase())) ||
          (opinion.description &&
            opinion.description.toLowerCase().includes(text.toLowerCase())) ||
          (opinion.professor &&
            opinion.professor.toLowerCase().includes(text.toLowerCase())) ||
          (opinion.tags &&
            opinion.tags.some(
              (tag) => tag && tag.toLowerCase().includes(text.toLowerCase())
            ))
      );
      setFilteredOpinions(filtered);
    }
  };
  useEffect(() => {
    setFilteredOpinions(allOpinions);
  }, []);

  useEffect(() => {
    console.log("filtro actual", changeFilt);
  }, [changeFilt]);

  useEffect(() => {
    changeFilt === false && byWords();
  }, [searchText]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () =>
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  const fadeOut = () =>
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

  // USEEFFECT
  useEffect(() => {
    !toggle ? fadeOut() : setTimeout(() => fadeIn(), 200);
  }, [toggle]);

  useEffect(() => {
    getData();
  }, [reload, value]);
  const getData = async () => {
    setLoading(true);
    setLimit(0);
    console.log(subject_id);
    getServices(`opinion/all?offset=0&limit=10&subject_id=${subject_id}`)
      .then(({ data }: any) => {
        setAllOpinions(data);
      })
      .catch((error) => {
        __DEV__ &&
          console.log("🚀 ~ file: SeeSubjectThread getServices:", error);
      });

    getServices("tag/all")
      .then(({ data }: any) => {
        setAllTags(data);
      })
      .catch((error) => {
        __DEV__ &&
          console.log("🚀 ~ file: SeeSubjectThread getServices:", error);
      })
      .finally(() => setLoading(false));
  };

  // FUNCTIONS
  const CallBackByTags = (arr) => {
    getServices(
      `opinion/all?subject_id=${subject_id}&${arr
        .map((el) => "tags[]=" + el.id + "&")
        .join()
        .replace(/,/g, "")}`
    )
      .then(({ data }: any) => {
        setLength(-100000);
        setAllOpinions(data);
      })
      .catch((error) => {
        __DEV__ &&
          console.log("🚀 ~ file: SeeSubjectThread getServices:", error);
      })
      .finally(() => setLoading(false));
  };

  const moreThreads = () => {
    setLoading(true);
    getServices(
      `opinion/all?offset=${limit + 10}&limit=10&subject_id=${subject_id}`
    )
      .then(({ data }: any) => {
        setAllOpinions(allOpinions.concat(data));
        setLimit(limit + 10);
      })
      .catch((error) => {
        __DEV__ &&
          console.log("🚀 ~ file: SeeSubjectThread getServices:", error);
      })
      .finally(() => setLoading(false));
  };

  const FilterTags = () =>
    allTags.length > 0
      ? allTags.filter((it) =>
          it.name
            .toLowerCase()
            .includes(searchText.toLowerCase().replace("#", ""))
        )
      : [];

  const byTags = () => {
    if (form.tags.length === 0) {
      dispatch(
        updateMessage({
          body: "Asegurate de haber elegido una etiqueta por favor.",
          open: true,
          type: "danger",
        })
      );
      /* showAlert('error', 'Asegurate de haber elegido una etiqueta por favor.') */
      return false;
    }
    setLoading(true);
    getServices(
      `opinion/all?subject_id=${subject_id}&${form.tags
        .map((el) => "tags[]=" + el.id + "&")
        .join()
        .replace(/,/g, "")}`
    )
      .then(({ data }: any) => {
        setForm({ ...form, tags: [] });
        setLength(-100000);
        setSearchText("");
        setAllOpinions(data);
      })
      .catch((error) => {
        __DEV__ &&
          console.log("🚀 ~ file: SeeSubjectThread getServices:", error);
      })
      .finally(() => setLoading(false));
  };

  const byWords = () => {
    setLoading(true);
    getServices(
      `opinion/all?subject_id=${subject_id}&search=${searchText
        .replace("#", "")
        .trim()}`
    )
      .then(({ data }: any) => {
        setAllOpinions(data);
        setLength(-100000);
      })
      .catch((error) => {
        __DEV__ &&
          console.log("🚀 ~ file: SeeSubjectThread getServices:", error);
      })
      .finally(() => setLoading(false));
  };

  const Concat = (it) => {
    const l = form.tags.concat([{ id: it.id, name: it.name }]);
    setForm({ ...form, tags: l });
    setLoading(true);
    CallBackByTags(l);
  };

  const deleteTag = (_, i) => {
    form.tags.splice(i, 1);
    setForm({ ...form, tags: form.tags });
    setLoading(true);
    if (form.tags.length > 0) CallBackByTags(form.tags);
    else {
      setLimit(0);
      console.log(subject_id);
      getServices(`opinion/all?offset=0&limit=10&subject_id=${subject_id}`)
        .then(({ data }: any) => {
          setAllOpinions(data);
        })
        .catch((error) => {
          __DEV__ &&
            console.log("🚀 ~ file: SeeSubjectThread getServices:", error);
        })
        .finally(() => setLoading(false));
      setLength(rating);
    }
  };

  const search = () => {
    changeFilt ? byTags() : byWords();
  };

  //JSX
  return (
    <Container>
      {menuShow ? (
        <Menu navigation={navigation} route={route} setMenu={setMenu} />
      ) : null}

      <HeaderBack title="Opiniones de materias" />

      <ScrollView keyboardShouldPersistTaps={"handled"}>
        <Box mx={0}>
          {allOpinions.length > 0 && (
            <>
              <HStack
                mt={0}
                pr={3}
                alignItems={"center"}
                justifyContent="center"
              >
                <MaterialIcons
                  name={"search"}
                  size={17}
                  color="gray"
                  style={{
                    position: "absolute",
                    left: "8.8%",
                    zIndex: 1,
                    marginRight: 4,
                  }}
                />
                <Input
                  style={{ marginLeft: "8%", borderRadius: 8 }}
                  onChangeText={(text) => handleSearch(text)}
                  value={searchText}
                  rounded={8}
                  w={{ base: "80%", md: "25%" }}
                  pb="1"
                  type={"text"}
                  ml={4}
                  placeholder="Buscar "
                  placeholderTextColor="#666666"
                />

                <IconButton
                  onPress={() => {
                    handleSearch("");
                  }}
                  rounded={8}
                  ml={1}
                  backgroundColor={"#FFFFFF"}
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
            </>
          )}
        </Box>

        {!loading ? (
          <Button display={"none"} />
        ) : (
          <HStack mt={3} mb={2} space={2} justifyContent="center">
            <Spinner color="brand.primary" accessibilityLabel="Loading posts" />
            <Heading color="brand.primary" fontSize="md">
              Cargando
            </Heading>
          </HStack>
        )}
        {allOpinions.length === 0 && !loading && (
          <Text
            mx={8}
            mt={4}
            fontWeight={"bold"}
            color={"brand.primary"}
            fontSize={20}
          >
            No hay hilos para mostrar
          </Text>
        )}
        <Box mx={5} mb={32}>
          {allOpinions.length > 0 && (
            <>
              <Box mt={4} mb={3} bg={"#F4F6F9"} py="3" rounded={8}>
                <Text
                  fontWeight={"500"}
                  flex={1}
                  fontSize={17.52}
                  color="black"
                  px="4"
                >
                  Hilos sobre:
                </Text>
                <Text
                  fontWeight={"500"}
                  flex={1}
                  fontSize={14}
                  color="brand.primary"
                  px="4"
                >
                  {title}
                </Text>
              </Box>

              {filteredOpinions.length > 0
                ? filteredOpinions.map((item) => (
                    <SeeSubjectThread_Item
                      key={item.id}
                      idOpinion={item.id}
                      navigation={navigation}
                      title={item.title}
                      description={item.description}
                      created_at={item.created_at}
                      opinionTags={item.opinionTags}
                      anonymous={item.anonymous}
                      student={item.student}
                      answersCount={item.answersCount}
                      tags={item.opinionTags}
                      professor={item.professor}
                    />
                  ))
                : allOpinions.map((item) => (
                    <SeeSubjectThread_Item
                      key={item.id}
                      idOpinion={item.id}
                      navigation={navigation}
                      title={item.title}
                      description={item.description}
                      created_at={item.created_at}
                      opinionTags={item.opinionTags}
                      anonymous={item.anonymous}
                      student={item.student}
                      answersCount={item.answersCount}
                      tags={item.opinionTags}
                      professor={item.professor}
                    />
                  ))}
            </>
          )}

          {length > 0 && length > limit + 10 && (
            <Box mt={3} mx={8} alignItems={"center"}>
              <Button
                onPress={moreThreads}
                _text={{ fontWeight: "bold", color: "white" }}
                isLoading={loading}
              >
                Ver más
              </Button>
            </Box>
          )}
        </Box>
      </ScrollView>

      <BottomTab setMenu={setMenu} route={route} navigation={navigation} />
    </Container>
  );
}

export default SeeSubjectThread;
