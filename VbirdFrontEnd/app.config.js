
export default
{
  "expo": {
    "name": "VbirdFrontEnd",
    "slug": "VbirdFrontEnd",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "plugins" : ["@react-native-google-signin/google-signin"],
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package" : "com.heraldCollege.VbirdAuthentication",
      "googleServicesFile" : process.env.GOOGLE_SERVICES_JSON,
      
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "29487b48-9d7e-407d-9898-6d5a3d854176"
      }
    },
    "owner": "aarav1234"
  }
}
