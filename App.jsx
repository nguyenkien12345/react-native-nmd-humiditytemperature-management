import Router from '@/router/router'
import {
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
  useFonts
} from '@expo-google-fonts/roboto'
import React from 'react'
import { ActivityIndicator } from 'react-native'

function App() {
  // useFonts: Để tải các font chữ tùy chỉnh
  // fontsLoaded: Cho biết font chữ đã được tải xong hay chưa
  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic
  })

  if (!fontsLoaded) {
    return <ActivityIndicator />
  }

  return (
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  )
}

export default App
