import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box, Heading, HStack, ScrollView, Spinner, Text } from "native-base";
import { getServices } from "../../utils/hooks/services";
import { HeaderBack } from "../../components/Header";
import AboutSubject_Item from "./AboutSubject_Item";
import BottomTab from "../../components/BottomTab";
import Container from "../../components/Container";

function AboutSubject({ route, navigation, value }) {
  const user = useSelector((state: any) => state.user.userdata);
  const [loading, setLoading] = useState(false);
  const [subjCategory, setSubjCategory] = useState({
    total: 0,
    on: 0,
    prom: 0,
    data: [],
  });
  const [updater, setUpdater] = useState(false);

  useEffect(() => {
    if (user.userRole[0]?.role?.name === "Student" && user.career) {
      setLoading(true);
      getServices(`subject-category/all/${user.career.id}`)
        .then(({ data }: any) => {
          // console.log("data loaded", data);
          // console.log("subjCategory loaded", JSON.stringify(subjCategory));

          setSubjCategory({
            ...subjCategory,
            total: data.total,
            on: data.on,
            prom: data.prom,
            data: data.data,
          });
        })
        .catch((error) => {
          __DEV__ &&
            console.log("🚀 ~ file: AboutSubject ~ line 22 ~ error", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [updater]);

  return (
    <Container>
      {!value && <HeaderBack title={"Materias"} />}

      <ScrollView>
        {!loading ? null : (
          <HStack space={2} justifyContent="center">
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="brand.primary" fontSize="md">
              Cargando
            </Heading>
          </HStack>
        )}

        {subjCategory.data.length ? (
          <AboutSubject_Item
            subjCategory={subjCategory}
            nav={navigation}
            updater={updater}
            setUpdater={setUpdater}
          />
        ) : !subjCategory.data.length && loading === false ? (
          <Text mx={8} fontWeight={"bold"} color={"primary.100"} fontSize={20}>
            No Hay materias para mostrar
          </Text>
        ) : null}
        <Box mb={32} />
      </ScrollView>
      {!value && <BottomTab route={route} navigation={navigation} />}
    </Container>
  );
}

export default AboutSubject;
