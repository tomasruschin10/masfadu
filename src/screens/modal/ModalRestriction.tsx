import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Pressable, View, TouchableOpacity} from 'react-native';
import { ScrollView, Text, HStack, Box, Button } from "native-base";
import { useDispatch, useSelector } from 'react-redux';
import { updateModal } from '../../redux/actions/user';
import DefaultButton from "../../components/DefaultButton";

import {
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
  EvilIcons,
} from "@expo/vector-icons";
import { fontStyles } from '../../utils/colors/fontColors';
import { horizontalScale, moderateScale, verticalScale } from '../../utils/media.screens';

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

export default function ModalRestriction ({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch()

  const handleModal = (route?: string ) => {
    setModalVisible(!modalVisible)
    if (route) {
      navigation.navigate(route)
    }
    dispatch(updateModal(false))
  }
  const isActive = useSelector((state:any) => state.modal)
  console.log(isActive)

  useEffect(() => {
    if (isActive !== modalVisible) {
      setModalVisible(isActive)
    }
  }, [isActive]) 


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        handleModal()
      }}>
      <TouchableOpacity
      style={styles.centeredView}
      onPressOut={() => handleModal()}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
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
            px={"1%"}
            justifyContent={"center"}
            flexDirection={"column"}
            marginBottom={'5%'}
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
                  Necesitás iniciar sesión o registrarte primero!
                </Text>
              </Box>

            </HStack>
            <Button.Group style={{
              display: 'flex',
              flexDirection: 'column'
            }} space={2} my={"1%"}>
            <DefaultButton
              buttonStyle={{
                height: horizontalScale(40),
                backgroundColor: "#DA673A",
                paddingHorizontal: horizontalScale(45),
                width: 300,
                alignItems: "center",
                borderRadius: moderateScale(8),
              }}
              textStyle={{
                marginTop: verticalScale(10),
              }}
              title="Iniciar sesión"
              callBack={() => handleModal('Login')}
            />
            </Button.Group>
            <Button.Group style={{
              display: 'flex',
              flexDirection: 'column'
            }} space={2} my={"1%"}>
              <DefaultButton
                buttonStyle={{
                  height: horizontalScale(40),
                  backgroundColor: "#FFF",
                  paddingHorizontal: horizontalScale(45),
                  width: 300,
                  alignItems: "center",
                  borderRadius: moderateScale(8),
                  borderColor: "#DA673A",
                  borderWidth: 2
                }}
                textStyle={{
                  marginTop: verticalScale(10),
                  color: "#DA673A",
                }}
                title="Registrarse"
                callBack={() => handleModal('Registro')}
              />
            </Button.Group>
            {/* <View style={styles.contBtn} >
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleModal('Registro')}>
                <Text style={styles.textStyle}>Registrarse</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleModal('Login')}>
                <Text style={styles.textStyle}>Iniciar sesión</Text>
              </Pressable>
            </View> */}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    maxWidth:'90%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#EB5E29',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textModal: {
    textAlign: 'center'
  },
  contBtn: {
    width: '90%',
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
