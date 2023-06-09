import React, { useEffect, useState } from 'react'
import { Dimensions, TouchableOpacity } from 'react-native';
import { Box, Button, FlatList, Heading, HStack, Icon, IconButton, Image, Input, ScrollView, Spinner, Text } from 'native-base'
import BottomTab from '../../components/BottomTab';
import Container from '../../components/Container';
import { Ionicons } from '@expo/vector-icons';
import { getServices } from '../../utils/hooks/services';
import { HeaderBack } from '../../components/Header';
import { RenderOffer } from '../../utils/hooks/useMultiple';

function CoursesAndWorkshops({route, navigation, mainTitle}) {
  const [courses, setCourses] = useState([]);
  const [advertisement, setAdvertisement] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchText, setSearchText] = useState('');
	const SLIDER_WIDTH = (Dimensions.get('window').width - 45) / 2 ;

  useEffect(() => {
    setLoading(true)
    
    getServices('offer/all/course').then(({data}: any) => {
			setCourses(data)
		}).catch(error => {
			if(__DEV__){
				console.log("🚀 ~ file: On2Screen.tsx ~ line 21 ~ getServices ~ error", error)
			}
		})
    getServices('advertisement/all/active?key=courses_workshops').then(({data}: any) => {
			setAdvertisement(data)
		}).catch(error => {
			if(__DEV__){
				console.log("🚀 ~ file: On2Screen.tsx ~ line 21 ~ getServices ~ error", error)
			}
		}).finally(() => setLoading(false))
  }, [setCourses])

  const byWords = () => {
    setLoading(true)
    getServices(`offer/all/course?search=${searchText.trim()}`).then(({data}: any) => {
      setCourses(data)
      setSearchText('')
		}).catch(error => { __DEV__ && console.log("🚀 ~ file: SeeSubjectThread getServices:", error) }).finally(() => setLoading(false))
  }

  const renderNews = ({ item }) => {
    return (
      <Box shadow={4} bgColor={'white'} mb={3} width={SLIDER_WIDTH} mx={2} h={93.37} borderRadius={"2xl"}>
        <TouchableOpacity onPress={() => navigation.navigate("News", {url: item.url, image: item.image.url})}>
          <Image borderRadius={"2xl"} resizeMode={"cover"} h={"100%"} alt="news1" source={{uri:item.image.url}} />
        </TouchableOpacity>
      </Box>
    );
  };

  return (
    <Container>
      { mainTitle == undefined ? <HeaderBack title='Cursos & Workshops' /> : <Box display={'none'} /> }

      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <Box>
          <Box>
            <Box alignContent={"center"} mt={3} mb={1}>
              <FlatList
                alignSelf={'center'}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                data={advertisement}
                renderItem={renderNews}
              />
            </Box>
          </Box>

          <Box mx='5' alignItems={'center'} justifyContent="center" flexDir={'row'}>
            <Input
              rounded={'full'}
              fontSize={12.27}
              onChangeText={text => setSearchText(text)}
              w={{ base: "87%", md: "25%", }}
              pb="1"
              type={"text"}
              placeholder={'Buscar'}
              mr='2'
            />

            <HStack alignItems={"flex-start"}>
              <IconButton
                rounded={"xl"}
                backgroundColor={"primary.900"}
                icon={ <Icon onPress={byWords} as={Ionicons} name="search" size="md" color="primary.1000" /> }
              />
            </HStack>
          </Box>

          { 
            !loading ? 
            <Button display={'none'} /> : 
            <HStack mt={2} space={2} justifyContent="center">
              <Spinner color="primary.100" accessibilityLabel="Loading posts" />
              <Heading color="primary.100" fontSize="md">Cargando</Heading>
            </HStack>
          }
          
          { courses.length === 0 && !loading && <Text mx={8} mt={4} fontWeight={'bold'} color={'primary.100'} fontSize={20}>No hay Workshops</Text> }

          <Box mt='5' mb={24}>
            { courses.length > 0 && courses.map((item) => (
              <RenderOffer
                key={item.id}
                image={item.image.url}
                title={item.title}
                text={item.description}
                url={item.url}
                time={item.partner}
                hours={''}
                method={''}
                rating={item.point}
                navigation={navigation}
                mainTitle={'Cursos & Workshops'}
                buttonValue={'Quiero hacerlo!'}
                redirect_to={'Anoffer'}
                border={false}
                subject_id={0}
                id={item.id} 
                firstLetter={item.title.toString().substring(0,1)}
              />
            )) 
            }
          </Box>
        </Box>
      </ScrollView>

      { !mainTitle ?  <BottomTab route={route} navigation={navigation} /> : <Box /> }
    </Container>
  )
}

export default CoursesAndWorkshops