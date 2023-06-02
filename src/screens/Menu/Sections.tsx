import { Box, Icon, IconButton, Text, Image } from "native-base";
import SvgUri from "react-native-svg-uri";
import { SvgXml } from "react-native-svg";
import { TouchableOpacity } from "react-native";

export default function Sections({ title, icon, comingSoon, navigation, setMenu }) {

  

  return (
<TouchableOpacity onPress={() => {navigation.navigate("Subsections", { title: title }), setMenu(false)}}>
<Box
      flex={1}
      borderRadius={25}
      mr={5}
      ml={5}
      style={{ width: 100, height: 100, backgroundColor: "#F1F6FA" }}
      alignItems={"center"}
    >
      <Box
        flex={1}
        alignItems="center"
        style={{
          justifyContent: "center", // Centrar contenido verticalmente
          overflow: "hidden", // Evitar recorte del ícono
        }}
      >
        {comingSoon ? (
          <IconButton
            size={55}
            icon={
              <Box
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  alt="imagen"
                  source={icon}
                  resizeMode="contain" // Ajustar imagen al contenedor
                  style={{ width: "50%", height: "50%" }} // Reducir el tamaño de la imagen
                />

               {/*  <SvgUri width="200" height="200" source={icon} /> */}
              </Box>
            }
          />
        ) : title === "" ? (
          <IconButton
            size={55}
            icon={
              <Box
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  alt="imagen"
                  source={icon}
                  resizeMode="contain" // Ajustar imagen al contenedor
                  style={{ width: "100%", height: "100%" }} // Reducir el tamaño de la imagen
                />
              </Box>
            }
          />
        ) : (
          <IconButton
            onPress={() => {navigation.navigate("Subsections", { title: title }), setMenu(false)}}
            size={55}
            icon={
              <Box
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={icon}
                  resizeMode="contain" 
                  style={{ width: "100%", height: "100%" }} 
                />
   

   

               
              </Box>
            }
          />
        )}
        {comingSoon ? (
          <Box
            position="absolute"
            backgroundColor="#64E889"
            rounded="full"
            bottom={30}
            left={0}
            right={0}
            padding={2} // Agregado padding para centrar el texto
          >
            <Text textAlign="center" fontSize={10}>
              Próximamente
            </Text>
          </Box>
        ) : null}
        <Box mt={0.5} mb={1} mx={3}>
          <Text
            style={{ color: "#EA5E29" }}
            fontSize={12}
            numberOfLines={2}
            textAlign="center"
          >
            {title}
          </Text>
        </Box>
      </Box>
    </Box>
</TouchableOpacity>
  );
}
