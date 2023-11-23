import React from 'react'
import Container from '../../components/Container';
import Layout from '../../utils/LayoutHeader&BottomTab';
import SwitchComponents from '../../utils/SwitchComponents';
import { View } from 'native-base';

/* const SubSections = ({route, navigation}) => (
  <Container>
    {
      route.params.title === 'Cuenta' ?
        <SwitchComponents component={route.params.title} route={route} navigation={navigation} /> 
      :
        <Layout route={route} navigation={navigation}>
          <SwitchComponents component={route.params.title} route={route} navigation={navigation} /> 
        </Layout>
    }
  </Container>
) */
const SubSections = ({route, navigation}) => (
  <Container>
  <SwitchComponents component={route.params.title} route={route} navigation={navigation} /> 
  </Container>
)
export default SubSections