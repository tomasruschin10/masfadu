import { Box, Text, useTheme } from "native-base";
import {  TouchableOpacity } from "react-native";
import { fontStyles } from "../utils/colors/fontColors";

interface SectionProps {
  title: string;
  more?: boolean;
  navigateTo: string;
  isSubsection?: boolean;
  to?: string;
  navigation: any; // TODO: Definir el tipo de `navigation`
}


export default function TitleSliders({
  navigateTo,
  isSubsection,
  title,
  to,
  navigation,
  more = true,
}: SectionProps) {
  const { colors }: any = useTheme();

  return (
    <Box
      mx={4}
      style={{ marginBottom: 3 }}
      justifyContent={"space-between"}
      alignItems={"center"}
      flexDirection={"row"}
    >
      <Text fontWeight={700} style={[fontStyles.poppins600,{ fontSize: 16 }]}>
        {title}
      </Text>

      {more ? (
        <TouchableOpacity onPress={() => isSubsection ? navigation.navigate('Subsections', {title: navigateTo}) : navigation.navigate(navigateTo)}>
          <Box
            flexDirection={"row"}
            alignItems={"center"}
        /*     bg={"#f2fdfb"} */
            rounded={"full"}
            pl={3}
            pr={3}
          >
            <Text
              style={{
                fontSize: 12,
                color: "#ec7245",
                marginRight: 2,
                padding: 2,
              }}
            >
              ver más
            </Text>
           {/*  <AntDesign name="arrowright" size={12} color={"#ec7245"} /> */}
          </Box>
        </TouchableOpacity>
      ) : null}
    </Box>
  );
}
