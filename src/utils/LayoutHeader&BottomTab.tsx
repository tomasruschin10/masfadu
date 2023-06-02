import React, { useState } from 'react'
import BottomTab from '../components/BottomTab'
import Container from '../components/Container'
import { HeaderBack } from '../components/Header';
import Menu from '../screens/Menu/Menu';

function Layout({children, route, navigation, title}) {
  const [menuShow, setMenu] = useState(false)
  return (
    <Container>
      <HeaderBack title={title} />
         { menuShow ? <Menu navigation={navigation} route={route} setMenu={setMenu}/> : null  }
      {children}
      <BottomTab setMenu={setMenu} route={route} navigation={navigation} />
    </Container>
  )
}

export default Layout