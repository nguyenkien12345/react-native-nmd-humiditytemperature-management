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

(Tài liệu tham khảo: https://rnfirebase.io)
(Tài liệu tham khảo: https://docs.expo.dev/develop/development-builds/create-a-build)

# Hướng dẫn setup Firebase HTTP V1 Push Notifications (Build cho android)

- 1. Gõ: (terminal của dự án) **npm install --save @react-native-firebase/app**

- 2. Gõ: (terminal của dự án) **npm install --save @react-native-firebase/messaging**

- 3. Gõ: (terminal của dự án) **npx expo install expo-dev-client**

- 4. Gõ: (terminal của dự án) **eas build --profile development --platform android**
     Lưu ý: Ở bước **Generate a new Android Keystore?** => Chọn YES
     => Nó sẽ mất 1 khoảng thời gian để tiến hành build => Vui lòng đợi 1 khoảng thời gian => Sau khi build thành công thì nó sẽ xuất hiện 1 mã QR Code. Nhưng chúng ta sẽ không quét mã QR này. Chúng ta cứ để yên đấy

- 5. Vào Project Firebase của chúng ta trên website. Tại mục **Project Overview** của dự án, chọn **Project settings**, tại thanh tabs chọn **Service accounts**, tại mục **Firebase Admin SDK**, mục **Admin SDK configuration snippet**, tick chọn **Node.js**, bấm **Generate new private key**. Lúc này sẽ có 1 file **service-account.json** được tải xuống (Tuyệt đối không rename file này). Chúng ta sẽ để file này vào root của dự án mobile của chúng ta

- 6. Chúng ta sẽ dựa theo tài liệu sau: **https://docs.expo.dev/push-notifications/fcm-credentials/** để tiến hành setup tiếp các bước còn lại
  - (terminal của dự án) Gõ: **eas credentials**. Lúc này nó sẽ hiển thị ra các option lựa chọn, chúng ta sẽ chọn lần lượt như sau (Từ trên xuống, từ trái qua phải): 
  **Android > production > Google Service Account** 
  **Manage your Google Service Account Key for Push Notifications (FCM V1)**
  **Set up a Google Service Account Key for Push Notifications (FCM V1)**
  Sau khi đã chọn lần lượt 5 options trên theo thứ tự từ trên xuống thì tại câu hỏi **A Google Service Account JSON key has been found at (đường dẫn đến cái file service-account.json) ? Would you like to use this file?** => Chọn **Y**
  => Nó hiển thị 1 thông báo là **Google Service Account Key for FCM V1 already set up.** => Nghĩa là chúng ta đã xong

- 7. Vào **https://expo.dev/**, ngay tại trang **Dashboard**, mục **Projects (All Projects)**, nhấn chọn vào dự án mà chúng ta muốn setup phần FCM Notifications. Sau khi được chuyển đến trang chi tiết dự án, bên thanh sidebar (tay trái), tìm đến mục 
**Configuration**, mục **Credentials**, nhìn bên tay phải chúng ta sẽ thấy một ứng dụng **android**, tại mục **Application identifier**, hiển thị **com.nguyentrungkienliverpool.ManagementApplication** (Nó sẽ tương ứng với **android.package** trong file **app.json** trong dự án của chúng ta). Nhấn vào mục **com.nguyentrungkienliverpool.ManagementApplication** này. Chúng ta sẽ được chuyển đến màn hình chi tiết, chúng ta sẽ kéo xuống từ từ tìm đến mục **FCM V1 service account key**, lúc này chúng ta sẽ thấy thông tin liên quan đến file **service account key** mà chúng ta đã setup cho dự án này (Chỉ vậy thôi ấy mà ^^)

- 8. (Mở 1 terminal mới nhưng vẫn đang đứng ngay tại dự án) Gõ **eas credentials**. Lúc này nó sẽ hiển thị ra các option lựa chọn, chúng ta sẽ chọn lần lượt như sau (Từ trên xuống, từ trái qua phải): 
  **Android > development > Keystore: Manage everything needed to build your project** 
  **Set up a new keystore**
  - Tại mục **Assign a name to your build credentials:**  Gõ Enter
  - Tại mục **Do you want to set this as your default build credentials?** Gõ Y
  => Nếu lúc này nó hiển thị ra terminal như sau thì tức là chúng ta đã thành công: 
  ```
  Configuration: Build Credentials 5iUpjn_pFX (Default)  
  Keystore  
  Type                JKS
  Key Alias           aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  MD5 Fingerprint     aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  SHA1 Fingerprint    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  SHA256 Fingerprint  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  Updated             2 minutes ago
  ```
  Chúng ta sẽ lưu laị 2 cái **SHA1 Fingerprint** và **SHA256 Fingerprint**

- 9. Vào Project Firebase của chúng ta trên website. Ngay tại trang Dashboard của dự án. Chọn **Add app**, chọn **Android**. Chúng ta sẽ được chuyển đến một màn hình **Add Firebase to your Android app**. 
  + Tại mục **Register app (Step 1)**, 
  - Mục **Android package name**, điền **com.nguyentrungkienliverpool.ManagementApplication** (Lấy từ **expo.android.package** của file **app.json** trong dự án mobile của chúng ta)
  - Mục **App nickname (optional)**, đăt gì cũng được
  - Mục **Debug signing certificate SHA-1 (optional)**, chúng ta sẽ dán cái mã của **SHA1 Fingerprint** mà chúng ta đã tạo ở trên
  - Bấm **Register app**

  + Tại mục **Download and then add config file (Step 2)**
  - Bấm **Download google-services.json**
  - Bấm **Next**

  + Tại mục **Add Firebase SDK**
  - Đang tick chọn **Kotlin DSL (build.gradle.kts)**
  - Bấm **Next**

  + Tại mục **Next steps**
  - Bấm **Continue to console**

- 10. Vào Project Firebase của chúng ta trên website. Tại mục **Project Overview** của dự án, chọn **Project settings**, tại thanh tabs chọn **General**, kéo xuống phần **Your apps**, tại mục **Android apps**, ứng dụng **AuthenticationAppFCM** (Đây chính là cái **App nickname** mà chúng ta đặt tên ở bước 9). Bấm **Add fingerprint**. Tại mục **Certificate fingerprint**,
chúng ta sẽ dán cái mã của **SHA1 Fingerprint** mà chúng ta đã tạo ở bước 8 vào. Bấm **Save**. Sau đó kéo lên trên (scroll chuột lên), bấm download **google-services.json**. Chúng ta sẽ để file này vào root của dự án mobile của chúng ta

- 11. Mở file **app.json** của chúng ta lên thêm vào dòng sau (Nằm trong expo.android): 
**"googleServicesFile": "./google-services.json",** 
=> Trong đó **./google-services.json** chính là đường dẫn đến file google-services.json của chúng ta do google-services.json và app.json nằm cùng cấp

- 12. (terminal của dự án) Gõ: **eas build --profile development --platform android**
=> Sau khi chạy thành công thì nó sẽ hiển thị ra 1 mã QR Code. Chúng ta vẫn cứ để nguyên màn hình này

- 13. (terminal của dự án) Gõ: **eas build -p android --profile preview**
=> Sau khi chạy thành công thì nó sẽ hiển thị ra 1 mã QR Code. Chúng ta sẽ quyét mã QR code này. Nó sẽ hiển thị ra 1 màn hình yêu cầu download file APK này về để tiến hành cài đặt trên máy. Sau khi cài đặt xong mở lên chạy như bình thường


# Giải thích chi tiết về file service-account.json của firebase
> file service-account.json là một tệp chứa thông tin xác thực (credentials) được sử dụng để cho phép ứng dụng của bạn tương tác với các dịch vụ của Firebase một cách an toàn, đặc biệt khi bạn cần thực hiện các tác vụ phía máy chủ (server-side) hoặc quản trị (admin). Đây là tệp JSON được tạo từ Firebase Console và thường được gọi là Service Account Key.
Vì Firebase là một phần của Google Cloud, file này cũng có thể được dùng để truy cập các dịch vụ khác của Google Cloud nếu dự án của bạn yêu cầu.