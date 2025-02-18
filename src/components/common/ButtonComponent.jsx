import TextComponent from '@/components/common/TextComponent'
import { colors } from '@/constants/colors'
import { globalStyles } from '@/styles/globalStyles'
import { TouchableOpacity } from 'react-native'

const ButtonComponent = (props) => {
  const {
    styles,
    text = '',
    iconBefore = null,
    iconAfter = null,
    color = colors.white,
    bgColor = colors.lightBlue,
    onPress
  } = props

  const localStyles = [[globalStyles.button, { backgroundColor: bgColor }, styles]]

  return (
    <TouchableOpacity onPress={onPress} style={localStyles}>
      {iconBefore && iconBefore}

      {text && <TextComponent text={text} color={color} />}

      {iconAfter && iconAfter}
    </TouchableOpacity>
  )
}

export default ButtonComponent
