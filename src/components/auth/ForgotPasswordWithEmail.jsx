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
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useCallback, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const ForgotPasswordWithEmail = () => {
  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleResetPassword = () => {
    setMessage('')
    setError('')

    if (!email) {
      setError('Vui lòng nhập email!')
      return
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage('Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn!')
        setEmail('')
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          setError('Email không hợp lệ!')
        } else if (error.code === 'auth/user-not-found') {
          setError('Không tìm thấy tài khoản với email này!')
        } else {
          setError('Có lỗi xảy ra. Vui lòng thử lại!')
        }
        console.log('Reset Password Error: ', error)
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
        <TextComponent text='Forgot' size={48} font={fontFamilies.bold} />
        <SpaceComponent width={20} />
        <Icon name='lock' size={48} color={colors.white} />
      </SectionComponent>

      <SectionComponent styles={[globalStyles.center, { flex: 1 }]}>
        <TextComponent text='Enter your email to receive a password reset link' size={15} color={colors.mediumGray} />

        <SpaceComponent height={20} />

        <InputComponent
          affix={<Icon name='envelope' size={20} color={colors.mediumGray} />}
          value={email}
          onChange={(val) => setEmail(val)}
          placeholder='Email'
          clear
          autoFocus
          keyboardType='email-address'
          helpText={error || message}
          helpTextColor={error ? colors.danger : colors.green}
        />

        <RowComponent>
          <ButtonComponent text='Send Reset Link' onPress={handleResetPassword} styles={{ width: '100%' }} />
        </RowComponent>

        <SpaceComponent height={15}></SpaceComponent>

        <RowComponent>
          <TouchableOpacity onPress={() => navigation.navigate('LoginWithEmail')}>
            <TextComponent text='Sign in' color={colors.lightBlue} />
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  )
}

export default ForgotPasswordWithEmail
