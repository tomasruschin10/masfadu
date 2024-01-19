import React from 'react'
import WelcomePage from '../../components/welcomePages/WelcomePage'

const On5Screen = ({navigation}) => {
    const redirect = () => {
        navigation.navigate('Onboarding6')
    }
  return (
    <>
      <WelcomePage 
      title='Opiniones de materias' 
      redirect={redirect} 
      buttonText='Siguiente'
      />
    </>
  )
}

export default On5Screen
