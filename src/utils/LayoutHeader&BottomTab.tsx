import React, { useState } from 'react'
import BottomTab from '../components/BottomTab'
import Container from '../components/Container'
import { HeaderBack } from '../components/Header';
import Menu from '../screens/Menu/Menu';

function Layout(props) {
  const { children, route, navigation, title, addButtonUrl } = props;
  const [menuShow, setMenu] = useState(false)
  return (
    <Container>
      <HeaderBack navigation={navigation} title={title} addButtonUrl={addButtonUrl} />
      {menuShow ? <Menu navigation={navigation} route={route} setMenu={setMenu} /> : null}
      {children}
      <BottomTab setMenu={setMenu} route={route} navigation={navigation} />
    </Container>
  )
}

export default Layout