import { NativeModules, NativeEventEmitter } from 'react-native';
import { LINKING_ERROR } from './constant';

const { ReactEventEmitter } = NativeModules;

if (!ReactEventEmitter) {
  throw new Error(LINKING_ERROR);
}

let eventEmitter = new NativeEventEmitter(ReactEventEmitter);
const getDJISDKEventEmitter = () => eventEmitter;

export { getDJISDKEventEmitter };
