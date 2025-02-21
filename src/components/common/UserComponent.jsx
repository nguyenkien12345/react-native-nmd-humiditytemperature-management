import RowComponent from '@/components/common/RowComponent'
import TextComponent from '@/components/common/TextComponent'
import { TouchableOpacity } from 'react-native'

const UserComponent = (props) => {
  const { user } = props

  if (!user) {
    return null
  }

  const { name, email } = user

  return (
    <TouchableOpacity
      style={[
        {
          padding: 12,
          marginBottom: 6
        }
      ]}
    >
      <RowComponent>
        <TextComponent text={name} flex={1} />
      </RowComponent>

      <TextComponent text={email} color={'#e0e0e0'} />
    </TouchableOpacity>
  )
}

export default UserComponent
