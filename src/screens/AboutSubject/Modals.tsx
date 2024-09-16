import React, { useRef, useState, useEffect } from "react";
import {
  Alert,
  PixelRatio,
  TouchableOpacity,
  View,
  ScrollView,
  Modal as RNModal,
} from "react-native";

import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Input,
  KeyboardAvoidingView,
  Modal,
  Text,
  VStack,
  Image,
  Flex,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { SwipeablePanel } from "rn-swipeable-panel";
import {
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
  EvilIcons,
} from "@expo/vector-icons";

import {
  deleteNote,
  deletePartial,
  createNote,
  updateOrCreateScorePartial,
  updateNote,
} from "./ModalFunctions";
import DefaultButton from "../../components/DefaultButton";
import { REMEMBER_NOTICE, rememberNotice } from "../../redux/actions/notice";
import { fontStyles } from "../../utils/colors/fontColors";
import {
  moderateScale,
  verticalScale,
  screenWidth,
  horizontalScale,
} from "../../utils/media.screens";
import { AirbnbRating } from "react-native-ratings";

const ExclamationComponent = () => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 80,
        height: 80,
        borderRadius: 100,
        borderColor: "#DA673A",
        borderWidth: 6,
        margin: "auto",
        marginTop: 4,
      }}
    >
      <AntDesign
        name="exclamation"
        style={{ fontWeight: "bold", fontSize: 50 }}
        color="#DA673A"
      />
    </View>
  );
};

