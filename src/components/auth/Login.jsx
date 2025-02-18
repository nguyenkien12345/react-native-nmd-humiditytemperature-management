import { auth } from '@/firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { Button, TextInput, View } from 'react-native'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleReset = () => {
    setEmail('')
    setPassword('')
  }

  const handleLogin = async () => {
    console.log({
      email,
      password
    })

    await signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log('Login Success: ', user)
      })
      .catch((error) => {
        console.log('Login Fail: ', error)
      })
  }

  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <TextInput value={email} onChange={(event) => setEmail(event.nativeEvent.text)} placeholder='Enter Email' />

      <TextInput
        value={password}
        onChange={(event) => setPassword(event.nativeEvent.text)}
        placeholder='Enter Password'
        secureTextEntry={true} // Ẩn văn bản nhập vào
      />

      <Button title='Login' onPress={handleLogin} />
    </View>
  )
}

export default Login
