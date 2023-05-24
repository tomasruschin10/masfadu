import { Box, Button, ScrollView, Text } from "native-base";
import * as React from "react";
import { HeaderBack } from "../../components/Header";
import { getServices, putServices } from "../../utils/hooks/services";
import ButtonBordered from "./components/ButtonBordered";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatetoken } from "../../redux/actions/token";
import { getUserDataWithToken } from "../../utils/storage";

function On2Screen({ route, navigation }) {
  const [carrier, setCarrier] = React.useState(0);
  const [career, setCareer] = React.useState([]);
  const { userdata } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getServices("career/all")
      .then((res: any) => {
        setCareer(res.data);
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

  const applyCareer = () => {
    putServices(`auth/update/${userdata.uid}`, { career_id: carrier })
      .then((res: any) => {
        setCareer(res.data);
      })
      .catch((error) => {
        if (__DEV__) {
          console.log(
            "🚀 ~ file: On2Screen.tsx ~ line 21 ~ getServices ~ error",
            error
          );
        }
      })
      .finally(() => {
        getServices("auth/validate-token")
          .then(({ data }: any) => {
            dispatch(updatetoken(data.token));
            getUserDataWithToken(data.token);
            navigation.navigate("Home");
          })
          .catch((error) => {
            if (__DEV__) {
              console.log(
                "🚀 ~ file: On2Screen.tsx ~ line 21 ~ getServices ~ error",
                error
              );
            }
          });
      });
  };

  return (
    <Box backgroundColor={"background"} h="100%">
      <HeaderBack title={"Elegí tu carrera"} />
      <ScrollView>
        <Box px={5} alignContent={"center"} mb={10} mt={2}>
          <Text>
            Vas a encontrar todo lo que necesitás para manejarte en Fadu.
          </Text>

          <Box
            my={10}
            flexDir={"row"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
          >
            {career.length > 0 ? (
              career.map((item) => {
                return (
                  <ButtonBordered
                    carrier={carrier}
                    setCarrier={setCarrier}
                    created_at={item.created_at}
                    id={item.id}
                    key={item.id}
                    image={item.image.url}
                    image_id={item.image_id}
                    name={item.name}
                    updated_at={item.updated_at}
                  />
                );
              })
            ) : (
              <Box height={"80%"} />
            )}
          </Box>
        </Box>
      </ScrollView>

      <Button
        position={"absolute"}
        opacity={carrier < 1 ? 0.5 : 1}
        disabled={carrier < 1}
        bottom={5}
        onPress={() => applyCareer()}
        mb={3}
        w="90%"
        alignSelf={"center"}
      >
        Siguiente
      </Button>
    </Box>
  );
}

export default On2Screen;
