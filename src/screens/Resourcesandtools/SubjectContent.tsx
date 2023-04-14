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

function SubjectContent({route, navigation}) {
    const { viewName, name, subjectId } = route.params
    const [ResourceCategory, setResourceCategory] = React.useState([]);
	const [loading, setLoading] = useState(false);
	const [searchText, setSearchText] = useState('');
    const [modal, setModal] = useState<any>(null)
    const dispatch = useDispatch()
    
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

    const byWords = () => {
        setLoading(true)
        getServices(`resource-category/all?search=${searchText.trim()}`).then(({data}: any) => {
          setResourceCategory(data)
          setSearchText('')
        }).catch(error => { __DEV__ && console.log("🚀 ~ file: SeeSubjectThread getServices:", error) }).finally(() => setLoading(false))
    }

    const shareFile = async(image) => {
        setLoading(true)
        const uri = encodeURI(image?.url)
        const fileUri = FileSystem.documentDirectory + encodeURI(image.name).slice(23);
        FileSystem.downloadAsync(uri, fileUri).then(({uri}) => {
            Sharing.shareAsync(uri);
        }).catch(_ => {
            dispatch(updateMessage({body: 'Ha ocurrido un error', open: true, type: 'danger'}))
        }).finally(() => setLoading(false))
    }

    const Communication = ({item}) => {
        const { name, image} = item

        return (
            <Box w={'45%'} p={3} m={2} rounded={'md'} shadow={'4'} bg="white">
                <Icon 
                    as={FontAwesome} 
                    size={8}
                    color="red.400"
                    mx={'auto'}
                    my={1}
                    name={ image?.url.endsWith('.pdf') ? 'file-pdf-o' : (/\.(jpe?g|png|gif|bmp)$/i.test(image?.url)) ? 'file-image-o' : "file-o"}
                />
                <Text mt={1}>{name}</Text>
                <HStack justifyContent={'flex-end'}>
                    <IconButton icon={<Icon name={'download'} as={AntDesign}/>} p={2} rounded={50} colorScheme={'primary'} onPress={() => shareFile(image)}/>
                    <IconButton icon={<Icon name={'eyeo'} as={AntDesign}/>} p={2} rounded={50} colorScheme={'primary'} onPress={() => setModal(item)}/>
                </HStack>
            </Box>
        )
    }

  return (
    <Container>
        <Layout route={route} navigation={navigation} title={`${name} - ${viewName}`}>
            <ScrollView keyboardShouldPersistTaps={'handled'}>

                <Box mx='5' alignItems={'center'} justifyContent="center" flexDir={'row'} mb='5'>
                    <Input
                        rounded={'full'}
                        fontSize={12.27}
                        onChangeText={text => setSearchText(text)}
                        w={{ base: "88%", md: "25%", }}
                        pb="1"
                        type={"text"}
                        placeholder={'Buscar'}
                        mr='2'
                    />
                    <HStack alignItems={"flex-start"}>
                        <IconButton
                            rounded={"xl"}
                            backgroundColor={"primary.900"}
                            icon={
                                <Icon onPress={byWords} as={Ionicons} name="search" size="md" color="primary.1000" />
                            }
                        />
                    </HStack>
                </Box>

                {
                    !loading? 
                    <Button display={'none'} /> :
                    <HStack space={2} justifyContent="center">

                        <Spinner accessibilityLabel="Loading posts" />
                        <Heading color="brand.primary" fontSize="md">Cargando</Heading>
                    </HStack>
                }
                
                { ResourceCategory.length === 0 && loading === false && <Text mx={8} mt={4} fontWeight={'bold'} color={'primary.100'} fontSize={20}>No hay nada por aquí</Text> }

                <Box>
                {
                    ResourceCategory.length > 0 ? ResourceCategory.map(item => {
                        return (
                            <>
                                {
                                    item.resources.filter(it => it.subject_id === subjectId).length > 0 ?
                                        <Box mx="5" key={item.id} mb={4}>
                                            <Text mb={1} fontWeight={700} fontFamily="Manrope" fontSize={"xl"}>{item.name}</Text>

                                            <HStack flexWrap={'wrap'}>
                                                {
                                                    item.resources.map((item) => (
                                                        <Communication key={item.id} item={item} />
                                                    ))
                                                }
                                            </HStack>
                                        </Box>: 
                                        null
                                }
                            </>
                        )
                    }) : 
                    null
                }
                </Box>
            </ScrollView>
            <Modal isOpen={modal ? true : false} animationPreset={'slide'} onClose={() => setModal(null)}>
                <Box w={'100%'} h={'100%'} safeArea bg={'white'}>
                    <HStack alignItems={'center'} space={1} p={1}>
                        <IconButton icon={<Icon name={'arrowleft'} as={AntDesign}/>} p={2} rounded={50} colorScheme={'primary'} onPress={() => setModal(null)}/>
                        <Text fontWeight={'500'} fontSize={16}>{modal?.name}</Text>
                    </HStack>
                    <WebView source={{ uri: modal?.image?.url }}/>
                </Box>
            </Modal>
        </Layout>
    </Container>
  )
}

export default SubjectContent