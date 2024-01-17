import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Icon,
  IconButton,
  Input,
  Text,
  HStack,
  Spinner,
  Heading,
} from "native-base";
import { TouchableOpacity, View, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { RenderOpinion } from "../../utils/hooks/useMultiple";
import { getServices } from "../../utils/hooks/services";
import { store } from "../../redux/store";
import useSearchSubject from "../../utils/hooks/useSearchSubject";
import { ModalWarning2 } from "../../screens/AboutSubject/Modals";
import Container from "../../components/Container";
import SeeSubjectThread_Item from "../Subjectopinion_seesubjectthread/SeeSubjectThread_Item";
import Layout from "../../utils/LayoutHeader&BottomTab";
import WelcomePage from "../../components/welcomePages/WelcomePage";

function SubjectOpinions({ route, navigation, mainTitle }) {
  const { search, setSearch, filteredSubjects, allSubjects, loading } =
    useSearchSubject();
  const [showWarning, setShowWarning] = useState(true);  
  const [viewPage, setViewPage] = useState(false);
  const [selectedButton, setSelectedButton] = useState("Todo");
  const [allOpinions, setAllOpinions] = useState([]);
  const { notice } = useSelector((state: any) => state.notice);
  const state: any = store.getState();
  const colores = ["#E85E29"];

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const getData = async () => {
    const {
      userdata: { id },
    } = state.user;

    getServices(`opinion/all?offset=0&student_id=${id}`)
      .then(({ data }: any) => {
        setAllOpinions(data);
        console.log(data);
      })
      .catch((error) => {
        __DEV__ &&
          console.log("🚀 ~ file: SeeSubjectThread getServices:", error);
      });
  };

  return (
    <>
    {
      viewPage
      ? (
          <Container>
            <Layout
              route={route}
              navigation={navigation}
              title={`Opiniones de materias`}
              addButtonUrl={"CreateNewThread"}
            >
              <ScrollView keyboardShouldPersistTaps={"handled"}>
                <HStack
                  mt={0}
                  mb={3}
                  pr={4}
                  alignItems={"center"}
                  justifyContent="center"
                >
                  <MaterialIcons
                    name={"search"}
                    size={17}
                    color="gray"
                    style={{
                      position: "absolute",
                      left: "8.8%",
                      zIndex: 1,
                      marginRight: 4,
                    }}
                  />
                  <Input
                    style={{ marginLeft: "8%", borderRadius: 8 }}
                    onChangeText={(text) => setSearch(text)}
                    value={search}
                    isDisabled={allSubjects.length > 0 ? false : true}
                    rounded={8}
                    w={{ base: "80%", md: "25%" }}
                    pb="1"
                    type={"text"}
                    ml={4}
                    placeholder="Buscar "
                    placeholderTextColor="#666666"
                  />
                  <IconButton
                    onPress={() => {
                      setSearch("");
                    }}
                    ml="3"
                    rounded={8}
                    backgroundColor={"#FFFFFF"}
                    icon={
                      <Icon
                        as={AntDesign}
                        name="close"
                        color={search.length > 0 ? "red.500" : "muted.400"}
                      />
                    }
                  />
                </HStack>

                {filteredSubjects.length === 0 && loading === false && (
                  <Box mx={8}>
                    <Text fontWeight={"bold"} color={"primary.100"} fontSize={20}>
                      No hay hilos para mostrar
                    </Text>
                  </Box>
                )}

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    marginLeft: 35,
                    marginBottom: 18,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setSelectedButton("Todo")}
                    style={{
                      borderRadius: 0,
                      height: 28,
                      borderBottomLeftRadius: 2,
                      borderBottomStartRadius: 2,
                      marginRight: 20,
                      borderBottomWidth: selectedButton === "Todo" ? 1 : 0,
                      borderBottomColor: "#EB5E29",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: selectedButton === "Todo" ? "#EB5E29" : "#797979",
                      }}
                    >
                      Todo
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelectedButton("Mis Opiniones")}
                    style={{
                      borderRadius: 0,
                      borderBottomLeftRadius: 2,
                      height: 28,
                      borderBottomStartRadius: 2,
                      borderBottomWidth: selectedButton === "Mis Opiniones" ? 1 : 0,
                      borderBottomColor: "#EB5E29",
                    }}
                  >
                    <Text
                      style={{
                        borderRadius: 99,
                        textAlign: "center",
                        color:
                          selectedButton === "Mis Opiniones" ? "#EB5E29" : "#797979",
                      }}
                    >
                      Mis Opiniones
                    </Text>
                  </TouchableOpacity>
                </View>
                {!loading ? (
                  <Button display={"none"} />
                ) : (
                  <HStack mb={3} space={2} justifyContent="center">
                    <Spinner color="brand.primary" accessibilityLabel="Loading posts" />
                    <Heading color="brand.primary" fontSize="md">Cargando</Heading>
                  </HStack>
                )}
                {selectedButton === "Todo" ? (
                  filteredSubjects.length > 0 &&
                  filteredSubjects
                    .map((item) => (
                      <RenderOpinion
                        key={item.id}
                        border={false}
                        text={``}
                        title={item.name}
                        navigation={navigation}
                        mainTitle={mainTitle}
                        subject_id={item.id}
                        id={item.id}
                        redirect_to={"SeeSubjectThread"}
                        time={item.info}
                        hours={""}
                        method={""}
                        rating={item.opinionsCount}
                        firstLetter={item?.prefix || ""}
                        color={colores[Math.floor(Math.random() * colores.length)]}
                        // color={colores[Math.floor(Math.random() * colores.length)]}
                      />
                    ))
                    .reverse()
                ) : (
                  <Box mx={5} mb={32}>
                    {allOpinions.map((item) => (
                      <SeeSubjectThread_Item
                        key={item.id}
                        idOpinion={item.id}
                        navigation={navigation}
                        title={item.title}
                        description={item.description}
                        created_at={item.created_at}
                        opinionTags={item.opinionTags}
                        anonymous={item.anonymous}
                        student={item.student}
                        answersCount={item.answersCount}
                        tags={item.opinionTags}
                        materia={item.subject.name}
                        professor={item.professor}
                      />
                    ))}
                  </Box>
                )}

                <Box mb={"24"} />
              </ScrollView>
              <ModalWarning2
                showWarning={showWarning && notice?.value !== true}
                setShowWarning={setShowWarning}
              />
            </Layout>
          </Container>
      )
      : (
        <WelcomePage hidde={setViewPage} title="Opiniones de materias" />
      )
    }
    </>
  );
}

export default SubjectOpinions;
