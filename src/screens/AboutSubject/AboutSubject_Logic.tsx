import { Box, Text, HStack, Select, CheckIcon, VStack } from "native-base";
import { Image, Platform, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { useEventNavigation } from "../../context";
import { fontStyles } from "../../utils/colors/fontColors";

function AboutSubject_Logic({
  index,
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

  const {
    available,
    id,
    name,
    subjects,
    userSubject,
    selective,
    selectiveSubjects,
  } = subject;
  const [FontsLoaded, setFontsLoaded] = useState(false);
  const [selectiveSubject, setSelectiveSubject] = useState();

  const obtenerDatos = async () => {
    try {
      const selectedSubjectString = await AsyncStorage.getItem(
        "selectiveSubject"
      );
      if (selectedSubjectString) {
        const selectedSubject = JSON.parse(selectedSubjectString);
        setSelectiveSubject(selectedSubject.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerDatos();

    if (!FontsLoaded) {
      loadFonts();
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

  const selectSelectiveSubject = async (item) => {
    setSelectiveSubject(item.id);
    const itemString = JSON.stringify(item);
    await AsyncStorage.setItem("selectiveSubject", itemString);
  };

  const selectiveSubjectsData =
    selectiveSubjects &&
    selectiveSubjects.map((subject, index) => ({
      label: subject,
      value: index.toString(),
    }));

  return (
    // Materias y puntajes

    <HStack
      mt={margginTop}
      justifyContent={"space-between"}
      alignItems={"center"}
      style={{
        backgroundColor: "white",
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 8,
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
          <VStack space={2} alignItems="flex-start">
            <Text
              pr={2}
              bold={true}
              numberOfLines={2}
              style={[fontStyles.poppins400, { fontSize: 14 }]}
              color={"#171717"}
            >
              {name}
            </Text>
            {selective && selectiveSubjects ? (
              <Select
                selectedValue={selectiveSubject}
                minWidth="160"
                marginTop={-3} // Ajusta este valor según tu preferencia
                accessibilityLabel="Elegir Materia"
                placeholder="Elegir Materia"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                onValueChange={(itemId) => {
                  const selectedItem = selectiveSubjects.find(
                    (item, index) => index.toString() === itemId
                  );
                  if (selectedItem) {
                    selectSelectiveSubject(selectedItem);
                  }
                }}
                textAlign={"left"}
                style={{
                  marginLeft: -10,
                  marginBottom: -5,
                }}
                _item={{
                  fontSize: 14,
                }}
              >
                {selectiveSubjectsData.map((item) => (
                  <Select.Item
                    label={item.label}
                    value={item.value}
                    key={item.value}
                  />
                ))}
              </Select>
            ) : null}
          </VStack>
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
          {/* <TouchableOpacity
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
              source={require("../../../assets/icons/smile.png")}
              style={{ width: 26, height: 26, marginLeft: 20, marginRight: -5 }}
            />
          </TouchableOpacity> */}
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
          color="#454545"
        />
      </TouchableOpacity>
      {available && userSubject?.score ? (
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            overflow: "visible",
            height: 70,
          }}
        >
          {/* <Box style={{ backgroundColor: "cyan" }}> */}
          <Text
            color={userSubject?.score < 11 ? "#eb5e29" : "#3a71e1"}
            // color={userSubject?.score < 4 ? "#eb5e29" : "#3a71e1"}
            // fontWeight={"bold"}
            // textAlign={"center"}
            style={[
              fontStyles.headingText,
              {
                fontSize: Platform.OS === "ios" ? 32 : 28,
                paddingVertical: Platform.OS === "ios" ? "7.2%" : "6.2%",
                marginTop: 10,
                marginRight: 10,
              },
            ]}
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
            color={"brand.primary"}
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
