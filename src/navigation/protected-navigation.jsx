import Accordion from '@/components/Accordion'
import Add from '@/components/Add'
import BottomSheetInfo from '@/components/BottomSheetInfo'
import Home from '@/components/Home'
import InfoUser from '@/components/InfoUser'
import List from '@/components/List'
import TabViews from '@/components/TabViews'
import Update from '@/components/Update'
import Welcome from '@/components/Welcome'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

const Stack = createNativeStackNavigator()

const ProtectedNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName='Welcome'
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
      <Stack.Screen name='Welcome' component={Welcome} />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='List' component={gestureHandlerRootHOC(List)} />
      <Stack.Screen name='Add' component={Add} />
      <Stack.Screen name='Update' component={Update} />
      <Stack.Screen name='InfoUser' component={InfoUser} />
      <Stack.Screen name='BottomSheetInfo' component={gestureHandlerRootHOC(BottomSheetInfo)} />
      <Stack.Screen name='TabViews' component={TabViews} />
      <Stack.Screen name='Accordion' component={Accordion} />
    </Stack.Navigator>
  )
}

export default ProtectedNavigation
