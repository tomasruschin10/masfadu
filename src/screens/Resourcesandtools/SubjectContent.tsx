
import React, { useEffect, useState } from 'react'
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Box, Button, Heading, HStack, Icon, IconButton, Input, Modal, ScrollView, Spinner, Text } from 'native-base'
import { WebView } from 'react-native-webview';
import Container from '../../components/Container';
import { getServices } from '../../utils/hooks/services';
import Layout from '../../utils/LayoutHeader&BottomTab';
import { fontStyles } from '../../utils/colors/fontColors';

function SubjectContent({ route, navigation }) {
  const { viewName, name, subjectId } = route.params
  console.log("DATA<>", route.params)

  const [ResourceCategory, setResourceCategory] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [resourcesFound, setResourcesFound] = useState(false);

  const [modal, setModal] = useState<any>(null)

  useEffect(() => {
    setLoading(true);
    getServices("resource-category/all")
      .then(({ data }: any) => {
        setResourceCategory(data);
  
        // Check if any resources were found for the given subject
        const resourcesFound = data.some(item =>
          item.resources.some(it => it.subject_id === subjectId)
        );
  
        setResourcesFound(resourcesFound);
      })
      .catch((error) => {
        if (__DEV__) {
          console.log(
            "🚀 ~ file: On2Screen.tsx ~ line 21 ~ getServices ~ error",
            error
          );
        }
      })
      .finally(() => setLoading(false));
  }, []);
  


  const Communication = ({ item }) => {
    const { name, image } = item;

    function shareFile(image: any): void {
      throw new Error('Function not implemented.');
    }

    return (
      <Box w={"45%"} p={3} m={2} rounded={"md"} shadow={"4"} bg="white">
        <Icon
          as={FontAwesome}
          size={8}
          color="red.400"
          mx={"auto"}
          my={1}
          name={
            image?.url.endsWith(".pdf")
              ? "file-pdf-o"
              : /\.(jpe?g|png|gif|bmp)$/i.test(image?.url)
                ? "file-image-o"
                : "file-o"
          }
        />
        <Text mt={1}>{name}</Text>
        <HStack justifyContent={"flex-end"}>
          <IconButton
            icon={<Icon name={"download"} as={AntDesign} />}
            p={2}
            rounded={50}
            colorScheme={"primary"}
            onPress={() => shareFile(image)}
          />
          <IconButton
            icon={<Icon name={"eyeo"} as={AntDesign} />}
            p={2}
            rounded={50}
            colorScheme={"primary"}
            onPress={() => setModal(item)}
          />
        </HStack>
      </Box>
    );
  };

  return (
    <Container>

      <Layout route={route} navigation={navigation} title={`${name} ${viewName ? "-" : ""} ${viewName || ""}`}>
      <ScrollView keyboardShouldPersistTaps={'handled'}>

        {!loading ? (
          <Button display={"none"} />
        ) : (
          <HStack space={2} justifyContent="center">
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="brand.primary" fontSize="md">
              Cargando
            </Heading>
          </HStack>
        )}

        {ResourceCategory.length === 0 && loading === false && (
          <Text
            mx={8}
            mt={4}
            fontWeight={"bold"}
            color={"primary.100"}
            fontSize={20}
          >
            No hay nada por aquí
          </Text>
        )}

        <Box>
          {ResourceCategory.length > 0 ? (
            ResourceCategory.map((item) => {
              const filteredResources = item.resources.filter(
                (it) => it.subject_id === subjectId && it.active === true
              );

              if (filteredResources.length > 0) {

                return (
                  <Box mx="5" key={item.id} mb={4}>
                    <Text
                      mb={1}
                      fontWeight={700}
                      fontFamily="Manrope"
                      fontSize={"xl"}
                    >
                      {item.name}
                    </Text>

                    <HStack flexWrap={"wrap"}>
                      {filteredResources.map((item) => (
                        <Communication key={item.id} item={item} />
                      ))}
                    </HStack>
                  </Box>
                );
              }

              return null;
            })
          ) : null}

          {!resourcesFound && loading === false && (
            <Text style={{ ...fontStyles.bodyText, fontSize: 16, marginTop: 30 }} marginX={"auto"}>No se encontraron documentos.</Text>
          )}
        </Box>


      </ScrollView>
      <Modal
        isOpen={modal ? true : false}
        animationPreset={"slide"}
        onClose={() => setModal(null)}
      >
        <Box w={"100%"} h={"100%"} safeArea bg={"white"}>
          <HStack alignItems={"center"} space={1} p={1}>
            <IconButton
              icon={<Icon name={"arrowleft"} as={AntDesign} />}
              p={2}
              rounded={50}
              colorScheme={"primary"}
              onPress={() => setModal(null)}
            />
            <Text fontWeight={"500"} fontSize={16}>
              {modal?.name}
            </Text>
          </HStack>
          <WebView source={{ uri: modal?.image?.url }} />
        </Box>
      </Modal>
    </Layout>
    </Container >
  );
}

export default SubjectContent;
