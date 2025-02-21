import ButtonComponent from '@/components/common/ButtonComponent'
import ContainerComponent from '@/components/common/ContainerComponent'
import InputComponent from '@/components/common/InputComponent'
import RowComponent from '@/components/common/RowComponent'
import SectionComponent from '@/components/common/SectionComponent'
import SpaceComponent from '@/components/common/SpaceComponent'
import TextComponent from '@/components/common/TextComponent'
import { colors } from '@/constants/colors'
import { fontFamilies } from '@/constants/fontFamilies'
import { globalStyles } from '@/styles/globalStyles'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const LoginWithPhone = () => {
  const [phone, setPhone] = useState('')

  const handleLogin = async () => {}

  return (
    <ContainerComponent isScroll={false}>
      <SectionComponent styles={[globalStyles.row, globalStyles.center, { paddingTop: '15%' }]}>
        <TextComponent text='Login' size={48} font={fontFamilies.bold} />
        <SpaceComponent width={20} />
        <Icon name='sign-in' size={48} color={colors.white} />
      </SectionComponent>

      <SectionComponent styles={[globalStyles.center, { flex: 1 }]}>
        <InputComponent
          affix={<Icon name='mobile-phone' size={20} color={colors.mediumGray} />}
          value={phone}
          onChange={(val) => setPhone(val)}
          placeholder='Phone'
          label='Phone'
          clear
          keyboardType='phone-pad'
          autoFocus
        />
      </SectionComponent>

      <SectionComponent>
        <ButtonComponent text='Login' onPress={handleLogin} />
        <SpaceComponent height={12}></SpaceComponent>
        <RowComponent>
          <TextComponent text="Don't have an account?" />
          <SpaceComponent width={4}></SpaceComponent>
          <TouchableOpacity>
            <TextComponent text='Register' color={colors.lightBlue} />
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  )
}

export default LoginWithPhone
