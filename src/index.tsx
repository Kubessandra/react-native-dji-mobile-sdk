import { NativeModules, PermissionsAndroid, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-dji-mobile-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const DJISDKManagerWrapper = NativeModules.DJISDKManagerWrapper  ? NativeModules.DJISDKManagerWrapper  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );
  
class DJISDKManager {
  SDKRegistered = false

  registerApp = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.VIBRATE!,
        PermissionsAndroid.PERMISSIONS.INTERNET!,
        PermissionsAndroid.PERMISSIONS.ACCESS_WIFI_STATE!,
        PermissionsAndroid.PERMISSIONS.WAKE_LOCK!,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION!,
        PermissionsAndroid.PERMISSIONS.ACCESS_NETWORK_STATE!,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION!,
        PermissionsAndroid.PERMISSIONS.CHANGE_WIFI_STATE!,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE!,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH!,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADMIN!,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE!,
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE!,
      ]);
      Object.entries(granted).map(([key, values]) => {
        if (values !== 'granted' ) {
          throw new Error(`Permission not granted for ${key}`);
        }
      })
      DJISDKManagerWrapper.registerApp();
    }
  }
}

export function multiply(a: number, b: number): Promise<number> {
  return DJISDKManagerWrapper.multiply(a, b);
}

export default DJISDKManager
