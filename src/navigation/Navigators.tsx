import { NavigationProvider } from "../context";
import { NavStack } from "./StacksNavs";

export default function Navigator() {
  //Here we should to put the stack navigator that we want to use
  return (
    <NavigationProvider>
      <NavStack />
    </NavigationProvider>
  );
}
