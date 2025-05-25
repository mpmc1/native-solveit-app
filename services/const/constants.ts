import Constants from 'expo-constants';

const { REQUESTS_URI } = Constants.expoConfig?.extra;
export const requestUri = REQUESTS_URI || 'https://solveit-app-bmbgbxcheedfanbd.eastus2-01.azurewebsites.net/api/v1/';
