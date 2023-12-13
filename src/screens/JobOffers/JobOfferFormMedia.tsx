import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Input,
    ScrollView,
    Text,
    TextArea,
    Image,
} from "native-base";
import * as ImagePicker from 'expo-image-picker';
import Container from "../../components/Container";
import Layout from "../../utils/LayoutHeader&BottomTab";
import {
    publishOffer,
} from "../../utils/hooks/services";
import { ErrorModal, SuccessModal } from "../AboutSubject/Modals";

function OfferFormMedia({ route, navigation }) {

    const { tituloEmpleo, url, descripcion } = route.params;
    /*
            name: nombreApellido,
        phone: numeroTelefono,
        company: empresa,
    */
    const [loading, setLoading] = useState(false);

    const [previewImage, setPreviewImage] = useState(null);

    const [imagen, setImagen] = useState(null)
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [customErrorMessage, setCustomErrorMessage] = useState("");
    const [successModalOpen, setSuccessModalOpen] = useState(false);

    const [nombreApellido, setNombreApellido] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [numeroTelefono, setNumeroTelefono] = useState("");

    const selectImage = async () => {
        try {
            const image = await ImagePicker.launchImageLibraryAsync();

            if (!image.canceled && image.assets.length > 0) {
                setImagen(image.assets[0])
                setPreviewImage(image.assets[0].uri); // Guarda la URI de la imagen seleccionada para mostrarla en la vista previa
            }
        } catch (error) {
            console.log(error);
        }
    };

    const cleanModals = (inmediate?: boolean) => {
        setTimeout(() => {
            setSuccessModalOpen(false);
            setErrorModalOpen(false);
        }, 30000);
    }

    const cleanSuccessModal = () => {
        setSuccessModalOpen(false);
        navigation.navigate("Home");
      };

    const uploadImage = async () => {
        try {
            setLoading(true);
            if (
                !nombreApellido ||
                !numeroTelefono ||
                !empresa ||
                !tituloEmpleo ||
                !descripcion ||
                !url ||
                !imagen) {
                console.log("f1")
                throw new Error("Rellene todos los campos");

            }

            const data = {
                offer_category_id: "1",
                name: nombreApellido,
                phone: numeroTelefono,
                company: empresa,
                title: tituloEmpleo,
                description: descripcion,
                url,
                image: imagen
            };

            const response = await publishOffer(data)
            console.log(response)
            if (response.status != 201) {
                console.log(response)
                throw new Error(JSON.stringify(response), { cause: 'no se obtuvo el status 201' });
            }

            setLoading(false);
            setSuccessModalOpen(true);

            setTimeout(() => {
                cleanSuccessModal()
            }, 3000);
            navigation.navigate('Home');
        } catch (error) {
            console.log('Error al enviar la imagen al backend:', error);

            setCustomErrorMessage(error.message)
            setErrorModalOpen(true);
            setLoading(false);

            cleanModals();
        }
    };

    return (
        <Container>
            <Layout
                route={route}
                navigation={navigation}
                title={`Publicá una oferta laboral`}
            >
                <ScrollView
                    nestedScrollEnabled={true}
                    keyboardShouldPersistTaps={"handled"}
                >
                    <Box
                        mx={5}
                        mb={2}
                        mt={-4}
                        borderTopWidth={1}
                        borderTopColor={"#EBEEF2"}
                        pt={6}
                    >
                        <Text fontSize={15}>
                            Genial! Dejanos tus datos así tenemos más información de la oferta laboral a publicar!                        </Text>
                    </Box>
                    <Box>
                        <Box
                            mx="5"
                            borderBottomWidth={1}
                            borderBottomColor={"#EBEEF2"}
                            pt={2}
                            pb={"3"}
                        >

                            <Box
                                alignItems={"center"}
                                justifyContent="center"
                                flexDir={"row"}
                            >
                                <Input
                                    onChangeText={(text) => setNombreApellido(text)}
                                    type={"text"}
                                    p={3.5}
                                    mb={5}
                                    placeholder={"Nombre Y Apellido"}
                                    placeholderTextColor={"#d3d3d3"}
                                    backgroundColor={"#F7FAFC"}
                                />
                            </Box>
                            <Box
                                alignItems={"center"}
                                justifyContent="center"
                                flexDir={"row"}
                            >
                                <Input
                                    onChangeText={(text) => setNumeroTelefono(text)}
                                    type={"text"}
                                    p={3.5}
                                    mb={5}
                                    placeholder={"Nro de teléfono"}
                                    placeholderTextColor={"#d3d3d3"}
                                    backgroundColor={"#F7FAFC"}
                                />
                            </Box>
                            <Box
                                alignItems={"center"}
                                justifyContent="center"
                                flexDir={"row"}
                                mb={5}
                            >
                                <Input
                                    onChangeText={(text) => setEmpresa(text)}
                                    type={"text"}
                                    p={3.5}
                                    placeholder={"Empresa"}
                                    placeholderTextColor={"#d3d3d3"}
                                    backgroundColor={"#F7FAFC"}
                                />
                            </Box>
                            <Box mb={5} style={{ backgroundColor: "#F7FAFC", height: 100, }}>
                                {previewImage && <Image alt="IMAGEN" source={{ uri: previewImage }} style={{ width: "100%", height: "100%" }} />}
                                <Button fontSize={1} zIndex={99} style={{ backgroundColor: "#d3d3d3", width: "30%", borderRadius: 50, marginLeft: "30%", marginTop: "5.5%", position: "absolute", height: "50%" }} onPress={selectImage}>Agregar Imagen</Button>
                            </Box>
                        </Box>
                        <Box alignItems="center">
                            <Button
                                _pressed={{bgColor:'rgba(218, 103, 58, .5)'}}
                                _text={{ fontSize: 14, fontWeight: '600' }}
                                isLoading={loading}
                                onPress={() => uploadImage()}
                                w="90%"
                                py={5}
                                rounded={8}
                            >
                                Enviar
                            </Button>
                        </Box>
                    </Box>
                </ScrollView>
                <ErrorModal message={customErrorMessage || "Error al publicar"} isOpen={errorModalOpen} setOpen={setErrorModalOpen} />
                <SuccessModal message={"Gracias! Vamos a subir tu publicación una vez que la hayamos revisado. No nos va a llevar mucho tiempo.😃"} isOpen={successModalOpen} setOpen={cleanSuccessModal} />
            </Layout>
        </Container>
    );
}

export default OfferFormMedia;
