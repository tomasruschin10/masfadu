import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CheckIcon,
  Checkbox,
  FormControl,
  HStack,
  Modal,
  Input,
  ScrollView,
  Select,
  Text,
  TextArea,
  VStack,
} from "native-base";
import {
  FontAwesome5,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  TouchableOpacity,
  Keyboard,
  View,
  Modal as RNModal,
} from "react-native";
import { useDispatch } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { SwipeablePanel } from "rn-swipeable-panel";

import Container from "../../components/Container";
import { updateMessage } from "../../redux/actions/message";
import { store } from "../../redux/store";

import Layout from "../../utils/LayoutHeader&BottomTab";
import RecommendedTags from "../../utils/RecommendedTags";
import { getServices, postServices } from "../../utils/hooks/services";
import { baseApi } from "../../utils/api";
import { DiscardDraftModal } from "../AboutSubject/Modals";
import { fontStyles } from "../../utils/colors/fontColors";

function CreateNewThread({ route, navigation }) {
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [showModalIcon, setShowModalIcon] = useState(false);
  const [allTags, setAllTags] = useState([{}]);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [showSelectSubject, setShowSelectSubject] = useState(false);
  const [showSelectProfessor, setShowSelectProfessor] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const state: any = store.getState();
  const [selectedCareerId, setSelectedCareerId] = useState(
    state.user.userdata.career_id
  );

  const [subjects, setSubjects] = useState([]);

  if (route.params && route.params?.career_id) {
    setSelectedCareerId(route.params.career_id);
  }

  const handleSubjectChange = (itemValue) => {
    setSelectedSubject(itemValue);
    setForm({ ...form, subject_id: itemValue });
  };

  const [form, setForm] = useState<any>({
    title: "",
    anonymous: 0,
    description: "",
    currentSchoolYear: "",
    subject_id: selectedSubject.id,
    tags: [],
    professor: "",
  });

  const dispatch = useDispatch();

  const goBack = () => {
    Keyboard.dismiss();
    setModalOpen(true);
  };

  const sendForm = () => {
    setLoading(true);
    postServices(`opinion/create`, form)
      .then(({ data }: any) => {
        dispatch(
          updateMessage({
            body: "Publicado correctamente",
            open: true,
            type: "success",
          })
        );
        setShowModal(false);

        navigation.navigate("SeeSubjectThread", {
          value: data?.value ? false : true,
          subject_id: data.subject.id,
          title: data.subject.name,
          description: data.description,
          currentSchoolYear: data.currentSchoolYear,
          time: data.subject.info,
          hours: "",
          method: "",
          id: data.id,
          rating: data.subject.opinionsCount,
        });
      })
      .catch(() => {
        setShowModal(false);
        setShowModalError(true);
        dispatch(
          updateMessage({
            body: "Hubo un error al intentar hacer la publicación :(",
            open: true,
            type: "danger",
          })
        );
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getServices("career/all")
      .then((res: any) => {
        setCareers(res.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    getServices("subject/career/" + selectedCareerId)
      .then(({ data }: any) => {
        setSubjects(data);
      })
      .catch(() => {});
  }, [selectedCareerId]);

  useEffect(() => {
    getServices("tag/all")
      .then(({ data }: any) => {
        setAllTags(data);
      })
      .catch(() => {});
  }, []);

  let FilterTags = () =>
    allTags.length > 0
      ? allTags.filter((it: any) =>
          it.name
            .toLowerCase()
            .includes(searchText.toLowerCase().replace("#", ""))
        )
      : [];

  const Concat = (it) => {
    const l = form.tags.concat([{ id: it.id, name: it.name }]);
    setForm({ ...form, tags: l });
  };

  const addNewTag = async () => {
    if (searchText.includes(" ") || searchText.length === 0) {
      dispatch(
        updateMessage({
          body: "Asegurate de no tener espacios en blanco",
          open: true,
          type: "warning",
        })
      );
      return false;
    }
    const state: any = store.getState();
    const authToken = state.token;
    baseApi
      .post(
        `tag/create`,
        { name: searchText },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        Concat(res.data);
        setSearchText("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTag = (_, i) => {
    form.tags.splice(i, 1);
    setForm({ ...form, tags: form.tags });
  };

  const calculateContainerHeight = (text: any) => {
    const baseHeight = 56;
    const lineHeight = 16;
    const charactersPerLine = 34;

    const numberOfLines = Math.ceil(text.length / charactersPerLine);
    return baseHeight + numberOfLines * lineHeight;
  };

  return (
    <Container>
      <Layout
        route={route}
        navigation={navigation}
        title={`Crear Hilo`}
        goBackFunction={() => goBack()}
      >
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraScrollHeight={30}
        >
          <Box mx={5} mt={3} borderTopWidth={1} borderTopColor={"#EBEEF2"}>
            <Text fontSize={15}>Información</Text>
          </Box>

          <Box
            mx="5"
            mt={2}
            borderBottomWidth={1}
            borderBottomColor={"#EBEEF2"}
            mb={5}
          >
            <TouchableOpacity
              disabled={subjects.length === 0}
              style={{
                width: "100%",
                backgroundColor: "#F7FAFC",
                paddingHorizontal: 10,
                height: 50,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onPress={() => setShowSelectSubject(true)}
            >
              {selectedSubject ? (
                <Text
                  bold={true}
                  numberOfLines={2}
                  style={[fontStyles.poppins400, { fontSize: 14 }]}
                  color={"#171717"}
                >
                  {selectedSubject.name}
                </Text>
              ) : (
                <Text
                  bold={true}
                  numberOfLines={2}
                  style={[fontStyles.poppins400, { fontSize: 14 }]}
                  color={"#C4C4C4"}
                >
                  Elegir Materia
                </Text>
              )}
              <Entypo name="chevron-down" size={25} color="#797979" />
            </TouchableOpacity>
          </Box>

          <VStack space={2} alignItems="flex-start">
            <RNModal
              visible={!!showSelectSubject}
              transparent
              children={
                <SwipeablePanel
                  style={{ height: 480 }}
                  closeOnTouchOutside
                  onClose={() => setShowSelectSubject(null)}
                  fullWidth
                  onlyLarge
                  isActive={!!showSelectSubject}
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
                      {subjects
                        .slice()
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((subject) => (
                          <TouchableOpacity
                            key={subject.id}
                            onPress={() => {
                              handleSubjectChange(subject);
                              setShowSelectSubject(false);
                            }}
                            style={{
                              paddingVertical: 10,
                              paddingRight: 27,
                              paddingLeft: 30,
                              backgroundColor:
                                subject === selectedSubject
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
                                    subject === selectedSubject
                                      ? "white"
                                      : "black",
                                },
                              ]}
                            >
                              {subject.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                    </View>
                  </ScrollView>
                </SwipeablePanel>
              }
            />
          </VStack>

          <Box
            mx="5"
            borderBottomWidth={1}
            borderBottomColor={"#EBEEF2"}
            mb={5}
          >
            <Input
              backgroundColor={"#F7FAFC"}
              onChangeText={(text) => setForm({ ...form, title: text })}
              placeholder="Ingresá un título"
              placeholderTextColor={"#C4C4C4"}
            />
          </Box>
          <Box
            mx="5"
            borderBottomWidth={1}
            borderBottomColor={"#EBEEF2"}
            mb={5}
          >
            <TextArea
              onChangeText={(text) => {
                setForm({ ...form, description: text });
              }}
              placeholder="Descripción"
              autoCompleteType={"off"}
              fontSize={15}
              h={120}
              backgroundColor={"#F7FAFC"}
              borderWidth={0}
              placeholderTextColor={"#C4C4C4"}
            />
          </Box>
          <Box
            mx="5"
            borderBottomWidth={1}
            borderBottomColor={"#EBEEF2"}
            mb={5}
          >
            <Input
              backgroundColor={"#F7FAFC"}
              onChangeText={(text) =>
                setForm({ ...form, currentSchoolYear: text })
              }
              placeholder="Año de cursada"
              placeholderTextColor={"#C4C4C4"}
            />
          </Box>

          <Box
            mx="5"
            borderBottomWidth={1}
            borderBottomColor={"#EBEEF2"}
            mb={5}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "#F7FAFC",
                paddingHorizontal: 10,
                height: 50,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              disabled={!selectedSubject}
              onPress={() => setShowSelectProfessor(true)}
            >
              {!selectedSubject ? (
                <Text
                  bold={true}
                  numberOfLines={2}
                  style={[fontStyles.poppins400, { fontSize: 14 }]}
                  color={"#C4C4C4"}
                >
                  Debes elegir una materia primero
                </Text>
              ) : selectedProfessor ? (
                <Text
                  bold={true}
                  numberOfLines={2}
                  style={[fontStyles.poppins400, { fontSize: 14 }]}
                  color={"#171717"}
                >
                  {selectedProfessor}
                </Text>
              ) : (
                <Text
                  bold={true}
                  numberOfLines={2}
                  style={[fontStyles.poppins400, { fontSize: 14 }]}
                  color={"#C4C4C4"}
                >
                  Elegir Cátedra
                </Text>
              )}
              <Entypo name="chevron-down" size={25} color="#797979" />
            </TouchableOpacity>
          </Box>
          <VStack space={2} alignItems="flex-start">
            <RNModal
              visible={!!showSelectProfessor}
              transparent
              children={
                <SwipeablePanel
                  style={{ height: 480 }}
                  closeOnTouchOutside
                  onClose={() => setShowSelectProfessor(null)}
                  fullWidth
                  onlyLarge
                  isActive={!!showSelectProfessor}
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
                      {subjects
                        .find((subject) => subject.id === selectedSubject?.id)
                        ?.chairs?.slice()
                        .sort((a, b) => a.localeCompare(b))
                        .map((chair, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              setSelectedProfessor(chair);
                              setShowSelectProfessor(null);
                            }}
                            style={{
                              paddingVertical: 10,
                              paddingRight: 27,
                              paddingLeft: 30,
                              backgroundColor:
                                chair === selectedProfessor
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
                                    chair === selectedProfessor
                                      ? "white"
                                      : "black",
                                },
                              ]}
                            >
                              {chair}
                            </Text>
                          </TouchableOpacity>
                        ))}
                    </View>
                  </ScrollView>
                </SwipeablePanel>
              }
            />
          </VStack>
          {/* <Box borderBottomWidth={1} borderBottomColor={"#EBEEF2"}>
            {allTags.length > 0 && (
              <>
                <RecommendedTags
                  searchText={searchText}
                  setSearchText={setSearchText}
                  FilterTags={FilterTags}
                  form={form}
                  Concat={Concat}
                />

                <Box
                  mx="5"
                  borderBottomWidth={1}
                  borderBottomColor={"#EBEEF2"}
                  mb={5}
                >
                  <Input
                    onChangeText={(text) => setSearchText(text)}
                    type={"text"}
                    value={searchText}
                    placeholder={"Agregá etiquetas"}
                    onFocus={FilterTags}
                    onBlur={() => setSearchText("")}
                    placeholderTextColor={"#C4C4C4"}
                    backgroundColor={"#F7FAFC"}
                    InputRightElement={
                      <TouchableOpacity
                        style={{ marginRight: 3 }}
                        onPress={addNewTag}
                      >
                        <Ionicons
                          name={"add-circle"}
                          size={28}
                          color={searchText ? "#DA673A" : "#797979"}
                        />
                      </TouchableOpacity>
                    }
                  />
                </Box>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <Box flexDir={"row"} mx="5" mb={form.tags.length > 0 ? 6 : 0}>
                    {form.tags.length > 0 &&
                      form.tags.map((it, i) => (
                        <Box key={i}>
                          <TouchableOpacity onPress={() => deleteTag(it, i)}>
                            <Text
                              key={i}
                              mr={2}
                              bg={"brand.primary"}
                              color={"white"}
                              py={1}
                              px={3}
                            >
                              {it.name}
                            </Text>
                          </TouchableOpacity>
                        </Box>
                      ))}
                  </Box>
                </ScrollView>
              </>
            )}
          </Box> */}
          {/* <HStack space={3} mx={6} my={5} alignItems={"center"}>
            {form.anonymous === 0 ? (
              <TouchableOpacity
                onPress={() => setForm({ ...form, anonymous: 1 })}
              >
                <MaterialCommunityIcons
                  name="checkbox-blank"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setForm({ ...form, anonymous: 0 })}
              >
                <MaterialCommunityIcons
                  name="checkbox-marked"
                  size={24}
                  color="blue"
                />
              </TouchableOpacity>
            )}
            <Text>Publicarlo de forma anónima</Text>
            <TouchableOpacity
              onPressIn={() => setShowModalIcon(true)}
              onPressOut={() => setShowModalIcon(false)}
            >
              <FontAwesome5 name="question-circle" size={15} color="#EEEEEE" />
            </TouchableOpacity>
          </HStack> */}

          <Box alignItems="center" mb={"32"}>
            <Button
              _pressed={{ bgColor: "rgba(218, 103, 58, .5)" }}
              _text={{ fontSize: 14, fontWeight: "600" }}
              bg={"#DA673A"}
              borderRadius={8}
              py={5}
              px={6}
              isDisabled={
                form.title.length === 0 ||
                form.description.length === 0 ||
                !selectedSubject
              }
              isLoading={loading}
              onPress={() => setShowModal(true)}
              w="90%"
              rounded={8}
            >
              Publicar
            </Button>
          </Box>

          <Modal
            isOpen={showModal}
            size={"xl"}
            onClose={() => setShowModal(false)}
            mt={5}
          >
            <Modal.Content>
              <Modal.Body alignItems={"center"}>
                <FormControl alignItems={"center"} mb={4}>
                  <AntDesign name="questioncircle" size={45} color="#DA673A" />
                </FormControl>
                <FormControl>
                  <Text fontSize={17} textAlign={"center"} fontWeight={700}>
                    ¿Deseas publicar?
                  </Text>
                </FormControl>
                <FormControl mb={6}>
                  <Text fontSize={15} textAlign={"center"}>
                    Genial! Vas a publicar un hilo nuevo!
                  </Text>
                </FormControl>

                <Button.Group
                  space={3}
                  direction="column"
                  textAlign="center"
                  w="full"
                  px={6}
                >
                  <Button
                    isLoading={loading}
                    _text={{ fontSize: 14, fontWeight: "600" }}
                    variant="outline"
                    colorScheme="gray"
                    onPress={() => {
                      setShowModal(false);
                    }}
                    borderRadius={8}
                    py={4}
                    px={6}
                  >
                    Cancelar
                  </Button>
                  <Button
                    isLoading={loading}
                    _pressed={{ bgColor: "rgba(218, 103, 58, .5)" }}
                    _text={{ fontSize: 14, fontWeight: "600" }}
                    bg={"#DA673A"}
                    onPress={sendForm}
                    borderRadius={8}
                    py={4}
                    px={6}
                  >
                    Publicar!
                  </Button>
                </Button.Group>
              </Modal.Body>
            </Modal.Content>
          </Modal>

          <Modal
            isOpen={showModalError}
            size={"xl"}
            onClose={() => setShowModalError(false)}
            mt={5}
          >
            <Modal.Content>
              <Modal.Body alignItems={"center"}>
                <FormControl alignItems={"center"}>
                  <Ionicons
                    name="close-circle-outline"
                    size={55}
                    color="#EC5F5F"
                  />
                </FormControl>
                <FormControl>
                  <Text fontSize={17} textAlign={"center"} fontWeight={700}>
                    Error!
                  </Text>
                </FormControl>
                <FormControl mb={8}>
                  <Text fontSize={15} textAlign={"center"}>
                    No se ha podido publicar!
                  </Text>
                </FormControl>

                <Button.Group space={2} w="full" px={6}>
                  <Button
                    w="full"
                    py={4}
                    _pressed={{ bgColor: "rgba(218, 103, 58, .5)" }}
                    _text={{ fontSize: 14, fontWeight: "600" }}
                    bg={"#DA673A"}
                    onPress={() => {
                      setShowModalError(false);
                    }}
                  >
                    Volver
                  </Button>
                </Button.Group>
              </Modal.Body>
            </Modal.Content>
          </Modal>

          <Modal
            isOpen={showModalIcon}
            size={"xs"}
            onClose={() => setShowModalIcon(false)}
            mt={5}
          >
            <Modal.Content>
              <Modal.Body alignItems={"center"}>
                <FormControl>
                  <Text fontSize={10} textAlign={"center"}>
                    Tu nombre/foto de perfil no será visible para los demás. Sin
                    embargo, tu identidad seguirá siendo visible para el equipo
                    de +Fadu.
                  </Text>
                </FormControl>
              </Modal.Body>
            </Modal.Content>
          </Modal>
        </KeyboardAwareScrollView>

        <DiscardDraftModal
          message={"¿Descartar Borrador? Vas a perder lo que escribiste"}
          isOpen={modalOpen}
          onConfirm={() => navigation.goBack()}
          onCancel={() => setModalOpen(false)}
          setOpen={setModalOpen}
        />
      </Layout>
    </Container>
  );
}

export default CreateNewThread;
