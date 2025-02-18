import { globalStyles } from '@/styles/globalStyles'
import { View } from 'react-native'

const SectionComponent = (props) => {
  const { children, styles } = props

  if (!children) {
    return null
  }

  return <View style={[globalStyles.section, {}, styles]}>{children}</View>
}

export default SectionComponent
