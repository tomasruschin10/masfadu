import { createDrawerNavigator } from '@react-navigation/drawer';
import Menu from '../screens/Menu/Menu';

const Drawer = createDrawerNavigator();

export function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="menu" component={Menu} />
    </Drawer.Navigator>
  );
}