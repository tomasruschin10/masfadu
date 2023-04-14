import { useRef, useState, useEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather, AntDesign, MaterialCommunityIcons, EvilIcons } from '@expo/vector-icons';
import { Box, Button, Center, FormControl, HStack, Input, KeyboardAvoidingView, Modal, Text, VStack } from 'native-base';
import { deleteNote, deletePartial, createNote, updateOrCreateScorePartial, updateNote } from './ModalFunctions';

export function ModalNotes({ showNotes, setShowNotes, infoUserSubj, updater, setUpdater }) {
    const [form, setForm] = useState({ user_id: null, subject_id: null, score: null, finish: null, extra_score: [], })
    const dispatch = useDispatch()

    useEffect(() => {setForm(infoUserSubj)}, [infoUserSubj])
    const [showModal2, setShowModal2] = useState({ state: false, name: '', score: 1, extra_id: null, placeholder: false });
    const [loading, setLoading] = useState(false)
    const initialRef = useRef(null);

    return (
        <Center>
            {/* MODAL */}
            <Modal isOpen={showNotes} animationPreset={'slide'} onClose={() => setShowNotes(false)} size="full" justifyContent={'flex-end'}>
                <Modal.Content minHeight={312} borderTopLeftRadius={'3xl'} borderBottomLeftRadius={'xs'} borderTopRightRadius={'xs'} borderBottomRightRadius={'xs'} bg={'#3A71E1'}>
                    <Modal.Header pb={0} borderBottomWidth={0} bg={'#3A71E1'} flexDir={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Text color={'white'} fontSize={16} fontWeight={'600'}>Notas de Cursada</Text>
                        <HStack alignItems={'center'}>
                            <Button isLoading={loading}></Button>
                            <EvilIcons name="trash" size={24} color="#EC5F5F" onPress={() => form.extra_score.length === 0 
                                ? Alert.alert("Importante", "¿Deseas eliminar la nota final?", [
                                    { text: 'Cancelar', onPress: () => console.log(''), style: 'cancel' },
                                    { text: 'Aceptar', onPress: () => deleteNote(setLoading, setUpdater, updater, setShowNotes, infoUserSubj, dispatch) }
                                ])
                                : Alert.alert("Importante", "Primero debes eliminar las notas parciales para eliminar la nota final!", [
                                    { text: 'Ok, genial!', onPress: () => console.log(''), style: 'cancel' },
                                ])
                            }
                            />
                            <TouchableOpacity onPress={() => updateNote(setLoading, setUpdater, updater, setShowNotes, infoUserSubj, form, dispatch)}>
                                <Text mx={4} color={'white'}>Guardar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setShowModal2({ ...showModal2, state: true, score: 1, name: "", extra_id: null, placeholder: false })}>
                                <Text color={'white'} fontSize={25}>+</Text>
                            </TouchableOpacity>
                        </HStack>
                    </Modal.Header>
                    <Modal.Body>
                        <VStack space={3}>
                            <HStack px={3} alignItems="center" justifyContent="space-between" py={1} mb={1} bg={'#F7FAFC'} rounded={'md'}>
                                <Text color={'#3A71E1'} fontSize={12}>Nota Final</Text>
                                <HStack alignItems={'center'}>
                                    <TouchableOpacity onPress={() => setForm({ ...form, score: Math.max(1, form.score - 1) })}>
                                        <AntDesign name="minuscircleo" size={18} color="#3A71E1" />
                                    </TouchableOpacity>
                                    <Text color="#3A71E1" mx={4} fontSize={16} fontWeight={'600'}>{form.score || 0}</Text>
                                    <TouchableOpacity onPress={() => setForm({ ...form, score: Math.min(10, form.score + 1) })}>
                                        <AntDesign name="pluscircleo" size={18} color="#3A71E1" />
                                    </TouchableOpacity>
                                </HStack>
                            </HStack>
                            {form.extra_score.length > 0 && form.extra_score.map(item => (
                                <TouchableOpacity key={item.id} onPress={() => setShowModal2({
                                    ...showModal2, state: true, name: item.name, score: item.score, extra_id: item.id, placeholder: true
                                })}>
                                    <HStack px={3} borderBottomWidth={1} borderBottomColor={'#EFEFEF'} pb={3} alignItems="center" justifyContent="space-between">
                                        <Text color={'white'} fontSize={12}>{item.name}</Text>
                                        <HStack alignItems={'center'}>
                                            <Text color="white" mr={4} fontSize={16} fontWeight={'600'}>{item.score}</Text>
                                            <MaterialCommunityIcons name="greater-than" size={18} color="white" />
                                        </HStack>
                                    </HStack>
                                </TouchableOpacity>
                            ))}
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer bg={'#3A71E1'} borderTopWidth={0}></Modal.Footer>
                </Modal.Content>
            </Modal>
            {/* SUBMODAL */}
            <Modal isOpen={showModal2?.state} animationPreset={'slide'} onClose={() => setShowModal2({ ...showModal2, state: false })} size="full" justifyContent={'flex-end'} initialFocusRef={initialRef}>
                <KeyboardAvoidingView behavior={'padding'}>
                    <Modal.Content minHeight={312} borderTopLeftRadius={'3xl'} borderBottomLeftRadius={'xs'} borderTopRightRadius={'xs'} borderBottomRightRadius={'xs'} bg={'#3A71E1'}>
                        <Modal.Header pb={0} borderBottomWidth={0} bg={'#3A71E1'} flexDir={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Box>
                                <TouchableOpacity  onPress={() => showModal2?.placeholder ? updateOrCreateScorePartial(showModal2?.extra_id, setLoading, showModal2, infoUserSubj, setUpdater, updater, setShowModal2, setShowNotes, dispatch) : updateOrCreateScorePartial(showModal2?.extra_id, setLoading, showModal2, infoUserSubj, setUpdater, updater, setShowModal2, setShowNotes, dispatch)}>
                                    <Text color={'white'}>Guardar</Text>
                                </TouchableOpacity>
                            </Box>
                            <Button display={loading ? 'flex' : 'none'} isLoading={loading}></Button>

                            <Text onPress={() => deletePartial(showModal2?.extra_id, setLoading, setUpdater, updater, setShowNotes, setShowModal2, showModal2, dispatch)} color={'white'} display={showModal2?.placeholder ? 'flex' : 'none'}>Eliminar</Text>
                        </Modal.Header>
                        <Modal.Body>
                            <VStack space={3}>
                                <FormControl>
                                    <Input
                                        mb={4}
                                        fontSize={18}
                                        placeholder=""
                                        ref={initialRef}
                                        color={'#FFFFFF'}
                                        bgColor={'#3A71E1'}
                                        borderBottomWidth={1}
                                        value={showModal2?.name}
                                        borderBottomColor={'#EFEFEF'}
                                        isDisabled={showModal2?.placeholder}
                                        onChangeText={text => setShowModal2({ ...showModal2, name: text })}
                                    />
                                </FormControl>
                                <HStack justifyContent={'center'}>
                                    <HStack alignItems={'center'} w={'100%'} justifyContent={'space-around'}>
                                        <TouchableOpacity onPress={() => setShowModal2({ ...showModal2, score: Math.max(1, showModal2?.score - 1) })}>
                                            <AntDesign name="minuscircleo" size={47} color="white" />
                                        </TouchableOpacity>
                                        <Text color="white" fontSize={47} fontWeight={'600'}>{showModal2?.score}</Text>
                                        <TouchableOpacity onPress={() => setShowModal2({ ...showModal2, score: Math.min(10, showModal2?.score + 1) })}>
                                            <AntDesign name="pluscircleo" size={47} color="white" />
                                        </TouchableOpacity>
                                    </HStack>
                                </HStack>
                            </VStack>
                        </Modal.Body>
                        <Modal.Footer bg={'#3A71E1'} borderTopWidth={0} mb={4}></Modal.Footer>
                    </Modal.Content>
                </KeyboardAvoidingView>
            </Modal>
        </Center>
    )
}

export function ModalWarning({ showWarning, setShowWarning, currentSubj, setInfoUserSubj, infoUserSubj, setShowNotes, setUpdater, updater }) {
    const [loading, setLoading] = useState(false)
    const userdata = useSelector((state: any) => state.user.userdata)
    
    return (
        <Modal isOpen={showWarning} animationPreset={'slide'} size={'xl'} onClose={() => setShowWarning(false)} mt={5}>
            <Modal.Content rounded={'2xl'}>
                <Modal.Body alignItems={'center'}>
                    <FormControl alignItems={'center'} mt={5}>
                        <Feather name="alert-triangle" size={24} color="#CCCED1" />
                    </FormControl>
                    <FormControl mt={4}>
                            { currentSubj?.available === false ?
                                <>
                                    <Text fontSize={15} textAlign={'center'}>
                                        Para anotarte en
                                        <Text fontFamily={'Poppins_400Regular_Italic'} textDecorationLine={'underline'}> {currentSubj?.name} </Text>
                                        primero tenés que terminar:
                                    </Text>
                                    <HStack justifyContent={'center'} space={2} p={2} flexWrap={'wrap'}>
                                        {currentSubj?.subjectParents?.map((item, i) => <Box rounded={40} px={2} bg={'gray.200'}><Text textAlign={'center'} numberOfLines={1}>{item.name}</Text></Box>)}
                                    </HStack>
                                </>
                                : currentSubj?.available === 0 ? 
                                    <Text fontSize={15} textAlign={'center'}>
                                        No puedes anotarte a esta materia hasta terminar el nivel anterior
                                    </Text>
                                :
                                    <Text fontSize={15} textAlign={'center'}>
                                        Desea anotarse a esta materia?
                                    </Text>
                            }
                    </FormControl>
                    <Button.Group space={2} mt={2}>
                        { !currentSubj?.available ?
                            <Button px={5} _text={{ fontSize: 10.65 }} bg={'#2972FE'} onPress={() => setShowWarning(false)}>OK, genial!</Button>
                            :
                            <>
                                <Button px={5} bg={'#2972FE'} isLoading={loading} _text={{ fontSize: 10.65 }} onPress={() => createNote(
                                    currentSubj?.id, setLoading, setInfoUserSubj, infoUserSubj, setShowNotes, setShowWarning, setUpdater, updater, userdata
                                )}>
                                    Si, genial!
                                </Button>
                                <Button px={5} variant={'link'} isLoading={loading} _text={{ fontSize: 10.65 }} onPress={() => setShowWarning(false)}>
                                    No
                                </Button>
                            </>
                        }
                    </Button.Group>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
}

export function ModalIcon({ showIcon, setShowIcon }) {
    return (
        <Modal isOpen={showIcon} size={'xs'} onClose={() => setShowIcon(false)} mt={5}>
            <Modal.Content>
                <Modal.Body alignItems={'center'}>
                    <FormControl>
                        <Text fontSize={10} textAlign={'center'}>Contenido bloqueado</Text>
                    </FormControl>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
}