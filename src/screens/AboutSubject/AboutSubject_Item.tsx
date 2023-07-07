import { useEffect, useState } from "react";
import { Box, Text, HStack } from "native-base";
import { SimpleAccordion } from "../../components/SimpleAccordion";
import { ModalIcon, ModalNotes, ModalWarning } from "./Modals";
import AboutSubject_Item_locked from "./AboutSubject_Item_locked";
import * as Font from "expo-font";
import AboutSubject_Logic from "./AboutSubject_Logic";
import { LinearGradient } from "expo-linear-gradient";

function AboutSubject_Item({ subjCategory, nav, updater, setUpdater }) {

  // const [materias, setMaterias] = useState([]);
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

  const [showIcon, setShowIcon] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [currentSubj, setCurrentSubj] = useState({});
  const [infoUserSubj, setInfoUserSubj] = useState({
    user_id: 0,
    subject_id: 0,
    score: 0,
    finish: 0,
    extra_score: [],
    USERSUBJECT: 0,
  });

  const [FontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    /*     if (!FontsLoaded) {
          loadFonts();
          setFontsLoaded(true);
        } */
    if (!FontsLoaded) {
      const loadAsync = async () => {
        await loadFonts();
        setFontsLoaded(true);
      };

      loadAsync()
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
        updater={updater}
        setUpdater={setUpdater}
        currentSubj={currentSubj}
        showWarning={showWarning}
        setShowNotes={setShowNotes}
        setShowWarning={setShowWarning}
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

      <Box
        bg={"white"}
        borderColor={"#D4D4D4"}
        borderWidth={1}
        rounded={"xl"}
        mt={1}
        // mb={4}
        mx={5}
      >
        <HStack p={4} justifyContent="space-between">
          <Box flex={1}>
            <Text color={"#9f9f9f"} fontWeight={"600"} fontSize={12}>
              Materias aprobadas
            </Text>
            <Text
              fontFamily={"soraRegular"}
              color={"#ababb4"}
              fontSize={31}
              mt={2}
            >
              {`${materias.length}/${subjCategory.total}`}
              {/* {`${subjCategory.on}/${subjCategory.total}`} */}
            </Text>
            <Box bg={"#EBEEF2"} rounded={"full"} height={2}>
              <LinearGradient
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["#CCCED1", "#B8B8B8", "#A4A4A4", "#E5E91F"]}
                  style={{
                  height: "100%",
                  width: `${subjCategory.total !== 0
                      ? (100 / subjCategory.total) * subjCategory.on
                      : (100 / 1) * subjCategory.on
                    }%`,
                  borderRadius: 10,
                }}
              />
            </Box>
          </Box>
          <Box ml={4}>
            <Text color={"#b1b1b1"} fontWeight={"600"} fontSize={12}>
              Promedio
            </Text>
            <Box bg={"#f8f8f8"} rounded={"xl"} mt={2}>
              {FontsLoaded ? <Text
                fontFamily={"soraSemiBold"}
                color={"#9a9a9a"}
                fontWeight={"500"}
                textAlign={"center"}
                fontSize={28}
                py={1}
              >
                {!subjCategory.prom ? "0" : subjCategory.prom.toFixed(1)}
              </Text> : null}

            </Box>
          </Box>
        </HStack>
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
                backgroundColor: "white",
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
                // lastItem={item.subject.length}
                nav={nav}
                key={it.id}
                subject={it}
                setShowNotes={setShowNotes}
                setShowWarning={setShowWarning}
                setCurrentSubj={setCurrentSubj}
                infoUserSubj={infoUserSubj}
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
