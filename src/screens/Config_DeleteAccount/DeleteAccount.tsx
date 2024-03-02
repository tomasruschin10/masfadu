import {} from "native-base";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { TouchableOpacity, Text, View, ScrollView } from "react-native";

import { updateMessage } from "../../redux/actions/message";
import { store } from "../../redux/store";
import { updatetoken } from "../../redux/actions/token";
import { removemenu } from "../../redux/actions/menu";
import { updateUserdata } from "../../redux/actions/user";
import { deleteServices } from "../../utils/hooks/services";

function DeleteAccount({ route, navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.userdata);

  const deleteUserAccount = () => {
    const url = `user/${user.id}`;

    return deleteServices(url);
  };

  const DeleteAccount = async () => {
    try {
      const { status } = await deleteUserAccount();
      if (status === 200) {
        dispatch(
          updateMessage({
            body: "Cuenta eliminada con éxito",
            open: true,
            type: "success",
          })
        );
        store.dispatch(updatetoken(""));
        store.dispatch(updateUserdata({}));
        store.dispatch(removemenu());
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
    } catch (err) {
      console.error("Error al enviar la sugerencia:", err);
    }
  };

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 22,
          paddingTop: 20,
          justifyContent: "space-between",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <AntDesign name="warning" size={70} color="#DA673A" />
          <Text
            style={{
              fontSize: 20,
              color: "#DA673A",
              marginBottom: 20,
              marginTop: 5,
              textAlign: "center",
            }}
          >
            Cuidado
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#DA673A",
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            Estás seguro que querés borrar tu cuenta?
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#DA673A",
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            Esto eliminará toda tu información personal de nuestra base de
            datos, y perderás tu acceso actual.
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: "90%",
            position: "absolute",
            bottom: "-180%",
            marginBottom: 10,
            backgroundColor: "#DA673A",
            borderRadius: 8,
            height: 45,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
          }}
          onPress={() => DeleteAccount()}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              textAlign: "center",
              color: "white",
            }}
          >
            Borrar cuenta
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default DeleteAccount;
