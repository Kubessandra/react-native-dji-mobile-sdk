import { NativeModules } from 'react-native';
import { LINKING_ERROR } from './constant';

const { DJISDKAircraftWrapper } = NativeModules;

if (!DJISDKAircraftWrapper) {
  throw new Error(LINKING_ERROR);
}

export class SDKDrone {
  async getID(): Promise<string> {
    const droneID = await DJISDKAircraftWrapper.getDroneID();
    return droneID;
  }

  async isConnected(): Promise<boolean> {
    const isConnected = await DJISDKAircraftWrapper.isDroneConnected();
    return isConnected;
  }

  async getModel(): Promise<string> {
    const model = await DJISDKAircraftWrapper.getDroneModel();
    return model;
  }
}
