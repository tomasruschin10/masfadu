import React, { useEffect, useState } from "react";
import { Box, HStack } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { SimpleAccordion } from "../../components/SimpleAccordion";
import {
  ModalIcon,
  ModalNotes,
  ModalWarning,
  AddChairModal,
  AddScore,
  AddStarsModal,
  ModalSummary,
  ModalLeaveAnOpinion,
} from "./Modals";
import * as Font from "expo-font";
import AboutSubject_Logic from "./AboutSubject_Logic";
import { LinearGradient } from "expo-linear-gradient";
import { moderateScale } from "../../utils/media.screens";
import { fontStyles } from "../../utils/colors/fontColors";

function AboutSubject_Item({ subjCategory, nav, updater, setUpdater }) {
  const [showChairModal, setShowChairModal] = useState(false);
  const [showSummaryModal, setShowSummayModal] = useState(false);
  const [showStarsModal, setShowStarsModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showLeaveOpinion, setShowLeaveOpinion] = useState(false);
  const [selectedChair, setSelectedChair] = useState("");
  const userdata = useSelector((state: any) => state.user.userdata);
  const materias = [];
  subjCategory.data.forEach((item) => {
    const dataAvailable = item.subject.filter(
      (item) => item.available && item.userSubject && item.userSubject.score > 4
    );
    if (dataAvailable.length > 0) {
      dataAvailable.forEach((materia) => {
        materias.push(materia);
      });
    }
  });
  const navigation: any = useNavigation();

  const [showIcon, setShowIcon] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [currentSubj, setCurrentSubj] = useState({});
  const [infoUserSubj, setInfoUserSubj] = useState({
    user_id: userdata.id,
    score: 1,
    chair: "",
    qualityOfTeachers: 0,
    practicalJobs: 0,
    requirement: 0,
    cost: 0,
    finish: 0,
    extra_score: [],
    USERSUBJECT: 0,
  });

  const [FontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    if (!FontsLoaded) {
      const loadAsync = async () => {
        await loadFonts();
        setFontsLoaded(true);
      };

      loadAsync();
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

  return (
    <>
      <ModalIcon showIcon={showIcon} setShowIcon={setShowIcon} />
      <ModalWarning
        currentSubj={currentSubj}
        showWarning={showWarning}
        setShowWarning={setShowWarning}
        allSubjects={subjCategory.data}
      />
      <AddChairModal
        isOpen={showChairModal}
        setOpen={setShowChairModal}
        onConfirm={setShowScoreModal}
        onCancel={setShowChairModal}
        infoUserSubj={infoUserSubj}
        setInfoUserSubj={setInfoUserSubj}
        setSelectedChair={setSelectedChair}
        chairs={currentSubj?.chairs}
      />
      <AddScore
        isOpen={showScoreModal}
        setOpen={setShowScoreModal}
        onConfirm={setShowStarsModal}
        onCancel={setShowChairModal}
        infoUserSubj={infoUserSubj}
        setInfoUserSubj={setInfoUserSubj}
      />
      <AddStarsModal
        isOpen={showStarsModal}
        setOpen={setShowStarsModal}
        onConfirm={setShowSummayModal}
        onCancel={setShowScoreModal}
        infoUserSubj={infoUserSubj}
        setInfoUserSubj={setInfoUserSubj}
      />
      <ModalSummary
        isOpen={showSummaryModal}
        setOpen={setShowSummayModal}
        onConfirm={setShowLeaveOpinion}
        setUpdater={setUpdater}
        updater={updater}
        onCancel={setShowStarsModal}
        currentSubj={currentSubj}
        infoUserSubj={infoUserSubj}
        setInfoUserSubj={setInfoUserSubj}
      />
      <ModalNotes
        updater={updater}
        setUpdater={setUpdater}
        showNotes={showNotes}
        setShowNotes={setShowNotes}
        infoUserSubj={infoUserSubj}
      />
      <ModalLeaveAnOpinion
        setShowModal={setShowLeaveOpinion}
        showModal={showLeaveOpinion}
        onConfirm={() =>
          navigation.navigate("CreateNewThread", {
            selectedSubject: currentSubj,
            selectedChair: selectedChair,
          })
        }
      />
      <Box
        bg={"white"}
        borderColor={"transparent"}
        borderWidth={1}
        rounded={"xl"}
        mt={1}
        mx={5}
      >
        <HStack p={4} pb={1} justifyContent="space-between">
          <Box flex={1}>
            <Text
              style={[
                fontStyles.poppins600,
                { color: "#9f9f9f", fontSize: moderateScale(15) },
              ]}
            >
              Materias aprobadas
            </Text>
            <Text
              style={[
                fontStyles.poppins600,
                {
                  color: "#171717",
                  fontSize: moderateScale(26),
                  marginTop: 2,
                  paddingVertical: 3,
                },
              ]}
            >
              {`${subjCategory.on}/${subjCategory.total}`}
            </Text>
          </Box>
          <Box ml={4}>
            <Box ml={4}>
              <Text
                style={[
                  fontStyles.poppins600,
                  { color: "#949494", fontSize: moderateScale(14) },
                ]}
              >
                Promedio
              </Text>
              {FontsLoaded ? (
                <Box
                  bg={"#F2F2F2"}
                  rounded={"8"}
                  mt={2}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Text
                    style={[
                      fontStyles.poppins600,
                      {
                        color: "#646464",
                        fontSize: 25,
                        textAlign: "center",
                        marginTop: 3,
                        paddingVertical: 3,
                      },
                    ]}
                  >
                    {subjCategory.prom > 0 ? subjCategory.prom : "-"}
                  </Text>
                </Box>
              ) : null}
            </Box>
          </Box>
        </HStack>
        <Box px={2} pb={2}>
          <Box bg={"#EBEEF2"} rounded={"full"} height={2}>
            <LinearGradient
              start={{ x: -1, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["#CCCED1", "#B8B8B8", "#A4A4A4", "#E5E91F"]}
              style={{
                height: "100%",
                width: `${
                  subjCategory.total !== 0
                    ? (100 / subjCategory.total) * subjCategory.on
                    : (100 / 1) * subjCategory.on
                }%`,
                borderRadius: 8,
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box px={4}>
        {subjCategory.data.map((item, index) => (
          <SimpleAccordion
            key={item.id}
            title={item.name}
            description={item?.description}
            arrowColor="#3A71E1"
            showContentInsideOfCard={false}
            titleStyle={{
              color: "#3A71E1",
              fontWeight: "600",
              fontFamily: "Poppins_400Regular",
              fontSize: 17.61,
            }}
            bannerStyle={[
              {
                backgroundColor: "#F1F6FA",
                borderBottomColor: "#D4D4D4",
                borderBottomWidth: 1,
                height: 60,
                padding: 0,
                marginLeft: 10,
                marginRight: 10,
              },
              subjCategory.length - 1 === index && {
                borderBottomWidth: 0,
              },
            ]}
            viewInside={item.subject.map((it, index) => (
              <AboutSubject_Logic
                index={index}
                nav={nav}
                key={it.id}
                subject={it}
                setShowNotes={setShowNotes}
                setShowWarning={setShowWarning}
                setCurrentSubj={setCurrentSubj}
                currentSubj={currentSubj}
                infoUserSubj={infoUserSubj}
                setShowChairModal={setShowChairModal}
                setInfoUserSubj={setInfoUserSubj}
              />
            ))}
          />
        ))}
      </Box>
    </>
  );
}

export default AboutSubject_Item;
