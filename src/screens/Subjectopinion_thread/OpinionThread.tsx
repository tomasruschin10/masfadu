import React, { useEffect, useState } from "react";
import { TouchableHighlight, TouchableOpacity } from "react-native";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { Avatar, Box, Icon, IconButton, ScrollView, Text } from "native-base";
import BottomTab from "../../components/BottomTab";
import Container from "../../components/Container";
import { HeaderBack } from "../../components/Header";
import { getServices } from "../../utils/hooks/services";

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
    value,
  } = route.params;
  const [answerOpiniones, setAnswerOpiniones] = useState([]);
  const [reload, setReload] = useState(false);
  const [more, seeMore] = useState(null);

  useEffect(() => {
    getServices(`opinion-answer/all?opinion_id=${idOpinion}`)
      .then(({ data }: any) => {
        setAnswerOpiniones(data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload, value]);

  return (
    <Container>
      <HeaderBack title="Opiniones" />

      <ScrollView>
        <Box mx="5" mt={6}>
          <Box flexDir={"row"} bg={"#306EED"} py="5" rounded={"2xl"} pr={4}>
            <Box mx="4">
              {anonymous ? (
                <FontAwesome name="user-secret" size={35} color="white" />
              ) : (
                <Avatar
                  bg="brand.primary"
                  source={{ uri: student.image?.url }}
                  size="md"
                ></Avatar>
              )}
            </Box>

            <Box bg={"#306EED"} flex={1}>
              <Text color="white" fontSize={16} fontWeight="bold" mb="1">
                {title}
              </Text>
              <Text color="white" fontSize={10}>
                {description}
              </Text>
              <Text color="#A8A8A8" fontSize={12} my={3}>
                {opinionTags.length > 0
                  ? opinionTags.map(
                      (i) => i.tag.name != "" && `#${i.tag.name} `
                    )
                  : ""}
              </Text>
              <Box flexDir={"row"} justifyContent={"space-between"}>
                <Text fontSize={12} color="white">
                  {answerOpiniones.length} respuestas
                </Text>
                <Text fontSize={12} color="white" mr={5}>
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
              rounded={"xl"}
              backgroundColor={"primary.900"}
              icon={
                <Icon
                  as={AntDesign}
                  name="reload1"
                  size="sm"
                  color="primary.1000"
                />
              }
            />
          </Box>

          {answerOpiniones.length > 0 &&
            answerOpiniones.map((item) => (
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
        bg="#EC5F5F"
        shadow={"3"}
        borderRadius="lg"
        position={"absolute"}
        right={5}
        bottom={"32"}
        zIndex={100}
      >
        <TouchableHighlight
          onPress={() =>
            navigation.navigate("ReplyToTheThread", {
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
      <BottomTab route={route} navigation={navigation} />
    </Container>
  );
}

export default OpinionThread;
