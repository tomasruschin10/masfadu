import { Box, Text, HStack } from "native-base";
import { Image, TouchableOpacity } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { useEventNavigation } from "../../context";

function AboutSubject_Logic({
  index,
  // lastItem,
  subject,
  nav,
  setShowWarning,
  setCurrentSubj,
  infoUserSubj,
  setInfoUserSubj,
  setShowNotes,
}) {
  const { navigationEvent } = useEventNavigation();

  let margginTop = 3;
  if (navigationEvent == "materias" && index == 0) {
    margginTop = 5;
  }

  // if (navigationEvent == "menu" && index == 0) {
  //   margginTop = ;
  // }

  console.log("margginTop ", margginTop);

  const { available, id, name, subjects, userSubject } = subject;
  const [FontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    if (!FontsLoaded) {
      loadFonts()
      setFontsLoaded(true);
    }
  }, []);
  const loadFonts = async () => {
    await Font.loadAsync({
      sora: require("../../../assets/fonts/Sora-Bold.ttf"),
      soraRegular: require("../../../assets/fonts/Sora-Regular.ttf"),
      soraSemiBold: require("../../../assets/fonts/Sora-SemiBold.ttf"),
    });
    console.log("Fuente cargada");
  };

  if (!FontsLoaded) {
    return null;
  }

  return (
    // Materias y puntajes
    <HStack
      mt={margginTop}
      justifyContent={"space-between"}
      style={{
        backgroundColor: "#eff6ff",
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 10,
        height: 80,
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
          pl={2}
          pr={3}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text
            pr={2}
            flex={1}
            bold={true}
            fontSize={15}
            numberOfLines={2}
            // color={
            //   !available
            //     ? "#C4C4C4"
            //     : !userSubject || userSubject?.score < 4
            //     ? "primary.100"
            //     : "light.100"
            // }
            color="#191D21"
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
          <TouchableOpacity
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
            <Image
              source={require("../../../assets/icons/emoticons.png")}
              style={{ width: 33, height: 33, marginLeft: 20, marginRight: -5 }}
            />
          </TouchableOpacity>
        </HStack>
      </Box>

      <TouchableOpacity
        style={{
          //   backgroundColor: "white",
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
        {/* <MaterialCommunityIcons
            name="message-text-outline"
            size={25}
            color="#CCCED1"
          /> */}
        <Entypo
          name="dots-three-vertical"
          size={22}
          style={{ marginRight: 6, padding: 2 }}
          color="#c5c5c5"
        />
      </TouchableOpacity>
      {available && userSubject?.score ? (
        <TouchableOpacity
          style={{
            // backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Box style={{ backgroundColor: "cyan" }}> */}
          <Text
            color={userSubject?.score < 4 ? "#eb5e29" : "#3a71e1"}
            // fontWeight={"bold"}
            textAlign={"center"}
            fontSize={32}
            fontFamily={"soraSemiBold"}
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
          <Text
            color={"#3a71e1"}
            // fontWeight={"bold"}
            textAlign={"center"}
            fontSize={38}
            // fontFamily={""}
            style={{ marginRight: 10 }}
          >
            +
          </Text>
          {/* </Box> */}
        </TouchableOpacity>
      ) : !available ? (
        <TouchableOpacity
          style={{
            // backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
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
          <AntDesign
            name="warning"
            size={24}
            style={{ marginRight: 10 }}
            color="#C4C4C4"
          />
          {/* </Box> */}
        </TouchableOpacity>
      ) : null}
    </HStack>
  );
}

export default AboutSubject_Logic;
