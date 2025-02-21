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

# Giải thích chi tiết về file app.json

{
"expo": {
// Tên ứng dụng hiển thị trên thiết bị
"name": "ManagementApplication",

    // ID duy nhất của ứng dụng trên Expo, dùng cho URL public
    "slug": "ManagementApplication",

    // Phiên bản ứng dụng
    "version": "1.0.0",

    // Định hướng màn hình: "portrait" (dọc) hoặc "landscape" (ngang)
    "orientation": "portrait",

    // Icon ứng dụng
    "icon": "./assets/icon.png",

    // Giao diện mặc định: "light" hoặc "dark" hoặc "automatic"
    "userInterfaceStyle": "light",

    // Pattern cho việc đóng gói assets
    "assetBundlePatterns": ["**/*"],

    // Cấu hình cho iOS
    "ios": {
      "supportsTablet": true  // Hỗ trợ iPad
    },

    // Cấu hình cho Android
    "android": {
      "softwareKeyboardLayoutMode": "pan" // Cách xử lý bàn phím
    },

    // Cấu hình cho Web
    "web": {
      "favicon": "./assets/favicon.png"
    },

    // Các plugins Expo được sử dụng
    "plugins": ["expo-font"]

    // Mô tả ứng dụng
    "description": "Mô tả app của bạn",

    // Cấu hình màn hình khởi động (splash screen)
    "splash": {
        "image": "./assets/splash.png",
        "resizeMode": "contain",
        "backgroundColor": "#ffffff"
    }

}
}
