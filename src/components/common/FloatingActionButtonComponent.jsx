import { useState } from 'react'
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const FloatingActionComponent = () => {
  // icon_1, icon_2, icon_3 không phải là một giá trị tĩnh mà là một đối tượng Animated.Value.
  // Đây là một kiểu dữ liệu đặc biệt trong React Native được thiết kế để hỗ trợ animation.

  // Animated.Value có giá trị nội tại (internal value) mà bạn có thể thay đổi trực tiếp thông qua các phương thức như Animated.timing hoặc Animated.spring,
  // mà không cần thông qua setter của useState.

  // Khi giá trị của Animated.Value thay đổi (qua Animated.timing), React Native tự động cập nhật giao diện mà không cần re-render toàn bộ component, nhờ cơ chế animation riêng biệt.
  const [icon_1] = useState(new Animated.Value(40))
  const [icon_2] = useState(new Animated.Value(40))
  const [icon_3] = useState(new Animated.Value(40))

  // Trạng thái "bật ra" (true)
  // Trạng thái "thu lại" (false).
  const [pop, setPop] = useState(false)

  const popIn = () => {
    setPop(true)
    Animated.timing(icon_1, {
      toValue: 130, // Di chuyển từ 40 lên 130 (dịch lên trên 90px theo trục Y).
      duration: 500,
      useNativeDriver: false
    }).start()
    Animated.timing(icon_2, {
      toValue: 110, // Di chuyển từ 40 lên 110 (dịch lên trên và sang trái 70px theo cả trục X và trục Y).
      duration: 500,
      useNativeDriver: false
    }).start()
    Animated.timing(icon_3, {
      toValue: 130, // Di chuyển từ 40 lên 130 (dịch sang trái 90px theo trục X).
      duration: 500,
      useNativeDriver: false
    }).start()

    // toValue: Giá trị đích của animation.
    // duration: 500: Animation kéo dài 500ms (0.5 giây).
    // useNativeDriver: false vì animation thay đổi bottom và right (các thuộc tính layout, không phải transform như rotate hay scale)
  }

  const popOut = () => {
    setPop(false)
    Animated.timing(icon_1, {
      toValue: 40, // Quay trở về vị trí ban đầu
      duration: 500,
      useNativeDriver: false
    }).start()
    Animated.timing(icon_2, {
      toValue: 40, // Quay trở về vị trí ban đầu
      duration: 500,
      useNativeDriver: false
    }).start()
    Animated.timing(icon_3, {
      toValue: 40, // Quay trở về vị trí ban đầu
      duration: 500,
      useNativeDriver: false
    }).start()

    // toValue: Giá trị đích của animation.
    // duration: 500: Animation kéo dài 500ms (0.5 giây).
    // useNativeDriver: false vì animation thay đổi bottom và right (các thuộc tính layout, không phải transform như rotate hay scale)
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, { bottom: icon_1 }]}>
        <TouchableOpacity>
          <Icon name='cloud-upload' size={25} color='#FFFF' />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.circle, { bottom: icon_2, right: icon_2 }]}>
        <TouchableOpacity>
          <Icon name='print' size={25} color='#FFFF' />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.circle, { right: icon_3 }]}>
        <TouchableOpacity>
          <Icon name='share-alt' size={25} color='#FFFF' />
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={styles.circle}
        onPress={() => {
          pop === false ? popIn() : popOut()
        }}
      >
        <Icon name='plus' size={25} color='#FFFF' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  circle: {
    backgroundColor: '#f52d56',
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 40,
    right: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default FloatingActionComponent
