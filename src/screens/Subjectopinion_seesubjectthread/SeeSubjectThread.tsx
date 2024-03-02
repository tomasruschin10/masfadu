import React, { useEffect, useRef, useState, useCallback } from "react";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import {
  Animated,
  Modal,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  VStack,
  Input,
  Spinner,
  Text,
} from "native-base";
import { SwipeablePanel } from "rn-swipeable-panel";
import { Entypo } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { AirbnbRating } from "react-native-ratings";

import BottomTab from "../../components/BottomTab";
import Container from "../../components/Container";
import SeeSubjectThread_Item from "./SeeSubjectThread_Item";

import { HeaderBack } from "../../components/Header";
import { getServices } from "../../utils/hooks/services";
import { updateMessage } from "../../redux/actions/message";
import { fontStyles } from "../../utils/colors/fontColors";

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
  const [chairs, setChairs] = useState(null);
  const [showChairsFilters, setShowChairsFilters] = useState(false);
  const [showRatings, setShowRatings] = useState(false);
  const [selectedChair, setSelectedChair] = useState();
  const [subjects, setSubjects] = useState([]);
  const [changeFilt, setChangeFilt] = useState(true);
  const [form, setForm] = useState<any>({ tags: [] });
  const dispatch = useDispatch();
  const [ratings, setRatings] = useState({
    averagePracticalJobs: 0,
    averageQualityOfTeachers: 0,
    averageRequirement: 0,
    averageCost: 0,
  });

  const [filteredOpinions, setFilteredOpinions] = useState(allOpinions);

  useFocusEffect(
    useCallback(() => {
      try {
        const chairs = [
          ...new Set(allOpinions.map((opinion) => opinion.professor)),
        ];
        if (chairs.length > 0 && chairs[0] !== "") {
          setChairs(chairs);
        }
      } catch (error) {
        console.error("Error al obtener cátedras", error);
      }
    }, [allOpinions])
  );

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

  const handleFilterByProfessor = (text) => {
    setSelectedChair(text);
    setShowChairsFilters(false);

    if (text.trim() === "") {
      setFilteredOpinions(allOpinions);
    } else {
      const filtered = allOpinions.filter(
        (opinion) =>
          opinion.professor &&
          opinion.professor.toLowerCase().includes(text.toLowerCase())
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
    getServices(`opinion/all?offset=0&limit=10&subject_id=${subject_id}`)
      .then(({ data }: any) => {
        setAllOpinions(data);
      })
      .catch((error) => {
        __DEV__ && console.log(error);
      });

    getServices("tag/all")
      .then(({ data }: any) => {
        setAllTags(data);
      })
      .catch((error) => {
        __DEV__ && console.log(error);
      })
      .finally(() => setLoading(false));

    getServices(`subject/${id}`)
      .then(({ data }: any) => {
        setSubjects(data.userSubject);
      })
      .catch((error) => {
        __DEV__ && console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const calculateAverages = (subjectRatings, selectedChair) => {
    const filteredRatings = subjectRatings.filter(
      (rating) =>
        rating.practicalJobs !== null &&
        rating.qualityOfTeachers !== null &&
        rating.requirement !== null &&
        rating.cost !== null &&
        rating.chair === selectedChair
    );

    const sumPracticalJobs = filteredRatings.reduce(
      (sum, rating) => sum + rating.practicalJobs,
      0
    );
    const sumQualityOfTeachers = filteredRatings.reduce(
      (sum, rating) => sum + rating.qualityOfTeachers,
      0
    );
    const sumRequirement = filteredRatings.reduce(
      (sum, rating) => sum + rating.requirement,
      0
    );
    const sumCost = filteredRatings.reduce(
      (sum, rating) => sum + rating.cost,
      0
    );

    const averagePracticalJobs =
      Math.round(sumPracticalJobs / filteredRatings.length) || 0;
    const averageQualityOfTeachers =
      Math.round(sumQualityOfTeachers / filteredRatings.length) || 0;
    const averageRequirement =
      Math.round(sumRequirement / filteredRatings.length) || 0;
    const averageCost = Math.round(sumCost / filteredRatings.length) || 0;

    setRatings({
      averagePracticalJobs,
      averageQualityOfTeachers,
      averageRequirement,
      averageCost,
    });
  };

  useEffect(() => {
    calculateAverages(subjects, selectedChair);
  }, [subjects, selectedChair]);

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
        __DEV__ && console.log(error);
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
        __DEV__ && console.log(error);
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
        __DEV__ && console.log(error);
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
        __DEV__ && console.log(error);
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
      getServices(`opinion/all?offset=0&limit=10&subject_id=${subject_id}`)
        .then(({ data }: any) => {
          setAllOpinions(data);
        })
        .catch((error) => {
          __DEV__ && console.log(error);
        })
        .finally(() => setLoading(false));
      setLength(rating);
    }
  };

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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 5,
                }}
              >
                <TouchableOpacity
                  disabled={!chairs}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#F4F6F9",
                    width: "77%",
                    paddingHorizontal: 10,
                    marginBottom: 10,
                    height: 60,
                    borderRadius: 8,
                  }}
                  onPress={() => setShowChairsFilters(true)}
                >
                  {selectedChair ? (
                    <>
                      <Text
                        bold={true}
                        numberOfLines={2}
                        style={[fontStyles.poppins400, { fontSize: 16 }]}
                        color={"brand.primary"}
                      >
                        {selectedChair}
                      </Text>
                      <TouchableOpacity
                        onPress={() => handleFilterByProfessor("")}
                      >
                        <Ionicons name="close" size={24} color="#9A9A9A" />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <Text
                        bold={true}
                        numberOfLines={2}
                        style={[fontStyles.poppins400, { fontSize: 14 }]}
                        color={"#9A9A9A"}
                      >
                        Elegir cátedra
                      </Text>
                      <Entypo name="chevron-down" size={25} color="#9A9A9A" />
                    </>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={!chairs}
                  onPress={() => setShowRatings(!showRatings)}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: showRatings ? "#E85E29" : "#F4F6F9",
                    width: "20%",
                    height: 60,
                    borderRadius: 4,
                  }}
                >
                  {showRatings ? (
                    <AntDesign name="star" size={24} color="white" />
                  ) : (
                    <AntDesign name="staro" size={24} color="#9A9A9A" />
                  )}
                </TouchableOpacity>
              </View>

              {showRatings &&
                (selectedChair ? (
                  ratings.averagePracticalJobs !== 0 &&
                  ratings.averageQualityOfTeachers !== 0 &&
                  ratings.averageRequirement !== 0 &&
                  ratings.averageCost !== 0 ? (
                    <View
                      style={{
                        width: "100%",
                        backgroundColor: "#F4F6F9",
                        marginBottom: 20,
                        padding: 15,
                        borderRadius: 4,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          color={"brand.primary"}
                          style={[fontStyles.poppins400, { fontSize: 15 }]}
                        >
                          Profesores
                        </Text>
                        <AirbnbRating
                          showRating={false}
                          isDisabled
                          size={25}
                          selectedColor={"#E85E29"}
                          defaultRating={ratings?.averageQualityOfTeachers}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          color={"brand.primary"}
                          style={[fontStyles.poppins400, { fontSize: 15 }]}
                        >
                          TPS
                        </Text>
                        <AirbnbRating
                          showRating={false}
                          isDisabled
                          size={25}
                          selectedColor={"#E85E29"}
                          defaultRating={ratings?.averagePracticalJobs}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          color={"brand.primary"}
                          style={[fontStyles.poppins400, { fontSize: 15 }]}
                        >
                          Exigencia
                        </Text>
                        <AirbnbRating
                          showRating={false}
                          isDisabled
                          size={25}
                          selectedColor={"#E85E29"}
                          defaultRating={ratings?.averageRequirement}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          color={"brand.primary"}
                          style={[fontStyles.poppins400, { fontSize: 15 }]}
                        >
                          Costo
                        </Text>
                        <AirbnbRating
                          showRating={false}
                          isDisabled
                          size={25}
                          selectedColor={"#E85E29"}
                          defaultRating={ratings.averageCost}
                        />
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        width: "100%",
                        backgroundColor: "#F4F6F9",
                        alignItems: "center",
                        marginBottom: 20,
                        padding: 15,
                        borderRadius: 4,
                      }}
                    >
                      <Text
                        color={"brand.primary"}
                        style={[fontStyles.poppins400, { fontSize: 15 }]}
                      >
                        Datos insuficientes
                      </Text>
                    </View>
                  )
                ) : (
                  <View
                    style={{
                      width: "100%",
                      backgroundColor: "#F4F6F9",
                      alignItems: "center",
                      marginBottom: 20,
                      padding: 15,
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      color={"brand.primary"}
                      style={[fontStyles.poppins400, { fontSize: 15 }]}
                    >
                      Elegí una cátedra primero
                    </Text>
                  </View>
                ))}

              <VStack space={2} alignItems="flex-start">
                <Modal
                  visible={!!showChairsFilters}
                  transparent
                  children={
                    <SwipeablePanel
                      style={{ height: 480 }}
                      closeOnTouchOutside
                      onClose={() => setShowChairsFilters(false)}
                      fullWidth
                      onlyLarge
                      isActive={!!showChairsFilters}
                    >
                      <ScrollView>
                        <View
                          style={{
                            paddingVertical: 27,
                            paddingBottom: 54,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                          }}
                        >
                          {chairs &&
                            chairs.map((item, index) => (
                              <TouchableOpacity
                                key={index}
                                onPress={() => {
                                  handleFilterByProfessor(item);
                                  setShowChairsFilters(false);
                                }}
                                style={{
                                  paddingRight: 27,
                                  paddingLeft: 30,
                                  paddingVertical: 10,
                                  backgroundColor:
                                    item === selectedChair
                                      ? "#DA673A"
                                      : "transparent",
                                }}
                              >
                                <Text
                                  style={[
                                    fontStyles.poppins400,
                                    {
                                      fontSize: 16,
                                      color:
                                        item === selectedChair
                                          ? "white"
                                          : "black",
                                    },
                                  ]}
                                >
                                  {item}
                                </Text>
                              </TouchableOpacity>
                            ))}
                        </View>
                      </ScrollView>
                    </SwipeablePanel>
                  }
                />
              </VStack>
              {filteredOpinions.length > 0
                ? filteredOpinions.map((item) => (
                    <SeeSubjectThread_Item
                      key={item.id}
                      idOpinion={item.id}
                      navigation={navigation}
                      title={item.title}
                      description={item.description}
                      currentSchoolYear={item.currentSchoolYear}
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
                      currentSchoolYear={item.currentSchoolYear}
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
