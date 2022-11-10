import { NativeModules } from 'react-native';
import { LINKING_ERROR } from './constant';

const { DJISDKAircraftWrapper } = NativeModules;

if (!DJISDKAircraftWrapper) {
  throw new Error(LINKING_ERROR);
}

export class SDKAircraft {
  async getSerialNumber(): Promise<string> {
    const serialNumber = await DJISDKAircraftWrapper.getSerialNumber();
    return serialNumber;
  }

  async isConnected(): Promise<boolean> {
    const isConnected = await DJISDKAircraftWrapper.isDroneConnected();
    return isConnected;
  }

  async getModel(): Promise<string> {
    const model = await DJISDKAircraftWrapper.getModel();
    return model;
  }

  async startTakeOff(): Promise<void> {
    await DJISDKAircraftWrapper.startTakeOff();
  }

  async startLanding(): Promise<void> {
    await DJISDKAircraftWrapper.startLanding();
  }

  async startVideoSubscribe(): Promise<void> {
    await DJISDKAircraftWrapper.startVideoSubscribe();
  }
}
