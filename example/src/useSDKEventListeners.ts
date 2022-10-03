import { useEffect } from 'react';
import { getDJISDKEventEmitter } from 'react-native-dji-mobile-sdk';
import Toast from 'react-native-toast-message';

const useSDKEventListeners = () => {
  useEffect(() => {
    const eventEmitter = getDJISDKEventEmitter();
    const subscribe = eventEmitter.addListener('REGISTRATION_SUCCESS', () => {
      console.log('Registration success');
      Toast.show({
        text1: 'Registration success',
      });
    });
    eventEmitter.addListener('PRODUCT_CONNECTED', () => {
      console.log('Product connected');
      Toast.show({
        text1: 'Product connect',
      });
    });
    eventEmitter.addListener('PRODUCT_DISCONNECTED', () => {
      console.log('Product disconnected');
      Toast.show({
        text1: 'Product disconnect',
      });
    });
    eventEmitter.addListener('NEW_VIDEO_FRAME', (event) => {
      console.log('New video frame', event);
    });
    return () => {
      subscribe.remove();
    };
  }, []);
};

export { useSDKEventListeners };
