import ButtonComponent from '@/components/common/ButtonComponent'
import ContainerComponent from '@/components/common/ContainerComponent'
import InputComponent from '@/components/common/InputComponent'
import SectionComponent from '@/components/common/SectionComponent'
import SpaceComponent from '@/components/common/SpaceComponent'
import TextComponent from '@/components/common/TextComponent'
import { colors } from '@/constants/colors'
import { fontFamilies } from '@/constants/fontFamilies'
import { auth } from '@/firebase/config'
import { globalStyles } from '@/styles/globalStyles'
import { checkLength, validateEmail } from '@/utils/validations'
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword, validatePassword } from 'firebase/auth'
import { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

const RegisterWithEmail = () => {
  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cfPassword, setCfPassword] = useState('')

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    cfPassword: ''
  })

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
      cfPassword: ''
    }

    if (!checkLength(email)) {
      newErrors.email = 'Vui lòng nhập email'
    } else if (!validateEmail(email)) {
      newErrors.email = 'Định dạng email không hợp lệ !'
    }

    if (!checkLength(password)) {
      newErrors.password = 'Vui lòng nhập password'
    } else if (!validatePassword(password)) {
      newErrors.password = 'Định dạng password không hợp lệ !'
    }

    if (password !== cfPassword) {
      newErrors.cfPassword = 'Mật khẩu không trùng khớp !'
    }

    setErrors(newErrors)

    return Object.values(newErrors).every((error) => error === '')
  }

  const handleRegister = () => {
    if (!validateForm()) return

    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        navigation.navigate('LoginWithEmail', { email, password })
      })
      .catch((error) => {
        console.log('Register Failure: ', error)
      })
  }

  return (
    <ContainerComponent isScroll={false}>
      <SectionComponent styles={[globalStyles.row, globalStyles.center, { paddingTop: '15%' }]}>
        <TextComponent text='Register' size={48} font={fontFamilies.bold} />
        <SpaceComponent width={20} />
        <Icon name='registered' size={48} color={colors.white} />
      </SectionComponent>

      <SectionComponent styles={[globalStyles.center, { flex: 1 }]}>
        <InputComponent
          affix={<Icon name='user' size={20} color={colors.mediumGray} />}
          value={email}
          onChange={(val) => setEmail(val)}
          placeholder='Email'
          label='Email'
          clear
          keyboardType='email-address'
          autoFocus
          helpText={errors.email}
        />

        <InputComponent
          affix={<Icon name='check' size={20} color={colors.mediumGray} />}
          value={password}
          onChange={(val) => setPassword(val)}
          placeholder='Password'
          label='Password'
          isPassword
          helpText={errors.password}
        />

        <InputComponent
          affix={<Icon name='check' size={20} color={colors.mediumGray} />}
          value={cfPassword}
          onChange={(val) => setCfPassword(val)}
          placeholder='Confirm Password'
          label='Confirm Password'
          isPassword
          helpText={errors.cfPassword}
        />

        <ButtonComponent text='Register' onPress={handleRegister} styles={{ width: '100%' }} />
      </SectionComponent>
    </ContainerComponent>
  )
}

export default RegisterWithEmail
