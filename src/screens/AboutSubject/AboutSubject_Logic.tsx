import React, { useEffect, useState } from "react";
import { Box, Text, HStack, Select, CheckIcon, VStack } from "native-base";
import {
  Image,
  Platform,
  TouchableOpacity,
  Modal,
  View,
  ScrollView,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";

import { SwipeablePanel } from "rn-swipeable-panel";
import * as Font from "expo-font";

import { useEventNavigation } from "../../context";
import { fontStyles } from "../../utils/colors/fontColors";
import { useDispatch, useSelector } from "react-redux";
import { updateModal } from "../../redux/actions/user";
import { createNote } from "./ModalFunctions";

function AboutSubject_Logic({
  index,
  subject,
  setShowWarning,
  setShowChairModal,
  setCurrentSubj,
  currentSubj,
  infoUserSubj,
  setInfoUserSubj,
  updater,
  setUpdater,
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
    userSubject,
    selective,
    subjectParents,
    selectiveSubjects,
  } = subject;
  const [FontsLoaded, setFontsLoaded] = useState(false);
  const [showSelectiveSubject, setShowSelectiveSubject] = useState(false);
  const [selectiveSubject, setSelectiveSubject] = useState();
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.userdata);
  const isVisit = user?.userRole?.[0]?.role?.name === "Visit";

  useEffect(() => {
    if (isVisit) {
      handleRestriction();
    }
  }, [isVisit]);

  const handleRestriction = () => {
    dispatch(updateModal(true));
  };

  const getSelectiveSubject = async () => {
    try {
      const selectedSubjectString = await AsyncStorage.getItem(
        "selectiveSubject"
      );
      if (selectedSubjectString) {
        const selectedSubjectsArray = JSON.parse(selectedSubjectString);
        const matchingSubject = selectedSubjectsArray.find(
          (subject) => subject.selectedId === id
        );

        if (matchingSubject) {
          setSelectiveSubject(matchingSubject.label);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSelectiveSubject();

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
  };

  if (!FontsLoaded) {
    return null;
  }

  const selectSelectiveSubject = async (item) => {
    try {
      const existingString = await AsyncStorage.getItem("selectiveSubject");

      const existingValue = existingString ? JSON.parse(existingString) : [];

      const index = existingValue.findIndex(
        (subject) => subject.selectedId === id
      );

      if (index !== -1) {
        existingValue[index] = { ...item, selectedId: id };
      } else {
        existingValue.push({ ...item, selectedId: id });
      }

      await AsyncStorage.setItem(
        "selectiveSubject",
        JSON.stringify(existingValue)
      );

      setSelectiveSubject(item.label);
    } catch (error) {
      console.error("Error al seleccionar la materia:", error);
    }
  };

  const selectiveSubjectsData =
    selectiveSubjects &&
    selectiveSubjects.map((subject, index) => ({
      label: subject,
      value: index.toString(),
    }));

  const areAllParentsCompleted = (parents) => {
    return parents.every((parent) => {
      return (
        parent.completed ||
        parent.orCorrelative.some((orCor) => orCor.completed)
      );
    });
  };

  const allParentsCompleted = areAllParentsCompleted(subjectParents);

  const handlePress = () => {
    if (isVisit) {
      handleRestriction();
      return;
    }
    if (allParentsCompleted) {
      setShowChairModal(true);
      setCurrentSubj({ ...subject, dis: 1 });
    } else {
      setShowWarning(true);
      setCurrentSubj({ ...subject, dis: 0 });
    }
  };

  const handlePressCheck = () => {
    setIsChecked(true);
    if (isVisit) {
      handleRestriction();
      return;
    }
    if (allParentsCompleted) {
      createNote(
        setLoading,
        setInfoUserSubj,
        { ...infoUserSubj, score: 4 },
        { ...currentSubj, ...subject, dis: 1 },
        updater,
        setUpdater
      );
    } else {
      setShowWarning(true);
      setCurrentSubj({ ...subject, dis: 0 });
    }
  };

  return (
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
      <Box justifyContent={"center"} flex={1} rounded={"xl"}>
        <HStack
          pl={2}
          pr={3}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          {selective && selectiveSubjects ? (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setShowSelectiveSubject(true)}
            >
              <Entypo name="chevron-down" size={25} color="#797979" />
              {selectiveSubject ? (
                <Text
                  bold={true}
                  numberOfLines={2}
                  style={[fontStyles.poppins400, { fontSize: 14 }]}
                  color={"#171717"}
                >
                  {selectiveSubject}
                </Text>
              ) : (
                <Text
                  bold={true}
                  numberOfLines={2}
                  style={[fontStyles.poppins400, { fontSize: 14 }]}
                  color={"#171717"}
                >
                  {`${name} (${selectiveSubjects?.length})`}
                </Text>
              )}
            </TouchableOpacity>
          ) : (
            <Text
              pr={2}
              bold={true}
              numberOfLines={2}
              style={[fontStyles.poppins400, { fontSize: 14 }]}
              color={"#171717"}
            >
              {name}
            </Text>
          )}

          <VStack space={2} alignItems="flex-start">
            <Modal
              visible={!!showSelectiveSubject}
              transparent
              children={
                <SwipeablePanel
                  style={{ height: 480 }}
                  closeOnTouchOutside
                  onClose={() => setShowSelectiveSubject(null)}
                  fullWidth
                  onlyLarge
                  isActive={!!showSelectiveSubject}
                >
                  <ScrollView>
                    <View
                      style={{
                        paddingVertical: 27,
                        paddingBottom: 54,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setSelectiveSubject(null);
                          setShowSelectiveSubject(null);
                        }}
                        style={{
                          paddingVertical: 10,
                          paddingRight: 27,
                          paddingLeft: 30,
                          backgroundColor: !selectiveSubject
                            ? "#DA673A"
                            : "transparent",
                        }}
                      >
                        <Text
                          style={[
                            fontStyles.poppins400,
                            {
                              fontSize: 16,
                              color: !selectiveSubject ? "white" : "black",
                            },
                          ]}
                        >
                          {`${name} (${selectiveSubjects?.length})`}
                        </Text>
                      </TouchableOpacity>

                      {selectiveSubjectsData &&
                        selectiveSubjectsData
                          .slice()
                          .sort((a, b) => a.label.localeCompare(b.label))
                          .map((item) => (
                            <TouchableOpacity
                              key={item.value}
                              onPress={() => {
                                selectSelectiveSubject(item);
                                setShowSelectiveSubject(null);
                              }}
                              style={{
                                paddingVertical: 10,
                                paddingRight: 27,
                                paddingLeft: 30,
                                backgroundColor:
                                  item.label === selectiveSubject
                                    ? "#DA673A"
                                    : "transparent",
                              }}
                            >
                              <Text
                                style={[
                                  fontStyles.poppins400,
                                  {
                                    fontSize: 16,
                                    color:
                                      item.label === selectiveSubject
                                        ? "white"
                                        : "black",
                                  },
                                ]}
                              >
                                {item.label}
                              </Text>
                            </TouchableOpacity>
                          ))}
                    </View>
                  </ScrollView>
                </SwipeablePanel>
              }
            />
          </VStack>
        </HStack>
      </Box>

      {available && userSubject?.score ? (
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            overflow: "visible",
            height: 70,
          }}
          onPress={() => {
            if (isVisit) {
              handleRestriction();
              return;
            }
            setInfoUserSubj({
              ...infoUserSubj,
              score: userSubject?.score,
              USERSUBJECT: userSubject?.id,
              user_id: userSubject?.user_id,
              subject_id: userSubject?.subject_id,
              extra_score: userSubject?.extra_score,
              finish: userSubject?.finish == true ? 1 : 0,
            });
            setCurrentSubj({ ...subject, dis: 1 });
            setShowChairModal(true);
          }}
        >
          <Text
            color={userSubject?.score < 11 ? "#eb5e29" : "#3a71e1"}
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
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handlePress}
          >
            {allParentsCompleted ? (
              <Text
                color={"brand.primary"}
                textAlign={"center"}
                fontSize={38}
                style={{ marginRight: 10 }}
              >
                +
              </Text>
            ) : (
              <AntDesign
                name="warning"
                size={24}
                style={{ marginRight: 10 }}
                color="#C4C4C4"
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
            onPress={() => handlePressCheck()}
          >
            {isChecked ? (
              <MaterialCommunityIcons
                name="checkbox-marked"
                size={32}
                color="#DA673A"
              />
            ) : (
              <MaterialCommunityIcons
                name="checkbox-blank-outline"
                size={32}
                color="#DA673A"
              />
            )}
          </TouchableOpacity>
        </>
      )}
    </HStack>
  );
}

export default AboutSubject_Logic;
