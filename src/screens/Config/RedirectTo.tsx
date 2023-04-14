import React from 'react'
import Container from '../../components/Container';
import Layout from '../../utils/LayoutHeader&BottomTab';
import SwitchComponents from '../../utils/SwitchComponents';

const RedirectTo = ({route, navigation}) => (
  <Container>
    <Layout route={route} navigation={navigation} title={route.params.title}>
      <SwitchComponents component={route.params.title} route={route} navigation={navigation} /> 
    </Layout>
  </Container>
)

export default RedirectTo