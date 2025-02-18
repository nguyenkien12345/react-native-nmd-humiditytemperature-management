import TextComponent from '@/components/common/TextComponent'
import { globalStyles } from '@/styles/globalStyles'
import { Image, View } from 'react-native'

const AvatarComponent = (props) => {
  const {
    photoUrl = '',
    size = 45,
    bordered = false,
    border: { width, color },
    styles
  } = props

  const localStyles = [globalStyles.avatar, {}, styles]

  return (
    <View>
      {photoUrl ? (
        <Image source={{ uri: photoUrl }} style={localStyles} />
      ) : (
        <View style={localStyles}>
          <TextComponent text='A' />
        </View>
      )}
    </View>
  )
}

export default AvatarComponent
