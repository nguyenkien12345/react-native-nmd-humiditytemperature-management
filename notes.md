> Nếu gặp lỗi khi chạy react native với môi trường expo như sau: Uncaught Error: java.io.IOException: Failed to download remote update thì mở Window PowerShell lên và gõ: **setx /M REACT_NATIVE_PACKAGE_HOSTNAME 192.168.0.103** (192.168.0.103 là địa chỉ IPv4 Address lấy thông qua câu lệnh ipconfig trên terminal)

- npx expo-doctor
- npx expo install --fix
- npx expo install --check

- npm install -g expo-cli@latest
- rm -rf node_modules package-lock.json
- npm install --legacy-peer-deps
- npx expo install expo@latest
- npx expo start -c

- watchman watch-del-all

- npm cache clean
- yarn cache clean

"splash": {
"image": "./assets/splash.png",
"resizeMode": "contain",
"backgroundColor": "#ffffff"
},

# Sự khác biệt giữa View và SafeAreaView

> - View: Nó không tự động xử lý các vùng an toàn trên màn hình, nghĩa là nếu bạn sử dụng View để hiển thị nội dung, nội dung đó có thể bị che khuất bởi notch, thanh điều hướng (navigation bar), hoặc các phần khác của giao diện người dùng.
> - SafeAreaView: Nó tự động điều chỉnh để tránh các vùng như notch, thanh điều hướng, hoặc các phần khác của giao diện người dùng có thể che khuất nội dung.

# Gesture và gestureHandlerRootHOC

> - Gesture (cử chỉ) là các tương tác của người dùng với màn hình như:

- Vuốt (Swipe)
- Chạm (Tap)
- Kéo thả (Pan/Drag)
- Pinch (Thu phóng bằng 2 ngón tay)
- Long press (Nhấn giữ)
- Rotation (Xoay)

> - gestureHandlerRootHOC: Nếu không có gestureHandlerRootHOC:

- Gesture có thể bị xung đột với gesture của navigation
- Hiệu suất xử lý gesture có thể không tối ưu
- Có thể gặp vấn đề với nested gesture (gesture lồng nhau)
- Không có quản lý độ ưu tiên gesture
