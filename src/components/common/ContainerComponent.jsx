import { colors } from '@/constants/colors'
import { globalStyles } from '@/styles/globalStyles'
import { SafeAreaView, ScrollView, View } from 'react-native'

const ContainerComponent = (props) => {
  const { children, styles, isScroll = true } = props

  if (!children) {
    return null
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgColor }}>
      {isScroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[
            globalStyles.container,
            {
              flexGrow: 1
            },
            styles
          ]}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[globalStyles.container, {}, styles]}>{children}</View>
      )}
    </SafeAreaView>
  )
}

export default ContainerComponent
