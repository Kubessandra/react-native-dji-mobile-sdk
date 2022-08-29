import { NativeEventEmitter, NativeModules } from 'react-native';

import { LINKING_ERROR } from './constant';
import { SDKManager } from './SDKManager';

const { ReactEventEmitter } = NativeModules;

if (!ReactEventEmitter) {
  throw new Error(LINKING_ERROR);
}

let eventEmitter = new NativeEventEmitter(ReactEventEmitter);
const getDJISDKEventEmitter = () => eventEmitter;

const sdkManager = new SDKManager();

export { getDJISDKEventEmitter, sdkManager };

export type { SDKDrone } from './SDKDrone';
export type { SDKManager } from './SDKManager';
