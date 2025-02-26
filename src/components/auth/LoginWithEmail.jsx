import ButtonComponent from '@/components/common/ButtonComponent'
import ContainerComponent from '@/components/common/ContainerComponent'
import InputComponent from '@/components/common/InputComponent'
import RowComponent from '@/components/common/RowComponent'
import SectionComponent from '@/components/common/SectionComponent'
import SpaceComponent from '@/components/common/SpaceComponent'
import TextComponent from '@/components/common/TextComponent'
import { colors } from '@/constants/colors'
import { fontFamilies } from '@/constants/fontFamilies'
import { auth } from '@/firebase/config'
import { globalStyles } from '@/styles/globalStyles'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useCallback, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const LoginWithEmail = () => {
  const navigation = useNavigation()
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
        setEmail('')
        setPassword('')
      })
      .catch((error) => {
        setError('Tài khoản không hợp lệ !')
        console.log('Login Failure: ', error)
      })
  }

  // Reset error khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      setError('')
    }, [])
  )

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

        <RowComponent>
          <ButtonComponent text='Login' onPress={handleLogin} styles={{ width: '100%' }} />
        </RowComponent>

        <SpaceComponent height={15}></SpaceComponent>

        <RowComponent>
          <TextComponent text="Don't have an account?" />
          <SpaceComponent width={5}></SpaceComponent>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterWithEmail')}>
            <TextComponent text='Sign up' color={colors.lightBlue} />
          </TouchableOpacity>
        </RowComponent>

        <SpaceComponent height={15}></SpaceComponent>

        <RowComponent>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordWithEmail')}>
            <TextComponent text='Forgot password' color={colors.lightBlue} />
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  )
}

export default LoginWithEmail
