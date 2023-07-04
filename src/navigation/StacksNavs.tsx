import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import On1Screen from "../screens/Onboarding/On1Screen";
import On2Screen from "../screens/Onboarding/On2Screen";
import Home from "../screens/Home";
import News from "../screens/News/News";
import Offers from "../screens/Offers/Offers";
import Menu from "../screens/Menu/Menu";
import SubSections from "../screens/SubSections/SubSections";
import CoursesAndWorkshops from "../screens/CoursesAndWorkshops/CoursesAndWorkshops";
import Anoffer from "../screens/Anoffer/Anoffer";
import SubjectContent from "../screens/Resourcesandtools/SubjectContent";
import Subjects from "../screens/Resourcesandtools/Subject";
import Config from "../screens/Config/Config";
import RedirectTo from "../screens/Config/RedirectTo";
import SplashScreen from "../screens/Splashscreen/SplashScreen";
import OpinionThread from "../screens/Subjectopinion_thread/OpinionThread";
import ReplyToTheThread from "../screens/Subjectopinion_replytothethread/ReplyToTheThread";
import SeeSubjectThread from "../screens/Subjectopinion_seesubjectthread/SeeSubjectThread";
import { useSelector } from "react-redux";
import CreateNewThread from "../screens/Subjectopinion_createnewthread/CreateNewThread";
import RecoveryPassword from "../screens/Recoverpassword/RecoveryPassword";
import ChooseAnOption from "../screens/Recoverpassword/ChooseAnOption";
import NewPassword from "../screens/Recoverpassword/NewPassword";
import UpdatedPassword from "../screens/Recoverpassword/UpdatedPassword";
import GoogleAuth from "../screens/GoogleAuth";
import GoogleRegister from "../screens/GoogleRegister";
import AboutSubject from "../screens/AboutSubject/AboutSubject";
import { SearchCourse } from "../screens/searchCourse/SearchCourse";
import { MarketDetail } from "../screens/MarketDetail";
import OfferForm from "../screens/Offers/OfferForm";
import CoursesForm from "../screens/CoursesAndWorkshops/CoursesForm";
import JobOfferForm from "../screens/JobOffers/JobOfferForm";
import ResourceForm from "../screens/Resourcesandtools/ResourceForm";

const Stack = createStackNavigator();


//We create stacks for each screen, Stacks can have various screens inside them.
export function NavStack() {
  const token = useSelector((state: any) => state.token);
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="SplashScreen"
        component={SplashScreen}
        
      />

      {!token ? (
        <Stack.Group
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="GoogleLogin" component={GoogleAuth} />
          <Stack.Screen name="GoogleRegister" component={GoogleRegister} />
          <Stack.Screen name="Registro" component={RegisterScreen} />

          <Stack.Screen name="RecoveryPassword" component={RecoveryPassword} />
          <Stack.Screen name="ChooseAnOption" component={ChooseAnOption} />
          <Stack.Screen name="NewPassword" component={NewPassword} />
          <Stack.Screen name="UpdatedPassword" component={UpdatedPassword} />
        </Stack.Group>
      ) : (
        <Stack.Group
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Onboarding1" component={On1Screen} />
          <Stack.Screen name="Onboarding2" component={On2Screen} />

          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="News" component={News} />
          <Stack.Screen name="SearchCourse" component={SearchCourse} />

          <Stack.Screen name="Offers" component={Offers} />
          <Stack.Screen name="OfferForm" component={OfferForm} />
          <Stack.Screen name="CoursesForm" component={CoursesForm} />
          <Stack.Screen name="JobOfferForm" component={JobOfferForm} />
          <Stack.Screen name="Menu" component={Menu}  

          
          
          />


          <Stack.Screen name="Subsections" component={SubSections} />
          <Stack.Screen name="Subjects" component={Subjects} />
          <Stack.Screen name="AboutSubject" component={AboutSubject} />

          <Stack.Screen name="SubjectContent" component={SubjectContent} />
          <Stack.Screen name="ResourceForm" component={ResourceForm} />
          <Stack.Screen name="Anoffer" component={Anoffer} />

          <Stack.Screen name="MarketDetail" component={MarketDetail} />

          <Stack.Screen
            name="Coursesandworkshops"
            component={CoursesAndWorkshops}
          />
          <Stack.Screen name="Config" component={Config} />
          <Stack.Screen name="RedirectTo" component={RedirectTo} />

          <Stack.Screen
            name="OpinionThread"
            component={OpinionThread}
            options={({ route }: any) => ({ title: route.params.value })}
          />
          <Stack.Screen name="ReplyToTheThread" component={ReplyToTheThread} />
          <Stack.Screen
            name="SeeSubjectThread"
            component={SeeSubjectThread}
            options={({ route }: any) => ({ title: route.params.value })}
          />
          <Stack.Screen name="CreateNewThread" component={CreateNewThread} />

          <Stack.Screen name="RecoveryPassword" component={RecoveryPassword} />
          <Stack.Screen name="ChooseAnOption" component={ChooseAnOption} />
          <Stack.Screen name="NewPassword" component={NewPassword} />
          <Stack.Screen name="UpdatedPassword" component={UpdatedPassword} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
