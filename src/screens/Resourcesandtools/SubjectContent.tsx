import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import React, { useEffect, useState } from 'react'
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { Box, Button, Heading, HStack, Icon, IconButton, Input, Modal, ScrollView, Spinner, Text } from 'native-base'
import { WebView } from 'react-native-webview';
import Container from '../../components/Container';
import { getServices } from '../../utils/hooks/services';
import Layout from '../../utils/LayoutHeader&BottomTab';
import { useDispatch } from 'react-redux';
import { updateMessage } from '../../redux/actions/message';
import Alert from "../../components/alert/Alert";
function SubjectContent({route, navigation}) {
    const { viewName, name, subjectId } = route.params
    const [ResourceCategory, setResourceCategory] = React.useState([]);
	const [loading, setLoading] = useState(false);
	const [searchText, setSearchText] = useState('');
    const [modal, setModal] = useState<any>(null)
    const dispatch = useDispatch();


    const [alert, setAlert] = React.useState(null);

    const showAlert = (type, message) => {
      setAlert({ type, message });
    };
  
    const closeAlert = () => {
      setAlert(null);
    };
    
    useEffect(() => {
        setLoading(true)
		getServices('resource-category/all').then(({data}: any) => {
			setResourceCategory(data)
		}).catch(error => {
			if(__DEV__){
				console.log("🚀 ~ file: On2Screen.tsx ~ line 21 ~ getServices ~ error", error)
			}
		}).finally(() => setLoading(false))
	},[setResourceCategory])

  useEffect(() => {
    setLoading(true);
    getServices("resource-category/all")
      .then(({ data }: any) => {
        setResourceCategory(data);
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
  }, [setResourceCategory]);



  const Communication = ({ item }) => {
    const { name, image } = item;

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
     {alert && (
        <Alert type={alert.type} message={alert.message} closeAlert={closeAlert} />
      )}
        <Layout route={route} navigation={navigation} title={`${name} - ${viewName}`}>
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
            {ResourceCategory.length > 0
              ? ResourceCategory.map((item) => {
                  return (
                    <>
                      {item.resources.filter(
                        (it) => it.subject_id === subjectId
                      ).length > 0 ? (
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
                            {item.resources.map((item) => (
                              <Communication key={item.id} item={item} />
                            ))}
                          </HStack>
                        </Box>
                      ) : null}
                    </>
                  );
                })
              : null}
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
    </Container>
  );
}

export default SubjectContent;
