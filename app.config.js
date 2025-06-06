import 'dotenv/config';

export default {
  expo: {
    name: "solveIt",
    slug: "solveit",
    version: "1.0.1",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    scheme: "solveit",
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      package: "com.carlospuerta.solveit"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-router"
    ],
    extra: {
      router: {},
      eas: {
        projectId: "2e04cafa-122c-4904-9c42-1035ecb1a856"
      },
      EXPO_PUBLIC_REQUESTS_URI: process.env.EXPO_PUBLIC_REQUESTS_URI,
    },
    owner: "carlospuerta"
  },
};