> Nếu gặp lỗi khi chạy react native với môi trường expo như sau: Uncaught Error: java.io.IOException: Failed to download remote update thì mở Window PowerShell lên và gõ: **setx /M REACT_NATIVE_PACKAGE_HOSTNAME 192.168.0.103** (192.168.0.103 là địa chỉ IPv4 Address lấy thông qua câu lệnh ipconfig trên terminal)

- npx expo-doctor
- npx expo install --fix
- npx expo install --check

- npm install -g expo-cli@latest
- rm -rf node_modules package-lock.json
- npm install --legacy-peer-deps
- npx expo install expo@latest
- npx expo start -c 

- rm -rf .expo 
- rm -rf node_modules 
- rm -rf $TMPDIR/metro-*

- watchman watch-del-all

- npm cache clean --force
- yarn cache clean

- npx expo start --clear --tunnel

"splash": {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#ffffff"
},