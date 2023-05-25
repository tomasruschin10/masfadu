import { Box, Icon, IconButton, Text, Image } from "native-base";

import { SvgXml } from "react-native-svg";

export default function Sections({ title, icon, comingSoon, navigation }) {
  //   console.log("🚀 ~ file: Sections.tsx:6 ~ Sections ~ icon:", icon);
  console.log("ddd ", icon);

  return (
    /*     <Box flex={1} alignItems={"center"}>
      <Box>
        {comingSoon ? (
          <IconButton
            backgroundColor={"#9A9A9A"}
            w={20}
            h={20}
            borderRadius={40}
            icon={<Image source={icon} />}
          />
        ) : title == "" ? (
          <IconButton
            w={20}
            h={20}
            borderRadius={40}
            icon={<Image source={icon} />}
          />
        ) : (
          <IconButton
            onPress={() => navigation.navigate("Subsections", { title: title })}
            backgroundColor={"#1f1e25"}
            w={20}
            h={20}
            borderRadius={40}
            icon={<Image source={icon} />}
          />
        )}
        <Box
          position="absolute"
          backgroundColor="#64E889"
          rounded={"full"}
          bottom="30"
          left="0"
          right="0"
        >
          {comingSoon ? (
            <Text textAlign={"center"} fontSize={10}>
              Proximamente
            </Text>
          ) : (
            <Text display={"none"}></Text>
          )}
        </Box>
      </Box>

      <Box mt={0.5} mb={1} mx={3}>
        <Text
          fontSize={12}
          numberOfLines={2}
          textAlign={"center"}
        
        >
          {title}
        </Text>
      </Box>
    </Box> */
    <Box flex={1}   borderRadius={10} mr={5} ml={5} style= {{width: 100, height: 100, backgroundColor: "#F1F6FA",}} alignItems={"center"}>
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
      onPress={() => navigation.navigate("Subsections", { title: title })}
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
            resizeMode="contain" // Ajustar imagen al contenedor
            style={{ width: "100%", height: "100%" }} // Reducir el tamaño de la imagen
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
    <Text style={{color: '#EA5E29'}} fontSize={12} numberOfLines={2} textAlign="center">
      {title}
    </Text>
  </Box>
</Box>


    </Box>
  );
}
