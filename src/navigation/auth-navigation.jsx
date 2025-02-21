import LoginWithEmail from '@/components/auth/LoginWithEmail'
import LoginWithPhone from '@/components/auth/LoginWithPhone'
import RegisterWithEmail from '@/components/auth/RegisterWithEmail'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName='RegisterWithEmail'
      // screenOptions: Cấu hình chung cho tất cả màn hình
      screenOptions={{
        headerShown: false,
        // orientation: "default" Màn hình sẽ hiển thị ở cả 2 chế độ ngang và dọc
        orientation: 'default',
        // gestureEnabled: true Cho phép gesture để navigate (ví dụ: vuốt để back)
        gestureEnabled: true,
        // gestureDirection: "horizontal" Hướng vuốt ngang
        // gestureDirection: "vertical" Hướng vuốt dọc
        gestureDirection: 'horizontal',
        // animationTypeForReplace: "push" Animation giống như đẩy màn hình mới vào (từ phải sang trái)
        // animationTypeForReplace: "pop" Animation giống như lấy màn hình cũ ra (từ trái sang phải)
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
        fullScreenGestureEnabled: true // Cho phép người dùng vuốt từ cạnh màn hình để quay lại màn hình trước đó
      }}
    >
      <Stack.Screen name='RegisterWithEmail' component={RegisterWithEmail} />
      <Stack.Screen name='LoginWithEmail' component={LoginWithEmail} />
      <Stack.Screen name='LoginWithPhone' component={LoginWithPhone} />
    </Stack.Navigator>
  )
}

export default AuthNavigation
