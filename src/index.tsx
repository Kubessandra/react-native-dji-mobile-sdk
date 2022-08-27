import { NativeEventEmitter, NativeModules } from 'react-native';

import { LINKING_ERROR } from './constant';
import type { SDKDrone } from './SDKDrone';
import type { SDKManager } from './SDKManager';

const { ReactEventEmitter } = NativeModules;

if (!ReactEventEmitter) {
  throw new Error(LINKING_ERROR);
}

let eventEmitter = new NativeEventEmitter(ReactEventEmitter);
const getDJISDKEventEmitter = () => eventEmitter;

export { getDJISDKEventEmitter, SDKManager, SDKDrone };
