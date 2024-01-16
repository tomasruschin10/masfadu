
import Alert from "../../components/alert/Alert";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Button,
  Center,
  CheckIcon,
  Input,
  ScrollView,
  Select,
  Stack,
  Text,
} from "native-base";
import { getServices, putServices } from "../../utils/hooks/services";
import { store } from "../../redux/store";
import { updateUserdata } from "../../redux/actions/user";
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";
import { updateMessage } from "../../redux/actions/message";

function ChangeCareer({ route, navigation }) {
  const userdata = useSelector((state: any) => state.user.userdata);
  const [selectCareer, setSelectCareer] = React.useState({ career_id: null });
  const [career, setCareer] = React.useState([]);
  const dispatch = useDispatch()
  const [alert, setAlert] = React.useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  useEffect(() => {
    getServices("career/all")
      .then(({ data }: any) => {
        userdata.career
          ? setCareer(data.filter((items) => items.id !== userdata.career.id))
          : setCareer(data);
      })
      .catch((error) => {
        if (__DEV__) {
          console.log(
            "🚀 ~ file: On2Screen.tsx ~ line 21 ~ getServices ~ error",
            error
          );
        }
      });
  }, [setCareer]);

  const sendForm = () => {
    if (selectCareer.career_id) {
      putServices(`auth/update/${userdata.id}`, selectCareer)
        .then(({ data }: any) => {
          store.dispatch(updateUserdata(data));
          dispatch(
            updateMessage({
              body: "Guardado con Exito!",
              open: true,
              type: "success",
            })
          );
        })
        .catch((err) =>
          dispatch(
            updateMessage({
              body: "Sucedió un error al Guardar su Carrera",
              open: true,
              type: "danger",
            })
          )
        );
    } else {
      dispatch(
        updateMessage({
          body: "Por favor Seleccione una Carrera",
          open: true,
          type: "danger",
        })
      );
    }
  };

  return (
    <ScrollView>
        {alert && (
        <Alert type={alert.type} message={alert.message} closeAlert={closeAlert} />
      )}
      <Stack space={5} m={5}>
        <Box>
          <Text
            fontSize={18}
            mb="2"
            color="brand.primary"
            fontWeight={"600"}
            fontFamily={"Poppins"}
          >
            Carrera actual
          </Text>
          <Input
            isDisabled={true}
            value={userdata.career ? userdata.career.name : ""}
            fontSize={"18"}
            bg={"#c4c4c41a"}
            textAlign={"left"}
            px={"2"}
            fontFamily={"Poppins"}
            placeholder="Diseño Gráfico"
          />
        </Box>
        <Box>
          <Text
            fontSize={18}
            mb="2"
            color="brand.primary"
            fontWeight={"600"}
            textAlign={"left"}
            fontFamily={"Poppins"}
          >
            Cambiar carrera
          </Text>
          {career.length > 0 ? (
            <Select
              selectedValue={selectCareer.career_id}
              minWidth="335"
              accessibilityLabel="Elegir Carrera"
              placeholder="Elegir Carrera"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) =>
                setSelectCareer({ ...selectCareer, career_id: itemValue })
              }
              textAlign={"left"}
            >
              {career.map((item) => (
                <Select.Item label={item.name} value={item.id} key={item.id} />
              ))}
            </Select>
          ) : (
            <Select
              rounded={"3xl"}
              textAlign={"center"}
              isDisabled
              accessibilityLabel="Elegir carrera"
              placeholder="No hay más carreras"
            ></Select>
          )}
        </Box>
        <Center>
        <Button
          onPress={() => sendForm()}
          isDisabled={!selectCareer.career_id}
          _pressed={{bgColor:'rgba(218, 103, 58, .5)'}}
          _text={{ fontSize: 14, fontWeight: '600', textAlign:'center' }}                           
          bg={"#DA673A"}
          // w="90%"
          py={5}
          color={'white'}
          px={'50px'}
          rounded={8}
        >
          Cambiar carrera
        </Button>
        </Center>
      </Stack>
    </ScrollView>
  );
}

export default ChangeCareer;
