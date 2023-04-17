import { Box, Text, HStack } from "native-base";
import { Image, TouchableOpacity } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useEffect } from "react";

function AboutSubject_Logic({
  subject,
  nav,
  setShowWarning,
  setCurrentSubj,
  infoUserSubj,
  setInfoUserSubj,
  setShowNotes,
}) {
  const { available, id, name, subjects, userSubject } = subject;

  useEffect(() => {
    console.log(subject);
  }, []);

  return (
    // Materias y puntajes
    <HStack
      mt="3"
      justifyContent={"space-between"}
      style={{
        backgroundColor: "#eff6ff",
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 10,
      }}
    >
      <Box
        justifyContent={"center"}
        flex={1}
        // bg={
        //   !available || !userSubject || userSubject?.score < 4
        //     ? "white"
        //     : "primary.600"
        // }
        rounded={"xl"}
      >
        <HStack
          pl={4}
          pr={3}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text
            pr={2}
            flex={1}
            bold={true}
            fontSize={13}
            numberOfLines={2}
            // color={
            //   !available
            //     ? "#C4C4C4"
            //     : !userSubject || userSubject?.score < 4
            //     ? "primary.100"
            //     : "light.100"
            // }
            color="black"
          >
            {name}
          </Text>
          {/* TODO: para que es todo esto ? */}
          {/* 
          {(available && !userSubject) || !available ? null : available &&
            userSubject.finish ? (
            <AntDesign
              name={userSubject?.score < 4 ? "closecircleo" : "checkcircleo"}
              color={userSubject?.score < 4 ? "#FAA72A" : "white"}
              size={20}
            />
          ) : available && !userSubject.finish ? (
            <Box borderWidth={"1"} borderColor={"#3A71E1"} px={1} py={"0.5"}>
              <Text color={"#3A71E1"} fontSize={10}>
                En curso
              </Text>
            </Box>
          ) : null} */}
          <Image
            source={require("../../../assets/icons/emoticons.png")}
            style={{ width: 30, height: 30 }}
          />
        </HStack>
      </Box>

      <TouchableOpacity
        style={{
          //   backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() =>
          nav.navigate("SeeSubjectThread", {
            rating: 14,
            title: name,
            description: "",
            time: "",
            hours: "",
            method: "",
            subject_id: id,
            id: id,
            firstLetter: subject.prefix,
          })
        }
      >
        {/* <MaterialCommunityIcons
            name="message-text-outline"
            size={25}
            color="#CCCED1"
          /> */}
        <Entypo
          name="dots-three-vertical"
          size={22}
          style={{ marginRight: 6, padding: 2 }}
          color="#656f77"
        />
      </TouchableOpacity>
      {available && userSubject?.score ? (
        <TouchableOpacity
          style={{
            // backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            setInfoUserSubj({
              ...infoUserSubj,
              score: userSubject?.score,
              USERSUBJECT: userSubject?.id,
              user_id: userSubject?.user_id,
              subject_id: userSubject?.subject_id,
              extra_score: userSubject?.extra_score,
              finish: userSubject?.finish == true ? 1 : 0,
            });
            setShowNotes(true);
          }}
        >
          {/* <Box style={{ backgroundColor: "cyan" }}> */}
          <Text
            color={userSubject?.score < 4 ? "#FAA72A" : "#3a71e1"}
            fontWeight={"600"}
            textAlign={"center"}
            fontSize={32}
            style={{ marginRight: 10 }}
          >
            {userSubject?.score}
          </Text>
          {/* <Text
              position={"absolute"}
              bottom={-2}
              left={0}
              right={0}
              color={"white"}
              textAlign={"center"}
              fontSize={10}
              pb={1}
            >
              Info
            </Text> */}
          {/* </Box> */}
        </TouchableOpacity>
      ) : available && !userSubject ? (
        <TouchableOpacity
          onPress={() => {
            setShowWarning(true);
            setCurrentSubj({ ...subject, dis: 1 });
          }}
        >
          {/* <Box
            borderColor={"#D7D7D7"}
            borderWidth={1}
            alignItems={"center"}
            justifyContent={"center"}
            w={"53"}
            bg={"white"}
            rounded={"xl"}
            h={"56px"}
          > */}
          <Text color={"blue.700"} textAlign={"center"} fontSize={32}>
            +
          </Text>
          {/* </Box> */}
        </TouchableOpacity>
      ) : !available ? (
        <TouchableOpacity
          onPress={() => {
            setShowWarning(true);
            setCurrentSubj({ ...subject, dis: 0 });
          }}
        >
          {/* <Box
            alignItems={"center"}
            justifyContent={"center"}
            w={"50"}
            rounded={"xl"}
            h={"56px"}
          > */}
          <AntDesign name="warning" size={24} color="#C4C4C4" />
          {/* </Box> */}
        </TouchableOpacity>
      ) : null}
    </HStack>
  );
}

export default AboutSubject_Logic;
