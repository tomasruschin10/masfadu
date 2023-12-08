import { useRef, useState, useEffect } from "react";
import { Alert, PixelRatio, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import {
  AntDesign,
  MaterialCommunityIcons,
  EvilIcons,
} from "@expo/vector-icons";
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
} from "native-base";
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
import { moderateScale, verticalScale, screenWidth, horizontalScale } from "../../utils/media.screens";


function RenderArrow() {
  return (
    <View
      style={{
        backgroundColor: "#486b8a",
        borderRadius: 6,
        padding: 5,
        height: 25,
      }}>
      <Entypo name="arrow-right" size={13} color="white" />
    </View>
  );
}


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
        margin: 'auto',
        marginTop: 4
      }}
    >
      <AntDesign name="exclamation" style={{ fontWeight: "bold", fontSize: 50 }} color="#DA673A" />
    </View>
  );
}

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
                  form.extra_score.length === 0
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
      {/* SUBMODAL */}
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
  setInfoUserSubj,
  infoUserSubj,
  setShowNotes,
  setUpdater,
  updater,
}) {
  const [loading, setLoading] = useState(false);
  const userdata = useSelector((state: any) => state.user.userdata);
  let dataItems: string[] = currentSubj?.subjectParents;
  console.log("dataItems typw", typeof dataItems);

  let arrSinDuplicaciones = [];

  if (dataItems && dataItems.length > 0) {
    let set = new Set(dataItems.map(JSON.stringify));
    arrSinDuplicaciones = Array.from(set).map(JSON.parse);

    console.log("arrSinDuplicaciones ", arrSinDuplicaciones);
  }

  function hideModal() {
    setShowWarning(false)
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
                <Text
                  ml={"13.5%"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                  w={"80%"}
                  fontSize={21}
                >
                  No podés anotarte a esta materia :(
                </Text>
                <Text marginTop={"5%"} marginLeft={"6.5%"} fontSize={12} textAlign={"center"}>
                  Primero tenés que aprobar:
                </Text>
                <HStack
                  justifyContent={"center"}
                  p={2}
                  flexWrap={"wrap"}
                  flexDirection={"column"} // Cambia la dirección del flujo a vertical
                >
                  {arrSinDuplicaciones &&
                    arrSinDuplicaciones?.map((item, i) => (
                      <Box
                        p={1}
                        style={{ display: "flex", flexDirection: "row" }}
                        key={item.name}
                        px={2}
                      >
                        <Text>-</Text>
                        <Text fontSize={10} textAlign={"left"}>
                          {" "}
                          {/* Alinea el texto a la izquierda */}
                          {item.name}
                        </Text>
                      </Box>
                    ))}
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
                  <Box height={moderateScale(8)} width={moderateScale(8)} borderRadius="full" background={"#DA673A"}></Box>
                </Text>
              <Text
              ml={2}
                style={
                  [{ fontSize: moderateScale(12) }, fontStyles.poppins400]
                }
                w={"100%"}
                numberOfLines={3}
                >
                No podés anotarte a esta materia sin terminar el nivel anterior
              </Text>
              </Box>
            ) : (
              <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              w={"100%"}
              >
                <Text fontSize={15}>
                  ¿Querés agregar una nota en esta materia?
                </Text>                
              </Box>
            )}
          </FormControl>
          <Button.Group space={2} mt={2}>
            {!currentSubj?.available ? (
            
              <DefaultButton buttonStyle={{
                backgroundColor: "#DA673A",
                borderRadius: moderateScale(8),
                height: verticalScale(45),
                width: 500,
                maxWidth: screenWidth - (screenWidth / 5),
                // paddingTop: verticalScale(2)
              }}
                textStyle={
                  {
                    fontSize: moderateScale(14),
                    fontWeight:"500",
                    color: "white",
                  }
                }
  
                containerStyle={{
                  marginBottom: PixelRatio.roundToNearestPixel(15),
                }}
  
                title="Entiendo"
                callBack={hideModal} />
  
            ) : (
              <>
                <Button
                  px={5}
                  bg={"#2972FE"}
                  isLoading={loading}
                  _text={{ fontSize: 10.65 }}
                  onPress={() =>
                    createNote(
                      currentSubj?.id,
                      setLoading,
                      setInfoUserSubj,
                      infoUserSubj,
                      setShowNotes,
                      setShowWarning,
                      setUpdater,
                      updater,
                      userdata
                    )
                  }
                >
                  Si
                </Button>
                <Button
                  px={5}
                  variant={"link"}
                  isLoading={loading}
                  _text={{ fontSize: 10.65 }}
                  onPress={() => hideModal()}
                >
                  No
                </Button>
              </>
            )}
          </Button.Group>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

export function ModalWarning2({ showWarning, setShowWarning }) {
  const dispatch = useDispatch();

  const blockNotice = () => {
    dispatch(rememberNotice({ type: REMEMBER_NOTICE, value: true }))
  }

  const closeModal = () => {
    blockNotice();
    setShowWarning(false)
  };

  return (
    <Modal
      isOpen={showWarning}
      animationPreset={"slide"}
      size={"xl"}
      onClose={() => {
        blockNotice();
        setShowWarning(false)
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

          {/* <FormControl maxWidth={"100%"} pl={"5%"} pr={"18%"}> */}
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
                  No se permiten las faltas de respeto de ningún tipo, insultos
                  o agresiones.
                </Text>
              </Box>
              <Box
              display={"flex"}
              flexDirection={"row"}
              // alignItems={"center"}
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
              alignItems={"center"}>
                <Box 
                height={moderateScale(8)}
                width={moderateScale(8)} 
                borderRadius="full" 
                background={"#DA673A"}/>
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
                  {/* Alinea el texto a la izquierda */}
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
                  {/* Alinea el texto a la izquierda */}
                  Baneo completo y expulsión de la app.
                </Text>
              </Box>
            </HStack>
          {/* </FormControl> */}
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
             textStyle={
              {
                marginTop: verticalScale(10),
              }
            }         
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


export function ErrorModal({ isOpen, setOpen, message }: { isOpen: boolean, setOpen: Function, message?: string }) {
  return (
    <Modal
      isOpen={isOpen}
      size={"xs"}
      onClose={() => setOpen(false)}
      animationPreset={"fade"}
    >
      <Modal.Content
        backgroundColor={'white'}
        paddingTop={5}
      >
        <ExclamationComponent />
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

export function SuccessModal({ isOpen, setOpen, message }: { isOpen: boolean, setOpen: Function, message?: string }) {
  return (
    <Modal
      isOpen={isOpen}
      size={"xs"}
      onClose={() => setOpen(false)}
      animationPreset={"fade"}
    >
      <Modal.Content
        backgroundColor={'white'}
        paddingTop={5}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            width: 50,
            height: 50,
            borderRadius: 35,
            backgroundColor: "#4BB543",
            margin: 'auto'
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
