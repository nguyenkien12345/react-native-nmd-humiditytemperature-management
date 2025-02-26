import { auth } from '@/firebase/config'
import AuthNavigation from '@/navigation/auth-navigation'
import ProtectedNavigation from '@/navigation/protected-navigation'
import { NavigationContainer } from '@react-navigation/native'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

const Router = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false)

  // useEffect(() => {
  // onAuthStateChanged: theo dõi trạng thái xác thực của người dùng. Nó sẽ tự động gọi lại (callback) mỗi khi trạng thái
  // xác thực thay đổi, chẳng hạn như khi người dùng đăng nhập, đăng xuất, hoặc khi token xác thực được làm mới.
  // const unsubscribe = onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     setIsAuthenticated(true)
  //   } else {
  //     setIsAuthenticated(false)
  //   }
  // })

  // return () => unsubscribe();
  // }, [])

  // return <NavigationContainer>{isAuthenticated ? <ProtectedNavigation /> : <AuthNavigation />}</NavigationContainer>
  return (
    <NavigationContainer>
      <ProtectedNavigation />
    </NavigationContainer>
  )
}

export default Router
