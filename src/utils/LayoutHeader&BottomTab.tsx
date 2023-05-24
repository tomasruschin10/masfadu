import React from 'react'
import BottomTab from '../components/BottomTab'
import Container from '../components/Container'
import { HeaderBack } from '../components/Header';

function Layout({children, route, navigation, title}) {
  return (
    <Container>
      <HeaderBack title={title} />
      {children}
      <BottomTab route={route} navigation={navigation} />
    </Container>
  )
}

export default Layout