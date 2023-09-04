 import React, { useState } from 'react'
import { Box, Button, CheckIcon, Checkbox, FormControl, HStack, Icon, Input, Modal, ScrollView, Select, Text, TextArea } from 'native-base'
import Container from '../../components/Container'
import Layout from '../../utils/LayoutHeader&BottomTab'
import { FontAwesome5, Ionicons, AntDesign} from '@expo/vector-icons';
import { getServices, postServices } from '../../utils/hooks/services';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateMessage } from '../../redux/actions/message';
import { useEffect } from 'react';
import RecommendedTags from '../../utils/RecommendedTags';
import { baseApi } from "../../utils/api";
import { store } from "../../redux/store";
function CreateNewThread({route, navigation}) {
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [showModalIcon, setShowModalIcon] = useState(false);
  /* const [menuShow, setMenu] = useState(false) */
  const [allTags, setAllTags] = useState([{}]);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);
	const [searchText, setSearchText] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState(""); 
  const [selectedCareerId, setSelectedCareerId] = useState(null); 
  const [subjects, setSubjects] = useState([]);

  if (route.params && route.params?.career_id) {
    setSelectedCareerId(route.params.career_id)
  } 

  const handleSubjectChange = (itemValue) => {
    setSelectedSubjectId(itemValue);
    setForm({ ...form, subject_id: itemValue })
  };

  const handleCareerChange = (itemValue) => {
    setSelectedCareerId(itemValue);
    setSelectedSubjectId(null);
  };

  const [form, setForm] = useState<any>({ 
    title: "",
    anonymous: 0,
    description: "",
    subject_id: selectedSubjectId,
    tags: [], 
    professor: "" })
  const dispatch = useDispatch()
  
  const sendForm = () => {
    console.log("created opinion", form)

    setLoading(true)
    postServices(`opinion/create`, form).then(({data}:any) => {
      dispatch(updateMessage({body: "Publicado correctamente", open: true, type: "success"}))
      setShowModal(false)
      console.log("created opinion 0", data)
      
    navigation.navigate('SeeSubjectThread', {
        value: data?.value ? false : true,
        subject_id: data.subject.id,
        title: data.title,
        description: data.description,
        time: data.subject.info,
        hours: "",
        method: "",
        id: data.id,
        rating: data.subject.opinionsCount
      })
    }).catch(() => {
      setShowModal(false)
      setShowModalError(true)
      dispatch(updateMessage({body: "Hubo un error al intentar hacer la publicación :(", open: true, type: "danger"}))
    }).finally(() => setLoading(false))
  }

  useEffect(() => {
    getServices('career/all').then((res: any) => {
      setCareers(res.data)
    }).catch(() => {});
  }, [])

  useEffect(() => {
    getServices("subject/career/" + selectedCareerId)
    .then(({ data }: any) => {
      setSubjects(data);
    })
    .catch(() => {});
  }, [selectedCareerId])


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
    if (searchText.includes(' ') || searchText.length === 0) {
      dispatch(updateMessage({body: "Asegurate de no tener espacios en blanco", open: true, type: "warning"}))
     /*  showAlert('warning', 'Asegurate de no tener espacios en blanco') */
      return false
    }
    const state: any = store.getState();
    const authToken = state.token;
    baseApi
      .post(`tag/create`, {name: searchText}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        Concat(res.data)
        setSearchText("")
      })
      .catch((err) => {
       console.log(err)
      });
    
  };


  const deleteTag = (_, i) => {
    form.tags.splice(i, 1);
    setForm({ ...form, tags: form.tags });
  };

  return (
    <Container>

      <Layout route={route} navigation={navigation} title={`Crear Hilo`}>
        <ScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps={'handled'}>
            <Box mx={5} mt={5} borderTopWidth={1} borderTopColor={'#EBEEF2'} pt={6}>
              <Text fontSize={15}>Información</Text>
            </Box>

            <Box
              mx="5"
              borderBottomWidth={1}
              borderBottomColor={"#EBEEF2"}
              pt={2}
              >
            {careers.length > 0 ? (
              <Select
              backgroundColor={"#F7FAFC"}
              placeholderTextColor={"#C4C4C4"}
                selectedValue={selectedCareerId}
                minWidth="335"
                accessibilityLabel="Elegir Carrera"
                placeholder="Elegir Carrera"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={handleCareerChange}
                textAlign={"left"}
              >
                {careers.map((item) => (
                  <Select.Item label={item.name} value={item.id} key={item.id} />
                ))}
              </Select>
            ) : (
              <Select
              backgroundColor={"#F7FAFC"}
              placeholderTextColor={"#C4C4C4"}
                rounded={"3xl"}
                textAlign={"center"}
                isDisabled
                accessibilityLabel="Elegir Materia"
                placeholder="No hay más materias"
              ></Select>
            )}
          </Box>
          <Box
              mx="5"
              borderBottomWidth={1}
              borderBottomColor={"#EBEEF2"}
              pt={2}
              >
            {subjects.length > 0 ? (
              <Select
              backgroundColor={"#F7FAFC"}
              placeholderTextColor={"#C4C4C4"}
                selectedValue={selectedSubjectId}
                minWidth="335"
                accessibilityLabel="Elegir Materia"
                placeholder="Elegir Materia"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={handleSubjectChange}
                textAlign={"left"}
              >
                {subjects.map((item) => (
                  <Select.Item label={item.name} value={item.id} key={item.id} />
                ))}
              </Select>
            ) : (
              <Select
              backgroundColor={"#F7FAFC"}
              placeholderTextColor={"#C4C4C4"}
                rounded={"3xl"}
                textAlign={"center"}
                isDisabled
                accessibilityLabel="Elegir Materia"
                placeholder="No hay más materias"
              ></Select>
            )}
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
                placeholder="Ingresá un título"
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
