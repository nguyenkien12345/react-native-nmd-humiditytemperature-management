import { colors } from '@/constants/colors'
import { fontFamilies } from '@/constants/fontFamilies'
import { globalStyles } from '@/styles/globalStyles'
import { Text } from 'react-native'

const TextComponent = (props) => {
  const { text = '', color = colors.white, size = 14, styles, flex = 0, font = fontFamilies.regular } = props

  return (
    <Text
      style={[
        globalStyles.text,
        {
          color: color,
          fontSize: size,
          fontFamily: font,
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
