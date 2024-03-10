import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Pressable, View} from 'react-native';
import { ScrollView, Text } from "native-base";
import { useDispatch, useSelector } from 'react-redux';
import { updateModal } from '../../redux/actions/user';

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
        setModalVisible(!modalVisible);
        handleModal()
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
          w="auto"
          fontWeight={700}
          fontFamily="Manrope"
          fontSize={24}
          mb={30}
          style={styles.textModal}
          >
            Acción no permitida para visitantes
          </Text>
          <View style={styles.contBtn} >
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
          </View>
        </View>
      </View>
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
