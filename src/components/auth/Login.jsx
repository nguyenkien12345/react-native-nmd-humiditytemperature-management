import ButtonComponent from '@/components/common/ButtonComponent'
import ContainerComponent from '@/components/common/ContainerComponent'
import InputComponent from '@/components/common/InputComponent'
import SectionComponent from '@/components/common/SectionComponent'
import { colors } from '@/constants/colors'
import { auth } from '@/firebase/config'
import { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log('Login Success: ', user)
      })
      .catch((error) => {
        console.log('Login Failure: ', error)
      })
  }

  return (
    <ContainerComponent>
      <SectionComponent
        styles={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 100
        }}
      >
        <InputComponent
          affix={<Icon name='user' size={20} color={colors.mediumGray} />}
          value={email}
          onChange={(val) => setEmail(val)}
          placeholder='email'
          label='Email'
          clear
          keyboardType='email-address'
          helpText='Something went wrong'
        />

        <InputComponent
          affix={<Icon name='check' size={20} color={colors.mediumGray} />}
          value={password}
          onChange={(val) => setPassword(val)}
          placeholder='password'
          label='Password'
          isPassword
          helpText='Something went wrong'
        />

        <ButtonComponent text='Login' onPress={handleLogin} styles={{ width: '100%' }} />
      </SectionComponent>
    </ContainerComponent>
  )
}

export default Login
