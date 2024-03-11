import React, { useEffect, useState } from "react";
import { TouchableHighlight, TouchableOpacity, View } from "react-native";
import { AntDesign, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Avatar, Box, Icon, IconButton, ScrollView, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";

import BottomTab from "../../components/BottomTab";
import Container from "../../components/Container";
import { HeaderBack } from "../../components/Header";
import { getServices, deleteServices } from "../../utils/hooks/services";
import { ModalDeleteOpinion } from "../AboutSubject/Modals";
import { updateModal } from "../../redux/actions/user";

const Resp = ({
  description,
  opinion_id,
  student_id,
  created_at,
  updated_at,
  student,
  id,
  more,
  seeMore,
}) => {
  return (
    <Box flexDir={"row"} bg={"#F4F6F9"} py="7" rounded={"2xl"} mb={5} pr={4}>
      <Box mx="4">
        <Avatar
          bg="brand.primary"
          source={{ uri: student?.image?.url }}
          size="md"
        ></Avatar>
      </Box>

      {description.length > 75 ? (
        <Box bg={"#F4F6F9"} flex={1}>
          {more == id ? (
            <Text color="#09101D" fontSize={10}>
              {description}
            </Text>
          ) : (
            <Text color="#09101D" fontSize={10} height={6}>
              {description}
            </Text>
          )}
          <Box flexDir={"row"} justifyContent={"space-between"} mt={3}>
            <TouchableOpacity onPress={() => seeMore(id)}>
              {more == id ? (
                <Text></Text>
              ) : (
                <Text fontSize={12} color="#9A9A9A">
                  Ver más
                </Text>
              )}
            </TouchableOpacity>
            <Text fontSize={12} color="#9A9A9A" mr={5}>
              {created_at.substring(0, 10)}
            </Text>
          </Box>
        </Box>
      ) : (
        <Box bg={"#F4F6F9"} flex={1}>
          <Text color="#09101D" fontSize={10}>
            {description}
          </Text>
          <Box flexDir={"row"} justifyContent={"space-between"} mt={3}>
            <Text fontSize={12} color="#9A9A9A" mr={5}>
              {created_at.substring(0, 10)}
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};

function OpinionThread({ route, navigation }) {
  const {
    anonymous,
    student,
    title,
    description,
    created_at,
    opinionTags,
    idOpinion,
    answersCount,
    value,
  } = route.params;
  const [answerOpinions, setAnswerOpinions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [reload, setReload] = useState(false);
  const [more, seeMore] = useState(null);
  const [menuShow, setMenu] = useState(false);
  const user = useSelector((state: any) => state.user.userdata);
  console.log(route.params.student, "||", user);

  useEffect(() => {
    getServices(`opinion-answer/all?opinion_id=${idOpinion}`)
      .then(({ data }: any) => {
        setAnswerOpinions(data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload, value]);

  const dispatch = useDispatch()
  const handleNavigate = (route: string, additional?: any) => {
    if (user?.userRole[0]?.role?.name === "Visit") {
      dispatch(updateModal(true))
      return
    }
    navigation.navigate(route, additional)
  }

  const handleModal = () => {
    if (user?.userRole[0]?.role?.name === "Visit") {
      dispatch(updateModal(true))
      return
    }
    setShowWarning(true)
  }

  const deleteOpinion = () => {
    try {
      setLoading(true);
      deleteServices(`opinion/delete/${idOpinion}`)
        .then(({ status }: any) => {
          if (status === 200) {
            navigation.goBack();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <HeaderBack
        title="Opiniones"
        headerWithIcon={
          answersCount === 0 && student.id === user.id ? (
            <Ionicons name="trash-outline" size={27} color={"black"} />
          ) : undefined
        }
        onPressIcon={
          answersCount === 0 ? () => handleModal() : undefined
        }
      />
      <ScrollView>
        <Box mx="5" mt={6}>
          <Box flexDir={"row"} bg={"#F4F6F9"} py="5" rounded={8} pr={4}>
            <Box mx="4">
              {anonymous ? (
                <FontAwesome name="user-secret" size={35} />
              ) : (
                <Avatar
                  bg="brand.primary"
                  source={{ uri: student.image?.url }}
                  size="md"
                ></Avatar>
              )}
            </Box>

            <Box flex={1}>
              <Text fontSize={16} fontWeight="bold" mb="1">
                {title}
              </Text>
              <Text fontSize={10}>{description}</Text>
              <Text color="#A8A8A8" fontSize={12} my={3}>
                {opinionTags.length > 0
                  ? opinionTags.map(
                      (i) => i.tag.name != "" && `#${i.tag.name} `
                    )
                  : ""}
              </Text>
              <Box flexDir={"row"} justifyContent={"space-between"}>
                <Text fontSize={12}>{answerOpinions.length} respuestas</Text>
                <Text fontSize={12} mr={5}>
                  {created_at.substring(0, 10)}
                </Text>
              </Box>
            </Box>
          </Box>

          <Box flexDir={"row"} mb={3} mt={5} justifyContent={"space-between"}>
            <Text fontSize={17.5} fontWeight={"600"}>
              Respuestas al Hilo
            </Text>
            <IconButton
              onPress={() => setReload(!reload)}
              rounded={8}
              backgroundColor={"#fff"}
              icon={
                <Icon
                  as={AntDesign}
                  name="reload1"
                  size="sm"
                  color={"muted.400"}
                />
              }
            />
          </Box>

          {answerOpinions.length > 0 &&
            answerOpinions.map((item) => (
              <Resp
                key={item.id}
                id={item.id}
                description={item.description}
                opinion_id={item.opinion_id}
                student_id={item.student_id}
                created_at={item.created_at}
                updated_at={item.updated_at}
                student={item.student}
                more={more}
                seeMore={seeMore}
              />
            ))}
        </Box>
      </ScrollView>

      <Box
        bg="#E85E29"
        shadow={"3"}
        borderRadius="lg"
        position={"absolute"}
        right={5}
        bottom={"32"}
        zIndex={100}
      >
        <TouchableHighlight
          onPress={() =>
            handleNavigate("ReplyToTheThread", {
              student: student,
              idOpinion: idOpinion,
              anonymous: anonymous,
              title: title,
              description: description,
              created_at: created_at,
              opinionTags: opinionTags,
              value: value,
            })
          }
          underlayColor={""}
        >
          <Box
            h={42}
            flexDir={"row"}
            alignItems={"center"}
            px="2"
            justifyContent={"center"}
          >
            <Feather name="edit" size={20} color="white" />
            <Text color="white" fontSize={13} ml={2}>
              Responder hilo
            </Text>
          </Box>
        </TouchableHighlight>
      </Box>

      <Box height={130}></Box>
      <ModalDeleteOpinion
        showWarning={showWarning}
        loading={loading}
        setShowWarning={setShowWarning}
        onPress={deleteOpinion}
      />
      <BottomTab setMenu={setMenu} route={route} navigation={navigation} />
    </Container>
  );
}

export default OpinionThread;
