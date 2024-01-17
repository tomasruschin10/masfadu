import React from 'react'
import WelcomePage from '../../components/welcomePages/WelcomePage'

const On4Screen = ({navigation}) => {
    const redirect = () => {
        navigation.navigate('Onboarding5')
    }
  return (
    <>
      <WelcomePage 
      title='El mercado de Fadu' 
      redirect={redirect} 
      buttonText='Siguiente'
      />
    </>
  )
}

export default On4Screen
