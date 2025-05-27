import Constants from 'expo-constants';

const { EXPO_PUBLIC_REQUESTS_URI } = Constants.expoConfig?.extra;
export const requestUri = EXPO_PUBLIC_REQUESTS_URI || 'http://192.168.20.29:9595/api/v1/';