export function ModalNotes({
  showNotes,
  setShowNotes,
  infoUserSubj,
  updater,
  setUpdater,
}) {
  const [form, setForm] = useState({
    user_id: null,
    subject_id: null,
    score: null,
    finish: null,
    extra_score: [],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setForm(infoUserSubj);
  }, [infoUserSubj]);
  const [showModal2, setShowModal2] = useState({
    state: false,
    name: "",
    score: 1,
    extra_id: null,
    placeholder: false,
  });
  const [loading, setLoading] = useState(false);
  const initialRef = useRef(null);

  return (
    <Center>
      {/* MODAL */}
      <Modal
        isOpen={showNotes}
        animationPreset={"slide"}
        onClose={() => setShowNotes(false)}
        size="full"
        justifyContent={"flex-end"}
      >
        <Modal.Content
          minHeight={312}
          borderTopLeftRadius={"3xl"}
          borderBottomLeftRadius={"xs"}
          borderTopRightRadius={"xs"}
          borderBottomRightRadius={"xs"}
          bg={"#3A71E1"}
        >
          <Modal.Header
            pb={0}
            borderBottomWidth={0}
            bg={"#3A71E1"}
            flexDir={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text color={"white"} fontSize={16} fontWeight={"600"}>
              Notas de Cursada
            </Text>
            <HStack alignItems={"center"}>
              <Button isLoading={loading}></Button>
              <EvilIcons
                name="trash"
                size={24}
                color="#EC5F5F"
                onPress={() =>
                  form.extra_score && form.extra_score.length === 0
                    ? Alert.alert(
                        "Importante",
                        "¿Deseas eliminar la nota final?",
                        [
                          {
                            text: "Cancelar",
                            onPress: () => console.log(""),
                            style: "cancel",
                          },
                          {
                            text: "Aceptar",
                            onPress: () =>
                              deleteNote(
                                setLoading,
                                setUpdater,
                                updater,
                                setShowNotes,
                                infoUserSubj,
                                dispatch
                              ),
                          },
                        ]
                      )
                    : Alert.alert(
                        "Importante",
                        "Primero debes eliminar las notas parciales para eliminar la nota final!",
                        [
                          {
                            text: "Ok, genial!",
                            onPress: () => console.log(""),
                            style: "cancel",
                          },
                        ]
                      )
                }
              />
              <TouchableOpacity
                onPress={() =>
                  updateNote(
                    setLoading,
                    setUpdater,
                    updater,
                    setShowNotes,
                    infoUserSubj,
                    form,
                    dispatch
                  )
                }
              >
                <Text mx={4} color={"white"}>
                  Guardar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setShowModal2({
                    ...showModal2,
                    state: true,
                    score: 1,
                    name: "",
                    extra_id: null,
                    placeholder: false,
                  })
                }
              >
                <Text color={"white"} fontSize={25}>
                  +
                </Text>
              </TouchableOpacity>
            </HStack>
          </Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <HStack
                px={3}
                alignItems="center"
                justifyContent="space-between"
                py={1}
                mb={1}
                bg={"#F7FAFC"}
                rounded={"md"}
              >
                <Text color={"#3A71E1"} fontSize={12}>
                  Nota Final
                </Text>
                <HStack alignItems={"center"}>
                  <TouchableOpacity
                    onPress={() =>
                      setForm({ ...form, score: Math.max(1, form.score - 1) })
                    }
                  >
                    <AntDesign name="minuscircleo" size={18} color="#3A71E1" />
                  </TouchableOpacity>
                  <Text color="#3A71E1" mx={4} fontSize={16} fontWeight={"600"}>
                    {form.score || 0}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setForm({ ...form, score: Math.min(10, form.score + 1) })
                    }
                  >
                    <AntDesign name="pluscircleo" size={18} color="#3A71E1" />
                  </TouchableOpacity>
                </HStack>
              </HStack>
              {form?.extra_score?.length > 0 &&
                form?.extra_score?.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() =>
                      setShowModal2({
                        ...showModal2,
                        state: true,
                        name: item.name,
                        score: item.score,
                        extra_id: item.id,
                        placeholder: true,
                      })
                    }
                  >
                    <HStack
                      px={3}
                      borderBottomWidth={1}
                      borderBottomColor={"#EFEFEF"}
                      pb={3}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text color={"white"} fontSize={12}>
                        {item.name}
                      </Text>
                      <HStack alignItems={"center"}>
                        <Text
                          color="white"
                          mr={4}
                          fontSize={16}
                          fontWeight={"600"}
                        >
                          {item.score}
                        </Text>
                        <MaterialCommunityIcons
                          name="greater-than"
                          size={18}
                          color="white"
                        />
                      </HStack>
                    </HStack>
                  </TouchableOpacity>
                ))}
            </VStack>
          </Modal.Body>
          <Modal.Footer bg={"#3A71E1"} borderTopWidth={0}></Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal
        isOpen={showModal2?.state}
        animationPreset={"slide"}
        onClose={() => setShowModal2({ ...showModal2, state: false })}
        size="full"
        justifyContent={"flex-end"}
        initialFocusRef={initialRef}
      >
        <KeyboardAvoidingView behavior={"padding"}>
          <Modal.Content
            minHeight={312}
            borderTopLeftRadius={"3xl"}
            borderBottomLeftRadius={"xs"}
            borderTopRightRadius={"xs"}
            borderBottomRightRadius={"xs"}
            bg={"#3A71E1"}
          >
            <Modal.Header
              pb={0}
              borderBottomWidth={0}
              bg={"#3A71E1"}
              flexDir={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Box>
                <TouchableOpacity
                  onPress={() =>
                    showModal2?.placeholder
                      ? updateOrCreateScorePartial(
                          showModal2?.extra_id,
                          setLoading,
                          showModal2,
                          infoUserSubj,
                          setUpdater,
                          updater,
                          setShowModal2,
                          setShowNotes,
                          dispatch
                        )
                      : updateOrCreateScorePartial(
                          showModal2?.extra_id,
                          setLoading,
                          showModal2,
                          infoUserSubj,
                          setUpdater,
                          updater,
                          setShowModal2,
                          setShowNotes,
                          dispatch
                        )
                  }
                >
                  <Text color={"white"}>Guardar</Text>
                </TouchableOpacity>
              </Box>
              <Button
                display={loading ? "flex" : "none"}
                isLoading={loading}
              ></Button>

              <Text
                onPress={() =>
                  deletePartial(
                    showModal2?.extra_id,
                    setLoading,
                    setUpdater,
                    updater,
                    setShowNotes,
                    setShowModal2,
                    showModal2,
                    dispatch
                  )
                }
                color={"white"}
                display={showModal2?.placeholder ? "flex" : "none"}
              >
                Eliminar
              </Text>
            </Modal.Header>
            <Modal.Body>
              <VStack space={3}>
                <FormControl>
                  <Input
                    mb={4}
                    fontSize={18}
                    placeholder=""
                    ref={initialRef}
                    color={"#FFFFFF"}
                    bgColor={"#3A71E1"}
                    borderBottomWidth={1}
                    value={showModal2?.name}
                    borderBottomColor={"#EFEFEF"}
                    isDisabled={showModal2?.placeholder}
                    onChangeText={(text) =>
                      setShowModal2({ ...showModal2, name: text })
                    }
                  />
                </FormControl>
                <HStack justifyContent={"center"}>
                  <HStack
                    alignItems={"center"}
                    w={"100%"}
                    justifyContent={"space-around"}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        setShowModal2({
                          ...showModal2,
                          score: Math.max(1, showModal2?.score - 1),
                        })
                      }
                    >
                      <AntDesign name="minuscircleo" size={47} color="white" />
                    </TouchableOpacity>
                    <Text color="white" fontSize={47} fontWeight={"600"}>
                      {showModal2?.score}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        setShowModal2({
                          ...showModal2,
                          score: Math.min(10, showModal2?.score + 1),
                        })
                      }
                    >
                      <AntDesign name="pluscircleo" size={47} color="white" />
                    </TouchableOpacity>
                  </HStack>
                </HStack>
              </VStack>
            </Modal.Body>
            <Modal.Footer
              bg={"#3A71E1"}
              borderTopWidth={0}
              mb={4}
            ></Modal.Footer>
          </Modal.Content>
        </KeyboardAvoidingView>
      </Modal>
    </Center>
  );
}

