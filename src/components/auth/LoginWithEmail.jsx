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
import { useRoute } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

const LoginWithEmail = () => {
  const route = useRoute()

  const { email: emailParam, password: passwordParam } = route.params ?? {}

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam)
    }
    if (passwordParam) {
      setPassword(passwordParam)
    }
  }, [emailParam, passwordParam])

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log('Login Success: ', user)
      })
      .catch((error) => {
        setError('Tài khoản không hợp lệ !')
        console.log('Login Failure: ', error)
      })
  }

  return (
    <ContainerComponent isScroll={false}>
      <SectionComponent styles={[globalStyles.row, globalStyles.center, { paddingTop: '15%' }]}>
        <TextComponent text='Login' size={48} font={fontFamilies.bold} />
        <SpaceComponent width={20} />
        <Icon name='sign-in' size={48} color={colors.white} />
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
          helpText={error}
        />

        <InputComponent
          affix={<Icon name='check' size={20} color={colors.mediumGray} />}
          value={password}
          onChange={(val) => setPassword(val)}
          placeholder='Password'
          label='Password'
          isPassword
          helpText={error}
        />

        <ButtonComponent text='Login' onPress={handleLogin} styles={{ width: '100%' }} />
      </SectionComponent>
    </ContainerComponent>
  )
}

export default LoginWithEmail
