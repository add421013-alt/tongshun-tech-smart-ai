# 統順 Tech Smart AI - Stable Expo MVP

這是為「後天前送審」準備的穩定版 Expo MVP。

## 啟動

```bash
cd ~/Downloads
unzip tongshun-tech-smart-ai-expo-stable-mvp.zip
cd tongshun-tech-smart-ai-stable
npm install
npx expo start -c
```

## 為什麼這版更穩

- 移除 expo-router、expo-linking、expo-constants 的手動小版本綁定，避開 npm ETARGET。
- 使用 create-expo-app 目前產生的 Expo SDK 56 基礎依賴。
- 單一 App.js，降低送審前的路由與套件風險。
- 保留首頁、產品、AI 問答、預約、客服、法務六大核心頁。

## 後天送審策略

1. 先用 Expo Go 確認畫面與內容。
2. 再補正式 App Icon / 截圖。
3. 使用 EAS Build 建立 iOS / Android 包。
4. 送審時說明第一版以產品資訊、FAQ、預約與客服導流為主。