export function ModalWarning({
  showWarning,
  setShowWarning,
  currentSubj,
  allSubjects,
}) {
  const [loading, setLoading] = useState(false);
  const userdata = useSelector((state: any) => state.user.userdata);

  let dataItems = currentSubj?.subjectParents || [];

  let arrSinDuplicaciones = [];
  if (dataItems && dataItems.length > 0) {
    let set = new Set(dataItems.map(JSON.stringify));
    arrSinDuplicaciones = Array.from(set).map(JSON.parse);
  }

  const findSubjectNameById = (id) => {
    console.log(id, "id");
    for (let level of allSubjects) {
      console.log(level, "level");
      const subject = level.subject.find((subj) => subj.id === id);
      console.log(subject, "hola");
      if (subject) {
        return subject.name;
      }
    }
    return "Materia no encontrada";
  };

  const getParentDisplayName = (parent) => {
    if (parent.orCorrelative && parent.orCorrelative.length > 0) {
      const orCorNames = parent.orCorrelative.map((cor) =>
        findSubjectNameById(+cor.id)
      );
      return `${parent.name} o ${orCorNames.join(" o ")}`;
    } else {
      return parent.name;
    }
  };

  function hideModal() {
    setShowWarning(false);
  }

  return (
    <Modal
      isOpen={showWarning}
      animationPreset={"slide"}
      size={"xl"}
      onClose={() => setShowWarning(false)}
      mt={5}
    >
      <Modal.Content rounded={"2xl"}>
        <Modal.Body alignItems={"center"}>
          <ExclamationComponent />
          <Text
            fontSize={20}
            mt={3}
            style={fontStyles.poppins500}
            textAlign={"center"}
          >
            Advertencias
          </Text>

          <FormControl>
            {currentSubj?.available === false ? (
              <>
                <Text fontWeight={"bold"} textAlign={"center"} fontSize={21}>
                  No podés anotarte a esta materia :(
                </Text>
                <Text marginTop={"5%"} fontSize={12} textAlign={"center"}>
                  Primero tenés que aprobar:
                </Text>
                <HStack
                  justifyContent={"center"}
                  p={2}
                  flexWrap={"wrap"}
                  flexDirection={"column"}
                >
                  {arrSinDuplicaciones &&
                    arrSinDuplicaciones.map(
                      (item, i) =>
                        !item.completed && (
                          <Box
                            p={1}
                            style={{ display: "flex", flexDirection: "row" }}
                            key={item.name}
                            px={2}
                          >
                            <Text fontSize={10} textAlign={"left"}>
                              {`- ${getParentDisplayName(item)}`}
                            </Text>
                          </Box>
                        )
                    )}
                </HStack>
              </>
            ) : !currentSubj?.available ? (
              <Box
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                marginY={5}
                px={2}
              >
                <Text>
                  <Box
                    height={moderateScale(8)}
                    width={moderateScale(8)}
                    borderRadius="full"
                    background={"#DA673A"}
                  ></Box>
                </Text>
                <Text
                  ml={2}
                  style={[
                    { fontSize: moderateScale(12) },
                    fontStyles.poppins400,
                  ]}
                  w={"100%"}
                  numberOfLines={3}
                >
                  No podés anotarte a esta materia sin terminar el nivel
                  anterior
                </Text>
              </Box>
            ) : null}
          </FormControl>
          <Button.Group space={2} mt={2}>
            <DefaultButton
              buttonStyle={{
                backgroundColor: "#DA673A",
                borderRadius: moderateScale(8),
                height: verticalScale(45),
                width: 500,
                maxWidth: screenWidth - screenWidth / 5,
              }}
              textStyle={{
                fontSize: moderateScale(14),
                fontWeight: "500",
                color: "white",
              }}
              containerStyle={{
                marginBottom: PixelRatio.roundToNearestPixel(15),
              }}
              title="Entiendo"
              callBack={hideModal}
            />
          </Button.Group>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

export function ModalWarning2({ showWarning, setShowWarning }) {
  const dispatch = useDispatch();

  const blockNotice = () => {
    dispatch(rememberNotice({ type: REMEMBER_NOTICE, value: true }));
  };

  const closeModal = () => {
    blockNotice();
    setShowWarning(false);
  };

  return (
    <Modal
      isOpen={showWarning}
      animationPreset={"slide"}
      size={"xl"}
      onClose={() => {
        blockNotice();
        setShowWarning(false);
      }}
    >
      <Modal.Content rounded={"2xl"}>
        <Modal.Body alignItems={"center"}>
          <ExclamationComponent />
          <Text
            fontSize={20}
            mt={3}
            mb={"4%"}
            style={fontStyles.poppins500}
            textAlign={"center"}
          >
            Advertencias
          </Text>

          <HStack
            maxWidth={"100%"}
            px={"5%"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Box
              display={"flex"}
              flexDirection={"row"}
              mb={1.5}
              alignItems={"center"}
            >
              <Box
                height={moderateScale(8)}
                width={moderateScale(8)}
                borderRadius="full"
                background={"#DA673A"}
              />
              <Text textAlign={"left"} ml={2}>
                No se permiten las faltas de respeto de ningún tipo, insultos o
                agresiones.
              </Text>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              mb={1.5}
              alignItems={"center"}
            >
              <Box
                height={moderateScale(8)}
                width={moderateScale(8)}
                borderRadius="full"
                background={"#DA673A"}
              />
              <Text textAlign={"left"} ml={2}>
                Criticar sin motivo a nadie. ni nada.
              </Text>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              mb={1.5}
              alignItems={"center"}
            >
              <Box
                height={moderateScale(8)}
                width={moderateScale(8)}
                borderRadius="full"
                background={"#DA673A"}
              />
              <Text textAlign={"left"} ml={2}>
                Spam.
              </Text>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              mb={1.5}
              alignItems={"center"}
            >
              <Box
                height={moderateScale(8)}
                width={moderateScale(8)}
                borderRadius="full"
                background={"#DA673A"}
              />
              <Text textAlign={"left"} ml={2}>
                ser un troll, no molestes.
              </Text>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              mb={1.5}
              alignItems={"center"}
            >
              <Box
                height={moderateScale(8)}
                width={moderateScale(8)}
                borderRadius="full"
                background={"#DA673A"}
              />
              <Text textAlign={"left"} ml={2}>
                Saltarse algunas de estas normas implicará:
              </Text>
            </Box>
            <Box
              style={{ marginTop: "3%", display: "flex", flexDirection: "row" }}
              px={2}
              mb={1}
            >
              <Text>1</Text>
              <Text px={"1.5"} textAlign={"left"}>
                {" "}
                Baneo temporal sin poder comentar duante un tiempo indefinido.
              </Text>
            </Box>
            <Box
              style={{ display: "flex", flexDirection: "row" }}
              px={2}
              pb={5}
            >
              <Text>2</Text>
              <Text textAlign={"left"}>
                {" "}
                Baneo completo y expulsión de la app.
              </Text>
            </Box>
          </HStack>
          <Button.Group space={2} my={"7%"}>
            <DefaultButton
              buttonStyle={{
                height: horizontalScale(40),
                backgroundColor: "#DA673A",
                paddingHorizontal: horizontalScale(45),
                width: 300,
                alignItems: "center",
                borderRadius: moderateScale(8),
              }}
              title="Entiendo, voy a respetar"
              callBack={() => closeModal()}
            />
          </Button.Group>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

export function ModalIcon({ showIcon, setShowIcon }) {
  return (
    <Modal
      isOpen={showIcon}
      size={"xs"}
      onClose={() => setShowIcon(false)}
      mt={5}
    >
      <Modal.Content>
        <Modal.Body alignItems={"center"}>
          <FormControl>
            <Text fontSize={10} textAlign={"center"}>
              Contenido bloqueado
            </Text>
          </FormControl>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

export function ErrorModal({
  isOpen,
  setOpen,
  message,
}: {
  isOpen: boolean;
  setOpen: Function;
  message?: string;
}) {
  return (
    <Modal
      isOpen={isOpen}
      size={"xs"}
      onClose={() => setOpen(false)}
      animationPreset={"fade"}
    >
      <Modal.Content backgroundColor={"white"} paddingTop={5}>
        <Center>
          <ExclamationComponent />
        </Center>
        <Modal.Body alignItems={"center"}>
          <FormControl>
            <Text fontSize={14} textAlign={"center"}>
              {message ?? "Ha ocurrido un error."}
            </Text>
          </FormControl>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

export function SuccessModal({
  isOpen,
  setOpen,
  message,
}: {
  isOpen: boolean;
  setOpen: Function;
  message?: string;
}) {
  return (
    <Modal
      isOpen={isOpen}
      size={"xs"}
      onClose={() => setOpen(false)}
      animationPreset={"fade"}
    >
      <Modal.Content backgroundColor={"white"} paddingTop={5}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            width: 50,
            height: 50,
            borderRadius: 35,
            backgroundColor: "#4BB543",
            margin: "auto",
          }}
        >
          <AntDesign name="check" size={32} color="white" />
        </View>

        <Modal.Body alignItems={"center"}>
          <FormControl>
            <Text fontSize={14} textAlign={"center"}>
              {message ?? "Operación exitosa."}
            </Text>
          </FormControl>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

export function ConfirmEmailModal({
  isOpen,
  setOpen,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  setOpen: Function;
  onConfirm: Function;
  onCancel: Function;
}) {
  return (
    <Modal
      isOpen={isOpen}
      size={"xl"}
      onClose={() => setOpen(false)}
      animationPreset={"fade"}
    >
      <Modal.Content backgroundColor={"white"} paddingTop={5}>
        <ExclamationComponent />
        <Modal.Body alignItems={"center"}>
          <FormControl>
            <Text fontSize={14} textAlign={"center"}>
              Confirmá tu email para poder publicar hilos
            </Text>
          </FormControl>
        </Modal.Body>
        <Modal.Footer justifyContent="center">
          <HStack pr={5} pl={5} mb={5}>
            <Button
              w="100%"
              backgroundColor={"#797979"}
              _text={{ fontSize: 14, fontWeight: "600", color: "white" }}
              onPress={() => (setOpen(false), onCancel())}
              borderRadius={moderateScale(8)}
              py={4}
              fontWeight="bold"
            >
              Mejor después
            </Button>
          </HStack>
          <HStack pr={5} pl={5} mb={5}>
            <Button
              w="100%"
              backgroundColor={"#DA673A"}
              _text={{ fontSize: 14, fontWeight: "600", color: "white" }}
              onPress={() => (setOpen(false), onConfirm())}
              borderRadius={moderateScale(8)}
              py={4}
              fontWeight="bold"
            >
              Confirmar Email
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export function DiscardDraftModal({
  isOpen,
  setOpen,
  onConfirm,
  onCancel,
  message,
}: {
  isOpen: boolean;
  setOpen: Function;
  onConfirm: Function;
  onCancel: Function;
  message?: string;
}) {
  return (
    <Modal
      isOpen={isOpen}
      size={"xl"}
      onClose={() => setOpen(false)}
      animationPreset={"fade"}
    >
      <Modal.Content backgroundColor={"white"} paddingTop={5}>
        <Center>
          <ExclamationComponent />
        </Center>
        <Modal.Body alignItems={"center"}>
          <FormControl>
            <Text fontSize={14} textAlign={"center"}>
              {message}
            </Text>
          </FormControl>
        </Modal.Body>
        <Modal.Footer justifyContent="center">
          <HStack pr={5} pl={5} mb={5}>
            <Button
              w="100%"
              backgroundColor={"#797979"}
              _text={{ fontSize: 14, fontWeight: "600", color: "white" }}
              onPress={() => onCancel()}
              borderRadius={moderateScale(8)}
              py={4}
              fontWeight="bold"
            >
              Cancelar
            </Button>
          </HStack>
          <HStack pr={5} pl={5} mb={5}>
            <Button
              w="100%"
              backgroundColor={"#DA673A"}
              _text={{ fontSize: 14, fontWeight: "600", color: "white" }}
              onPress={() => onConfirm()}
              borderRadius={moderateScale(8)}
              py={4}
              fontWeight="bold"
            >
              Confirmar y Perder Borrador
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export function AddChairModal({
  isOpen,
  setOpen,
  onConfirm,
  onCancel,
  setInfoUserSubj,
  infoUserSubj,
  setSelectedChair,
  chairs,
}: {
  isOpen: boolean;
  setOpen: Function;
  onConfirm: Function;
  infoUserSubj: any;
  setInfoUserSubj: Function;
  setSelectedChair: Function;
  chairs: any;
  onCancel: Function;
}) {
  const [showSelectChair, setShowSelectChair] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      size={"xl"}
      onClose={() => setOpen(false)}
      animationPreset={"fade"}
    >
      <Modal.Content backgroundColor={"white"} paddingTop={5}>
        <Flex
          direction="row"
          alignItems="center"
          justifyContent={"space-between"}
          mb={4}
        >
          <TouchableOpacity
            style={{ marginLeft: 20 }}
            onPress={() => (
              onCancel(false),
              setInfoUserSubj({
                ...infoUserSubj,
                chair: "",
              })
            )}
          >
            <Entypo name="chevron-left" size={24} color="gray" />
          </TouchableOpacity>
          <Text fontSize={18} ml={2}>
            Qué cátedra cursaste?
          </Text>
          <View width={"15%"} />
        </Flex>
        <Modal.Body alignItems={"flex-start"}>
          <FormControl>
            <Box mx="5" mt={2} mb={5}>
              <TouchableOpacity
                style={{
                  width: "100%",
                  backgroundColor: "#F7FAFC",
                  paddingHorizontal: 10,
                  height: 50,
                  borderRadius: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onPress={() => setShowSelectChair(true)}
              >
                {infoUserSubj?.chair ? (
                  <Text
                    bold={true}
                    numberOfLines={2}
                    style={[fontStyles.poppins400, { fontSize: 14 }]}
                    color={"#171717"}
                  >
                    {infoUserSubj?.chair}
                  </Text>
                ) : (
                  <Text
                    bold={true}
                    numberOfLines={2}
                    style={[fontStyles.poppins400, { fontSize: 14 }]}
                    color={"#C4C4C4"}
                  >
                    Elegir cátedra
                  </Text>
                )}
                <Entypo name="chevron-down" size={25} color="#797979" />
              </TouchableOpacity>
            </Box>
            <VStack space={2} alignItems="flex-start">
              <RNModal
                visible={!!showSelectChair}
                transparent
                children={
                  <SwipeablePanel
                    style={{ height: 480 }}
                    closeOnTouchOutside
                    onClose={() => setShowSelectChair(null)}
                    fullWidth
                    onlyLarge
                    isActive={!!showSelectChair}
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
                        {chairs
                          ?.slice()
                          .sort((a, b) => a.localeCompare(b))
                          .map((chair, index) => (
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                setInfoUserSubj({
                                  ...infoUserSubj,
                                  chair: chair,
                                });
                                setSelectedChair(chair);
                                setShowSelectChair(false);
                              }}
                              style={{
                                paddingVertical: 10,
                                paddingRight: 27,
                                paddingLeft: 30,
                                backgroundColor:
                                  chair === infoUserSubj?.chair
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
                                      chair === infoUserSubj?.chair
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
          </FormControl>
        </Modal.Body>
        <HStack pr={5} pl={5} mb={5}>
          <Button
            w="100%"
            isDisabled={infoUserSubj?.chair.length === 0}
            backgroundColor={"#DA673A"}
            _text={{ fontSize: 14, fontWeight: "600", color: "white" }}
            onPress={() => {
              onConfirm(true), setOpen(false);
            }}
            borderRadius={moderateScale(8)}
            py={4}
            fontWeight="bold"
          >
            Siguiente
          </Button>
        </HStack>
      </Modal.Content>
    </Modal>
  );
}

export function AddScore({
  isOpen,
  setOpen,
  onConfirm,
  onCancel,
  setInfoUserSubj,
  infoUserSubj,
}: {
  isOpen: boolean;
  setOpen: Function;
  onConfirm: Function;
  infoUserSubj: any;
  setInfoUserSubj: Function;
  onCancel: Function;
}) {
  const [localScore, setLocalScore] = useState(infoUserSubj.score || 1);

  useEffect(() => {
    if (isOpen) {
      setLocalScore(infoUserSubj.score || 1);
    }
  }, [isOpen, infoUserSubj.score]);

  return (
    <Modal
      isOpen={isOpen}
      size={"xl"}
      onClose={() => setOpen(false)}
      animationPreset={"fade"}
    >
      <Modal.Content backgroundColor={"white"} paddingTop={5}>
        <Flex
          direction="row"
          alignItems="center"
          justifyContent={"space-between"}
          mb={4}
        >
          <TouchableOpacity
            style={{ marginLeft: 20 }}
            onPress={() => {
              setOpen(false), onCancel(true);
            }}
          >
            <Entypo name="chevron-left" size={24} color="gray" />
          </TouchableOpacity>
          <Text textAlign="center" fontSize={18} ml={2}>
            Nota final
          </Text>
          <View width={"15%"} />
        </Flex>
        <Modal.Body alignItems={"flex-start"}>
          <FormControl>
            <HStack alignItems={"center"} justifyContent={"center"} mb={10}>
              <TouchableOpacity
                onPress={() => setLocalScore(Math.max(1, localScore - 1))}
              >
                <AntDesign name="minuscircleo" size={40} color="#DA673A" />
              </TouchableOpacity>
              <Text color="#DA673A" mx={20} fontSize={45} fontWeight={"600"}>
                {localScore || 1}
              </Text>
              <TouchableOpacity
                onPress={() => setLocalScore(Math.min(10, localScore + 1))}
              >
                <AntDesign name="pluscircleo" size={40} color="#DA673A" />
              </TouchableOpacity>
            </HStack>
          </FormControl>
        </Modal.Body>
        <DefaultButton
          buttonStyle={{
            height: horizontalScale(40),
            backgroundColor: "#DA673A",
            paddingHorizontal: horizontalScale(45),
            width: 300,
            marginBottom: 20,
            alignItems: "center",
            borderRadius: moderateScale(8),
          }}
          title="Siguiente"
          callBack={() => {
            setInfoUserSubj({ ...infoUserSubj, score: localScore });
            onConfirm(true);
            setOpen(false);
          }}
        />
      </Modal.Content>
    </Modal>
  );
}

export function AddStarsModal({
  isOpen,
  setOpen,
  onConfirm,
  onCancel,
  setInfoUserSubj,
  infoUserSubj,
  setUpdater,
  updater,
  currentSubj,
}: {
  isOpen: boolean;
  setOpen: Function;
  onConfirm: Function;
  infoUserSubj: any;
  setInfoUserSubj: Function;
  onCancel: Function;
  setUpdater: Function;
  updater: any;
  currentSubj: any;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      size={"xl"}
      onClose={() => setOpen(false)}
      animationPreset={"fade"}
    >
      <Modal.Content backgroundColor={"white"} paddingTop={5}>
        <Flex
          direction="row"
          alignItems="center"
          justifyContent={"space-between"}
          mb={4}
        >
          <TouchableOpacity
            style={{ marginLeft: 20 }}
            onPress={() => {
              setOpen(false), onCancel(true);
            }}
          >
            <Entypo name="chevron-left" size={24} color="gray" />
          </TouchableOpacity>
          <Text fontSize={18} ml={2}>
            Cursada
          </Text>
          <View width={"15%"} />
        </Flex>
        <Modal.Body alignItems={"flex-start"}>
          <FormControl>
            <HStack
              alignItems={"center"}
              flexDirection={"column"}
              justifyContent={"center"}
              mb={10}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "gray",
                  marginTop: 15,
                  marginBottom: 10,
                }}
              >
                Calidad de profesores
              </Text>
              <AirbnbRating
                showRating={false}
                size={25}
                selectedColor={"#DA673A"}
                onFinishRating={(rating) =>
                  setInfoUserSubj({
                    ...infoUserSubj,
                    qualityOfTeachers: rating,
                  })
                }
                starContainerStyle={{ marginHorizontal: 7 }}
                defaultRating={infoUserSubj?.qualityOfTeachers}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: "gray",
                  marginTop: 15,
                  marginBottom: 10,
                }}
              >
                Trabajos prácticos
              </Text>
              <AirbnbRating
                showRating={false}
                size={25}
                selectedColor={"#DA673A"}
                onFinishRating={(rating) =>
                  setInfoUserSubj({
                    ...infoUserSubj,
                    practicalJobs: rating,
                  })
                }
                starContainerStyle={{ marginHorizontal: 7 }}
                defaultRating={infoUserSubj?.practicalJobs}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: "gray",
                  marginTop: 15,
                  marginBottom: 10,
                }}
              >
                Qué tan exigente es?
              </Text>
              <AirbnbRating
                showRating={false}
                size={25}
                selectedColor={"#DA673A"}
                onFinishRating={(rating) =>
                  setInfoUserSubj({
                    ...infoUserSubj,
                    requirement: rating,
                  })
                }
                starContainerStyle={{ marginHorizontal: 7 }}
                defaultRating={infoUserSubj?.requirement}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: "gray",
                  marginTop: 15,
                  marginBottom: 10,
                }}
              >
                Qué tan cara es?
              </Text>
              <AirbnbRating
                showRating={false}
                size={25}
                selectedColor={"#DA673A"}
                onFinishRating={(rating) =>
                  setInfoUserSubj({
                    ...infoUserSubj,
                    cost: rating,
                  })
                }
                starContainerStyle={{ marginHorizontal: 7 }}
                defaultRating={infoUserSubj?.cost}
              />
            </HStack>
          </FormControl>
        </Modal.Body>
        <HStack pr={6} pl={6} mb={5}>
          <Button
            w="100%"
            isDisabled={
              infoUserSubj.qualityOfTeachers === 0 ||
              infoUserSubj.practicalJobs === 0 ||
              infoUserSubj.requirement === 0 ||
              infoUserSubj.cost === 0
            }
            backgroundColor={"#DA673A"}
            _text={{ fontSize: 14, fontWeight: "600", color: "white" }}
            onPress={() => {
              onConfirm(true), setOpen(false);
            }}
            borderRadius={moderateScale(8)}
            py={3}
            fontWeight="bold"
          >
            Siguiente
          </Button>
        </HStack>

        <HStack
          pr={6}
          pl={6}
          mb={5}
          alignItems="center"
          justifyContent="center"
        >
          <TouchableOpacity
            onPress={() => {
              createNote(
                setLoading,
                setInfoUserSubj,
                infoUserSubj,
                currentSubj,
                updater,
                setUpdater
              );
              setOpen(false);
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#DA673A" }}>
              Omitir
            </Text>
          </TouchableOpacity>
        </HStack>
      </Modal.Content>
    </Modal>
  );
}

export function ModalSummary({
  isOpen,
  setOpen,
  onConfirm,
  onCancel,
  setInfoUserSubj,
  infoUserSubj,
  setUpdater,
  updater,
  currentSubj,
}: {
  isOpen: boolean;
  setOpen: Function;
  onConfirm: Function;
  infoUserSubj: any;
  setInfoUserSubj: Function;
  setUpdater: Function;
  updater: any;
  currentSubj: any;
  onCancel: Function;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      size={"xl"}
      onClose={() => setOpen(false)}
      animationPreset={"fade"}
    >
      <Modal.Content backgroundColor={"white"} paddingTop={5}>
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
          <TouchableOpacity
            style={{ marginLeft: 20 }}
            onPress={() => {
              setOpen(false), onCancel(true);
            }}
          >
            <Entypo name="chevron-left" size={24} color="gray" />
          </TouchableOpacity>
          <Text fontSize={18} ml={2}>
            Cursada
          </Text>
          <View width={"15%"} />
        </Flex>
        <Modal.Body alignItems={"flex-start"}>
          <FormControl>
            <HStack
              flexDirection={"column"}
              justifyContent={"space-between"}
              mb={10}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 19,
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 15,
                  marginBottom: 5,
                }}
              >
                <Text style={{ fontSize: 15, color: "gray" }}>Materia</Text>
                <Text fontSize={19} color={"#DA673A"}>
                  {currentSubj?.prefix}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 19,
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 15,
                  marginBottom: 5,
                }}
              >
                <Text style={{ fontSize: 15, color: "gray" }}>Nota</Text>
                <Text fontSize={19} color={"#DA673A"}>
                  {infoUserSubj?.score}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 19,
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 15,
                  marginBottom: 5,
                }}
              >
                <Text style={{ fontSize: 15, color: "gray" }}>Cátedra</Text>
                <Text fontSize={19} color={"#DA673A"}>
                  {infoUserSubj?.chair}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 19,
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 15,
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontSize: 15, color: "gray" }}>Profesores</Text>
                <AirbnbRating
                  isDisabled
                  showRating={false}
                  size={15}
                  selectedColor={"#DA673A"}
                  defaultRating={infoUserSubj?.qualityOfTeachers}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 19,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "gray",
                    marginTop: 15,
                    marginBottom: 10,
                  }}
                >
                  TPS
                </Text>
                <AirbnbRating
                  isDisabled
                  showRating={false}
                  size={15}
                  selectedColor={"#DA673A"}
                  defaultRating={infoUserSubj?.practicalJobs}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 19,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "gray",
                    marginTop: 15,
                    marginBottom: 10,
                  }}
                >
                  Exigencia
                </Text>
                <AirbnbRating
                  isDisabled
                  showRating={false}
                  size={15}
                  selectedColor={"#DA673A"}
                  defaultRating={infoUserSubj?.requirement}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 19,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "gray",
                    marginTop: 15,
                    marginBottom: 10,
                  }}
                >
                  Costo
                </Text>
                <AirbnbRating
                  isDisabled
                  showRating={false}
                  size={15}
                  selectedColor={"#DA673A"}
                  defaultRating={infoUserSubj?.cost}
                />
              </View>
            </HStack>
          </FormControl>
        </Modal.Body>
        <HStack pr={5} pl={5} mb={5}>
          <Button
            w="100%"
            backgroundColor={"#DA673A"}
            isLoading={loading}
            _text={{ fontSize: 14, fontWeight: "600", color: "white" }}
            onPress={() => {
              createNote(
                setLoading,
                setInfoUserSubj,
                infoUserSubj,
                currentSubj,
                updater,
                setUpdater
              );
              setOpen(false);
              onConfirm(true);
            }}
            borderRadius={moderateScale(8)}
            py={4}
            fontWeight="bold"
          >
            Guardar
          </Button>
        </HStack>
      </Modal.Content>
    </Modal>
  );
}

