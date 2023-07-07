import React, { useEffect, useState } from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { Box, Button, Icon, IconButton, Input, ScrollView, Text, HStack, Spinner, Heading } from 'native-base';
import { RenderOpinion } from '../../utils/hooks/useMultiple'
import useSearchSubject from '../../utils/hooks/useSearchSubject';
import { NoHeader } from '../../components/Header';
import { ModalWarning2 } from "../../screens/AboutSubject/Modals";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from 'react-redux';
import Container from '../../components/Container';
import Layout from '../../utils/LayoutHeader&BottomTab';
function SubjectOpinions({ route, navigation, mainTitle }) {
  const { search, setSearch, filteredSubjects, allSubjects, loading } = useSearchSubject()
  const [showWarning, setShowWarning] = useState(true);
  const { notice } = useSelector((state: any) => state.notice);


  useEffect(() => {
    console.log("NOTICE STATE ", notice?.value)
  }, [notice?.value])


  const colores = ['#E85E29']

  return (
    <Container>
      <Layout
        route={route}
        navigation={navigation}
        title={`Opiniones`}
      >
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <ModalWarning2 showWarning={showWarning && notice?.value !== true} setShowWarning={setShowWarning} />
          <HStack mt={0} mb={4} alignItems={'center'} justifyContent="center">
            <MaterialIcons
              name={"search"}
              size={17}
              color="gray"
              style={{ position: 'absolute', left: "8.8%", zIndex: 1 }}
            />
            <Input
              style={{ marginLeft: "8%" }}
              onChangeText={text => setSearch(text)}
              value={search}
              isDisabled={allSubjects.length > 0 ? false : true}

              w={{ base: "75%", md: "25%", }}
              pb="1"
              type={"text"}
              placeholder="Buscar "
              placeholderTextColor="#666666"
            />
            <IconButton
              onPress={() => { setSearch('') }}
              ml="3"
              rounded={"xl"}
              backgroundColor={"primary.900"}
              icon={<Icon as={EvilIcons} name="close-o" size="md" color={search.length > 0 ? "red.500" : "muted.400"} />}
            />
          </HStack>

          {filteredSubjects.length === 0 && loading === false &&
            <Box mx={8}>
              <Text fontWeight={'bold'} color={'primary.100'} fontSize={20}>No hay hilos para mostrar</Text>
            </Box>
          }
          {
            !loading ?
              <Button display={'none'} /> :
              <HStack mb={3} space={2} justifyContent="center">
                <Spinner accessibilityLabel="Loading posts" />
                <Heading color="brand.primary" fontSize="md">Cargando</Heading>
              </HStack>
          }

          {filteredSubjects.length > 0 && filteredSubjects.map(item => (
            <RenderOpinion
              key={item.id}
              border={false}
              text={``}
              title={item.name}
              navigation={navigation}
              mainTitle={mainTitle}
              subject_id={item.id}
              id={item.id}
              redirect_to={'SeeSubjectThread'}
              time={item.info}
              hours={''}
              method={''}
              rating={item.opinionsCount}
              firstLetter={item?.prefix || ''}
              color={colores[Math.floor(Math.random() * colores.length)]}
            />
          )).reverse()}
          <Box mb={'24'} />
        </ScrollView>
      </Layout>
    </Container>
  )
}

export default SubjectOpinions