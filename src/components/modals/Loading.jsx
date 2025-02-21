import { colors } from '@/constants/colors'
import { globalStyles } from '@/styles/globalStyles'
import { ActivityIndicator, Modal, View } from 'react-native'

const LoadingComponent = (props) => {
  const { visible } = props

  return (
    <Modal visible={visible} transparent animationType='slide' style={[{ flex: 1 }]}>
      <View style={[globalStyles.modalLoadng, globalStyles.center, { flex: 1 }]}>
        <ActivityIndicator color={colors.white} />
      </View>
    </Modal>
  )
}

export default LoadingComponent
