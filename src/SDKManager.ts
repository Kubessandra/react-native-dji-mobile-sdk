import { NativeModules, PermissionsAndroid, Platform } from 'react-native';
import { LINKING_ERROR } from './constant';
import { SDKDrone } from './SDKDrone';

const { DJISDKManagerWrapper } = NativeModules;

if (!DJISDKManagerWrapper) {
  throw new Error(LINKING_ERROR);
}

export class SDKManager {
  SDKRegistered = false;
  #drone: SDKDrone | undefined;

  connectProduct = async () => {
    if (Platform.OS === 'android') {
      console.log([
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION!,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION!,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE!,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE!,
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE!,
      ]);
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION!,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION!,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE!,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE!,
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE!,
      ]);
      Object.entries(granted).map(([key, values]) => {
        if (values !== 'granted') {
          throw new Error(`Permission not granted for ${key}`);
        }
      });
      const timeoutConnect = setTimeout(() => {
        throw new Error('Timeout connecting to product app DJI SDK');
      }, 10000);
      await DJISDKManagerWrapper.connectProduct();
      this.SDKRegistered = true;
      clearTimeout(timeoutConnect);
      this.#drone = new SDKDrone();
    }
  };

  getDrone = async () => {
    if (!this.#drone || !this.SDKRegistered) {
      throw new Error('Drone not registered');
    }
    return this.#drone;
  };
}
