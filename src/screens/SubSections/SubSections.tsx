import React from 'react'
import Container from '../../components/Container';
import Layout from '../../utils/LayoutHeader&BottomTab';
import SwitchComponents from '../../utils/SwitchComponents';

const SubSections = ({route, navigation}) => (
  <Container>
    {
      route.params.title === 'Cuenta' ?
        <SwitchComponents component={route.params.title} route={route} navigation={navigation} /> 
      :
        <Layout title={route.params.title} route={route} navigation={navigation}>
          <SwitchComponents component={route.params.title} route={route} navigation={navigation} /> 
        </Layout>
    }
  </Container>
)

export default SubSections