import React from 'react'
import WelcomePage from '../../components/welcomePages/WelcomePage'

const On5Screen = ({navigation}) => {
    const redirect = () => {
        navigation.navigate('Onboarding6')
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

export default On5Screen
