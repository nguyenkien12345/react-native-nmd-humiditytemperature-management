import { colors } from '@/constants/colors'
import { useRef, useState } from 'react'
import { Animated, Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

const { width, height } = Dimensions.get('screen')

// + Mặt trước: 0deg → 180deg:
// Bắt đầu từ vị trí bình thường (0deg), xoay 180 độ để ẩn đi và nhường chỗ cho mặt sau.
// + Mặt sau: 180deg → 360deg:
// Bắt đầu từ trạng thái ẩn (180deg), xoay thêm 180 độ để hiển thị (360deg, tương đương 0deg trong một vòng quay đầy đủ).

const FlipCardComponent = (props) => {
  const { textFrontSide = 'Front Side', textBackSide = 'Back Side' } = props

  const [isFlipped, setIsFlipped] = useState(false)
  const flipAnimation = useRef(new Animated.Value(0)).current

  // Front Card Rotation
  // - Nếu flipAnimation = 0: Output là "0deg".
  // - Nếu flipAnimation = 180: Output là "180deg".
  // - Nếu flipAnimation ở giữa (ví dụ: 90): Output sẽ là một giá trị trung gian (khoảng "90deg"), được nội suy tuyến tính.
  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg']
  })

  // + Ban đầu (flipAnimation = 0):
  // - frontInterpolate = "0deg".
  // - Mặt trước ở trạng thái bình thường (hiển thị đầy đủ cho người dùng).
  // + Khi lật (flipAnimation = 180):
  // - frontInterpolate = "180deg".
  // - Mặt trước xoay 180 độ quanh trục Y, tức là nó quay ngược lại và trở nên vô hình (do thuộc tính backfaceVisibility: "hidden" trong style).
  const flipToFrontStyle = {
    transform: [{ rotateY: frontInterpolate }]
  }

  // Back Card Rotation
  // - Khi flipAnimation = 0: Output là "180deg".
  // - Khi flipAnimation = 180: Output là "360deg".
  // - Giá trị trung gian (ví dụ: flipAnimation = 90) sẽ cho ra góc xoay khoảng "270deg".
  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg']
  })

  // + Ban đầu (flipAnimation = 0):
  // - backInterpolate = "180deg".
  // - Mặt sau xoay 180 độ, tức là nó hướng ngược lại và bị ẩn (do backfaceVisibility: "hidden").
  // + Khi lật (flipAnimation = 180):
  // - backInterpolate = "360deg".
  // - Mặt sau xoay thêm 180 độ nữa (từ 180deg thành 360deg), quay về vị trí "0deg" tương đối, hiển thị đầy đủ cho người dùng.
  const flipToBackStyle = {
    transform: [{ rotateY: backInterpolate }]
  }

  const handleFlipCard = () => {
    // Animated.spring để tạo cảm giác tự nhiên, mượt mà.
    // toValue: Giá trị đích của flipAnimation.
    // friction: Độ ma sát, ảnh hưởng đến độ "nảy" của animation.
    // tension: Độ căng, ảnh hưởng đến tốc độ animation.
    // useNativeDriver: true => Sử dụng native driver để tăng hiệu suất (animation chạy trên thread native thay vì JS).
    if (isFlipped) {
      // Animate back to the front side
      Animated.spring(flipAnimation, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start()
    } else {
      // Animate front to the back side
      Animated.spring(flipAnimation, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start()
    }

    setIsFlipped((prevState) => !prevState)
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleFlipCard}>
        <View style={styles.cardContainer}>
          <Animated.View style={[styles.card, styles.cardFront, flipToFrontStyle]}>
            <Text style={styles.text}>{textFrontSide}</Text>
          </Animated.View>
          <Animated.View style={[styles.card, styles.cardBack, flipToBackStyle]} z>
            <Text style={styles.text}>{textBackSide}</Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  cardContainer: {
    width: width - 60,
    height: height / 4,
    position: 'relative'
  },
  card: {
    width: width - 60,
    height: height / 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    position: 'absolute',
    backfaceVisibility: 'hidden'
  },
  cardFront: {
    backgroundColor: colors.green
  },
  cardBack: {
    backgroundColor: colors.lightBlue
  },
  text: {
    fontSize: 20,
    fontWeight: 600,
    color: '#FFFFDD'
  }
})

export default FlipCardComponent
