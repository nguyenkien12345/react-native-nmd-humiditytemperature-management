import { View } from 'react-native'

const SpaceComponent = (props) => {
  const { width = 0, height = 0, styles } = props

  return <View style={[{ width, height }, styles]}></View>
}

export default SpaceComponent