export function ModalLeaveAnOpinion({
  setShowModal,
  showModal,
  onConfirm,
}: {
  setShowModal: Function;
  showModal: any;
  onConfirm: Function;
}) {
  function hideModal() {
    setShowModal(false);
  }

  return (
    <Modal isOpen={showModal} size={"xl"} onClose={hideModal} mt={5}>
      <Modal.Content>
        <Modal.Body alignItems={"center"}>
          <FormControl alignItems={"center"} mb={4}>
            <AntDesign name="questioncircle" size={45} color="#DA673A" />
          </FormControl>
          <FormControl>
            <Text fontSize={17} textAlign={"center"} fontWeight={700}>
              Querés dejar una opinión?
            </Text>
          </FormControl>
          <FormControl mb={6}>
            <Text fontSize={15} textAlign={"center"}>
              Ya que cursaste esta materia, que te parece dejar una opinión
              escrita?
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
              _pressed={{ bgColor: "rgba(218, 103, 58, .5)" }}
              _text={{ fontSize: 14, fontWeight: "600" }}
              bg={"#DA673A"}
              onPress={() => (onConfirm(), hideModal())}
              borderRadius={8}
              py={4}
              px={6}
            >
              Dale!
            </Button>
            <Button
              _text={{ fontSize: 14, fontWeight: "600" }}
              variant="outline"
              colorScheme="gray"
              onPress={hideModal}
              borderRadius={8}
              py={4}
              px={6}
            >
              Ahora no
            </Button>
          </Button.Group>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

export function ModalDeleteOpinion({
  showWarning,
  onPress,
  setShowWarning,
  loading,
}) {
  function hideModal() {
    setShowWarning(false);
  }

  return (
    <Modal
      isOpen={showWarning}
      animationPreset={"slide"}
      size={"xl"}
      onClose={hideModal}
      mt={5}
    >
      <Modal.Content rounded={"2xl"}>
        <Modal.Body alignItems={"center"}>
          <ExclamationComponent />
          <Text
            fontSize={20}
            mt={3}
            style={fontStyles.poppins500}
            textAlign={"center"}
          >
            Advertencia
          </Text>

          <FormControl>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              w={"100%"}
            >
              <Text fontSize={15}>¿Querés eliminar esta opinión?</Text>
            </Box>
          </FormControl>
          <Button.Group space={2} mt={2}>
            <VStack space={3} w="full" px={6} mt={6}>
              <Button
                borderRadius={8}
                py={4}
                px={6}
                w="100%"
                bg={"#DA673A"}
                isLoading={loading}
                _pressed={{ bgColor: "rgba(218, 103, 58, .5)" }}
                _text={{ fontSize: 14, fontWeight: "600" }}
                onPress={onPress}
              >
                Si
              </Button>
              <Button
                px={5}
                w="100%"
                variant={"outline"}
                colorScheme="gray"
                _text={{ fontSize: 14, fontWeight: "600" }}
                onPress={() => hideModal()}
                borderRadius={8}
                py={4}
                fontWeight="bold"
              >
                No
              </Button>
            </VStack>
          </Button.Group>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

export function ImageModal({
  image,
  showImage,
  hideModal,
}: {
  image: string;
  showImage: boolean;
  hideModal: () => void;
}) {
  return (
    <Modal
      isOpen={showImage}
      onClose={hideModal}
      animationPreset={"fade"}
      size="full"
      _backdrop={{
        bg: "rgba(0, 0, 0, 1)",
      }}
    >
      <Modal.Content p={0} bg="rgba(0, 0, 0, 1)">
        <Modal.CloseButton />
        <Modal.Body alignItems={"center"} p={0} bg="rgba(0, 0, 0, 1)">
          <Image
            style={{
              height: 500,
              width: "100%",
              borderRadius: 8,
              objectFit: "scale-down",
            }}
            alt="LOGO"
            source={{
              uri: image,
            }}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
