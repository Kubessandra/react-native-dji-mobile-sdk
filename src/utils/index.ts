import type { EmitterSubscription } from 'react-native';
import { getDJISDKEventEmitter } from '../SDKEventEmitter';

const onceProductConnected = (cb: () => void): EmitterSubscription => {
  const sub = getDJISDKEventEmitter().addListener('PRODUCT_CONNECTED', () => {
    sub.remove();
    cb();
  });
  return sub;
};

export { onceProductConnected };
