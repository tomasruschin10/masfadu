import React, { useEffect, useState } from "react";
import { Box, Heading, HStack, ScrollView, Spinner, Text } from "native-base";
import { useSelector } from "react-redux";

import AboutSubject_Item from "./AboutSubject_Item";
import BottomTab from "../../components/BottomTab";
import Container from "../../components/Container";
import Menu from "../Menu/Menu";

import { getServices } from "../../utils/hooks/services";
import Layout from "../../utils/LayoutHeader&BottomTab";

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
  const [menuShow, setMenu] = useState(false);

  useEffect(() => {
    if (
      (user.userRole[0]?.role?.name === "Student" ||
        user.userRole[0]?.role?.name === "Visit") &&
      user.career
    ) {
      setLoading(true);
      getServices(`subject-category/all/${user.career.id}`)
        .then(({ data }: any) => {
          setSubjCategory({
            ...subjCategory,
            total: data.total,
            on: data.on,
            prom: data.prom,
            data: data.data,
          });
        })
        .catch((error) => {
          __DEV__ && console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [updater, setUpdater]);

  return (
    <Container>
      <Layout route={route} navigation={navigation} title={`Materias`}>
        {menuShow ? (
          <Menu navigation={navigation} route={route} setMenu={setMenu} />
        ) : null}

        <ScrollView backgroundColor={"#e8eef3"}>
          {loading ? (
            <HStack space={2} justifyContent="center">
              <Spinner
                accessibilityLabel="Loading posts"
                color="brand.primary"
              />
              <Heading color="brand.primary" fontSize="md">
                Cargando
              </Heading>
            </HStack>
          ) : (
            <>
              {subjCategory.data.length > 0 ? (
                <AboutSubject_Item
                  subjCategory={subjCategory}
                  nav={navigation}
                  updater={updater}
                  setUpdater={setUpdater}
                />
              ) : (
                <Text
                  mx={8}
                  fontWeight={"bold"}
                  color={"brand.primary"}
                  fontSize={20}
                >
                  No hay materias para mostrar
                </Text>
              )}
              <Box mb={32} />
            </>
          )}
        </ScrollView>

        {!value && (
          <BottomTab setMenu={setMenu} route={route} navigation={navigation} />
        )}
      </Layout>
    </Container>
  );
}

export default AboutSubject;
