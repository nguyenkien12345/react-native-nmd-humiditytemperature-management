import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { enableScreens } from 'react-native-screens'
import Add from './Add'
import BottomSheetInfo from './BottomSheetInfo'
import Home from './Home'
import InfoUser from './InfoUser'
import List from './List'
import TabViews from './TabViews'
import Update from './Update'
import Welcome from './Welcome'

const Stack = createNativeStackNavigator()

// Chỉ áp dụng cho hệ điều hành android khi sử dụng các tính năng liên quan đến gesture
enableScreens()

function RootComponent() {
  // screenOptions: Cấu hình chung cho tất cả màn hình

  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Welcome'
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
        <Stack.Screen
          name='Home'
          component={Home}
          // truyền các tham số mặc định khi màn hình được mount
          initialParams={{
            name: 'Home',
            author: 'Nguyen Trung Kien'
          }}
        />
        <Stack.Screen name='List' component={gestureHandlerRootHOC(List)} />
        <Stack.Screen name='Add' component={Add} />
        <Stack.Screen name='Update' component={Update} />
        <Stack.Screen name='InfoUser' component={InfoUser} />
        <Stack.Screen name='BottomSheetInfo' component={gestureHandlerRootHOC(BottomSheetInfo)} />
        <Stack.Screen name='TabViews' component={TabViews} />
      </Stack.Navigator>
    </NavigationContainer>
    // </GestureHandlerRootView>
  )
}

export default RootComponent

// Lý thuyết

// + Gesture (cử chỉ) là các tương tác của người dùng với màn hình như:
// - Vuốt (Swipe)
// - Chạm (Tap)
// - Kéo thả (Pan/Drag)
// - Pinch (Thu phóng bằng 2 ngón tay)
// - Long press (Nhấn giữ)
// - Rotation (Xoay)

// + gestureHandlerRootHOC
//  + Nếu không có gestureHandlerRootHOC:
//    - Gesture có thể bị xung đột với gesture của navigation
//    - Hiệu suất xử lý gesture có thể không tối ưu
//    - Có thể gặp vấn đề với nested gesture (gesture lồng nhau)
//    - Không có quản lý độ ưu tiên gesture
