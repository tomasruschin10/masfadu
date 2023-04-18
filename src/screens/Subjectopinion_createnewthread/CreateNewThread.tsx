import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  HStack,
  Icon,
  Input,
  Modal,
  ScrollView,
  Text,
  TextArea,
} from "native-base";
import Container from "../../components/Container";
import Layout from "../../utils/LayoutHeader&BottomTab";
import { FontAwesome5, Ionicons, AntDesign } from "@expo/vector-icons";
import { getServices, postServices } from "../../utils/hooks/services";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { updateMessage } from "../../redux/actions/message";
import { useEffect } from "react";
import RecommendedTags from "../../utils/RecommendedTags";

function CreateNewThread({ route, navigation }) {
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [showModalIcon, setShowModalIcon] = useState(false);

  const [allTags, setAllTags] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const {
    subject_id,
    title,
    description,
    time,
    hours,
    method,
    id,
    rating,
    value,
  } = route.params;

  const [form, setForm] = useState<any>({
    title: "",
    anonymous: 0,
    description: "",
    subject_id: parseInt(subject_id),
    tags: [],
    professor: "",
  });
  const dispatch = useDispatch();

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
        navigation.goBack();
        // navigation.navigate('SeeSubjectThread', {
        //   value: value ? false : true,
        //   subject_id: subject_id,
        //   title: title,
        //   description: description,
        //   time: time,
        //   hours: hours,
        //   method: method,
        //   id: id,
        //   rating: rating
        // })
      })
      .catch(() => {
        setShowModal(false);
        setShowModalError(true);
        dispatch(
          updateMessage({
            body: "Hubo un error al intentar hacer la publicación",
            open: true,
            type: "danger",
          })
        );
      })
      .finally(() => setLoading(false));
  };

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

  const addNewTag = () => {
    if (searchText.includes(" ") || searchText.length === 0) {
      dispatch(
        updateMessage({
          body: "Asegurate de no tener espacios en blanco",
          open: true,
          type: "danger",
        })
      );
      return false;
    }
    let r = form.tags.filter((tags) => tags.name === searchText);
    if (r.length === 0) {
      const l = form.tags.concat([{ name: searchText.trim(), id: null }]);
      setForm({ ...form, tags: l });
    }
  };

  const Concat = (it) => {
    const l = form.tags.concat([{ id: it.id, name: it.name }]);
    setForm({ ...form, tags: l });
  };

  const deleteTag = (_, i) => {
    form.tags.splice(i, 1);
    setForm({ ...form, tags: form.tags });
  };

  return (
    <Container>
      <Layout
        route={route}
        navigation={navigation}
        title={`Crear Hilo ${title}`}
      >
        <ScrollView
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps={"handled"}
        >
          <Box
            mx={5}
            mt={5}
            borderTopWidth={1}
            borderTopColor={"#EBEEF2"}
            pt={6}
          >
            <Text fontSize={15}>Información</Text>
          </Box>

          <Box>
            <Box
              mx="5"
              borderBottomWidth={1}
              borderBottomColor={"#EBEEF2"}
              pt={2}
              pb={"24"}
            >
              <Input
                backgroundColor={"#F7FAFC"}
                onChangeText={(text) => setForm({ ...form, title: text })}
                mb={4}
                placeholder="Ingresá un titulo"
                placeholderTextColor={"#C4C4C4"}
              />

              <TextArea
                onChangeText={(text) => setForm({ ...form, description: text })}
                placeholder="Descripción"
                autoCompleteType={"off"}
                fontSize={15}
                h={67}
                backgroundColor={"#F7FAFC"}
                borderWidth={0}
                placeholderTextColor={"#C4C4C4"}
                mb={2}
              />

              {allTags.length > 0 && (
                <>
                  <RecommendedTags
                    searchText={searchText}
                    FilterTags={FilterTags}
                    form={form}
                    Concat={Concat}
                  />

                  <Box
                    mb={searchText !== "" ? 2 : 2}
                    alignItems={"center"}
                    justifyContent="center"
                    flexDir={"row"}
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
                        <Icon
                          as={
                            <Ionicons onPress={addNewTag} name={"add-circle"} />
                          }
                          size={6}
                          mr="3"
                          color="muted.300"
                        />
                      }
                    />
                  </Box>

                  <Box flexDir={"row"} mb={form.tags.length > 0 ? 6 : 0}>
                    {form.tags.length > 0 &&
                      form.tags.map((it, i) => (
                        <Box key={i}>
                          <TouchableOpacity onPress={() => deleteTag(it, i)}>
                            <Text
                              key={i}
                              mr={2}
                              bg={"primary.100"}
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
                </>
              )}

              <Input
                backgroundColor={"#F7FAFC"}
                placeholder="Agregá la cátedra"
                placeholderTextColor={"#C4C4C4"}
                onChangeText={(text) => setForm({ ...form, professor: text })}
              />
            </Box>

            <HStack space={3} mx={6} my={5} alignItems={"center"}>
              <Checkbox
                onChange={(boolean) =>
                  setForm({ ...form, anonymous: boolean ? 1 : 0 })
                }
                value="test"
                accessibilityLabel="checkbox"
              />
              <Text>Publicarlo de forma anónima</Text>
              <TouchableOpacity
                onPressIn={() => setShowModalIcon(true)}
                onPressOut={() => setShowModalIcon(false)}
              >
                <FontAwesome5
                  name="question-circle"
                  size={15}
                  color="#EEEEEE"
                />
              </TouchableOpacity>
            </HStack>

            <Box alignItems="center" mb={"32"}>
              <Button
                isDisabled={form.title && form.description ? false : true}
                isLoading={loading}
                onPress={() => setShowModal(true)}
                w="90%"
                py={5}
                backgroundColor="blue.500"
                rounded={"2xl"}
              >
                Publicar
              </Button>
            </Box>

            {/* MODALS */}
            <Modal
              isOpen={showModal}
              size={"xl"}
              onClose={() => setShowModal(false)}
              mt={5}
            >
              <Modal.Content>
                <Modal.Body alignItems={"center"}>
                  <FormControl alignItems={"center"}>
                    <AntDesign
                      name="questioncircle"
                      size={45}
                      color="#3A71E1"
                    />
                  </FormControl>
                  <FormControl>
                    <Text fontSize={17} textAlign={"center"} fontWeight={700}>
                      ¿Deseas publicar?
                    </Text>
                  </FormControl>
                  <FormControl mb={8}>
                    <Text fontSize={15} textAlign={"center"}>
                      Genial! Vas a publicar un hilo nuevo!
                    </Text>
                  </FormControl>

                  <Button.Group space={2}>
                    <Button
                      isLoading={loading}
                      _text={{ fontSize: 10.65 }}
                      bg={"red.400"}
                      onPress={() => {
                        setShowModal(false);
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      isLoading={loading}
                      _text={{ fontSize: 10.65 }}
                      bg={"#2972FE"}
                      onPress={sendForm}
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

                  <Button.Group space={2}>
                    <Button
                      _text={{ fontSize: 10.65 }}
                      bg={"#2972FE"}
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
                      Tu nombre/foto de perfil no será visible para los demás.
                      Sin embargo, tu identidad seguirá siendo visible para el
                      equipo de +Fadu.
                    </Text>
                  </FormControl>
                </Modal.Body>
              </Modal.Content>
            </Modal>
          </Box>
        </ScrollView>
      </Layout>
    </Container>
  );
}

export default CreateNewThread;
