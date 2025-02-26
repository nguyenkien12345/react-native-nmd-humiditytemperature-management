import { useNavigation } from '@react-navigation/native'
import { useCallback, useEffect, useRef } from 'react'
import { Animated, ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native'
import background from '../../assets/images/QLNhietDoDoAmBackground.png'

function Welcome() {
  const navigation = useNavigation()

  const topMotion = useRef(new Animated.Value(-100)).current

  const isMounted = useRef(true)

  const startAnimation = useCallback(() => {
    Animated.timing(topMotion, {
      toValue: 50,
      duration: 1000,
      useNativeDriver: true
    }).start()
  }, [topMotion])

  useEffect(() => {
    isMounted.current = true
  
    const animationTimeout = setTimeout(() => {
      startAnimation()
    }, 1000)

    const navigationTimeout = setTimeout(() => {
      if (isMounted.current) {
        navigation.navigate('InfoUser')
      }
    }, 3000)
   

    return () => {
      isMounted.current = false
      clearTimeout(animationTimeout)
      clearTimeout(navigationTimeout)
    }
  }, [])

  return (
    <ImageBackground style={styles.imageBackground} resizeMode='contain' source={background}>
      <StatusBar barStyle={'light-content'} />

      <SafeAreaView style={styles.safeArea}>
        <Animated.View style={[styles.wrapper, { transform: [{ translateY: topMotion }] }]}>
          <Text style={styles.title}>Quản lý nhiệt độ, độ ẩm, bụi mịn, không khí</Text>
        </Animated.View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%'
  },
  safeArea: {
    flex: 1
  },
  wrapper: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    textTransform: 'capitalize',
    textAlign: 'center',
    padding: 20,
    textShadowColor: 'grey',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10
  }
})

export default Welcome
