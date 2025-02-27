import messaging from '@react-native-firebase/messaging'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'

const PushNotification = () => {
  const [permissionGranted, setPermissionGranted] = useState(false)

  // Yêu cầu quyền từ người dùng để gửi push notification.
  const requestUserPermission = async () => {
    try {
      // Hỏi người dùng xem họ có cho phép ứng dụng gửi thông báo không
      const authStatus = await messaging().requestPermission()

      // AUTHORIZED: Người dùng đã chấp nhận.
      // PROVISIONAL: Quyền tạm thời (chỉ iOS).
      // DENIED: Người dùng từ chối.
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL

      console.log('Authorization status:', authStatus)

      return enabled
    } catch (error) {
      console.log('Request permission failed:', error)
      return false
    }
  }

  const fetchFcmToken = async () => {
    try {
      // Lấy FCM token của thiết bị (một chuỗi định danh duy nhất để gửi thông báo đến thiết bị đó).
      const token = messaging().getToken()

      console.log('FCM Token:', token)

      return token
    } catch (error) {
      console.log('Failed to get FCM token:', error)
      return null
    }
  }

  useEffect(() => {
    const initializeNotifications = async () => {
      const granted = await requestUserPermission()
      setPermissionGranted(granted)

      if (granted) {
        await fetchFcmToken()
      } else {
        console.log('Notification permission not granted')
      }

      // Xử lý thông báo khi ứng dụng bị tắt hoàn toàn
      const initialNotification = await messaging().getInitialNotification()
      if (initialNotification) {
        console.log('App opened from quit state:', initialNotification.notification)
      }
    }

    initializeNotifications()

    // Listener khi ứng dụng từ background mở lên
    const onAppOpened = messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('App opened from background:', remoteMessage.notification)
    })

    // Xử lý thông báo khi ứng dụng ở trạng thái background hoặc quit. Hàm này chạy trong một worker riêng, không liên quan trực tiếp đến giao diện.
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background: ', remoteMessage)
    })

    // Chạy khi ứng dụng đang foreground (mở và hoạt động) và nhận được thông báo.
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
    })

    return () => {
      unsubscribe()
      onAppOpened() // Hủy listener onNotificationOpenedApp
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text>FCM Tutorial - Permission: {permissionGranted ? 'Granted' : 'Not Granted'}</Text>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default PushNotification
