# Expo Instant App Plugin
## Instant Apps
Android instant apps are apps that can be tried and used within certain limits, without installing them fully on your device.
## Scope
A plugin that applies instant-app enabling modifications of native source code, such as within `AndroidManifest.xml`, in order to make your expo-project instant-app compatible.
## Usage
- `npm i expo-instant-app` or `yarn add expo-instant-app`
- Within `app.json`, add `expo-instant-app` to your `"plugins" : {"expo": }` block.
- Run `eas build --platform android`  
