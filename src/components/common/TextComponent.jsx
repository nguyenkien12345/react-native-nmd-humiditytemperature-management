import { colors } from '@/constants/colors'
import { globalStyles } from '@/styles/globalStyles'
import { Text } from 'react-native'

const TextComponent = (props) => {
  const { text = '', color = colors.white, size = 14, styles, flex = 0 } = props

  return (
    <Text
      style={[
        globalStyles.text,
        {
          color: color,
          fontSize: size,
          // Nếu flex là 1 => Chiếm hết diện tích còn lại
          flex: flex
        },
        styles
      ]}
    >
      {text}
    </Text>
  )
}

export default TextComponent
