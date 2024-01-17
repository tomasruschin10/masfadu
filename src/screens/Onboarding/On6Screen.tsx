import React from 'react'
import WelcomePage from '../../components/welcomePages/WelcomePage'

const On6Screen = ({navigation}) => {
    const redirect = () => {
        navigation.navigate('Home')
    }
  return (
    <>
      <WelcomePage 
      title='El mercado de Fadu' 
      redirect={redirect} 
      buttonText='Ir al inico'
      />
    </>
  )
}

export default On6Screen
