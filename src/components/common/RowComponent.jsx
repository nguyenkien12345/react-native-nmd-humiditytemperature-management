import { globalStyles } from '@/styles/globalStyles'
import { TouchableOpacity, View } from 'react-native'

const RowComponent = (props) => {
  const { children, styles, onPress = null } = props

  if (!children) {
    return null
  }

  const localStyles = [[globalStyles.row, globalStyles.center, {}, styles]]

  return onPress ? (
    <TouchableOpacity onPress={onPress} style={localStyles}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={localStyles}>{children}</View>
  )
}

export default RowComponent
