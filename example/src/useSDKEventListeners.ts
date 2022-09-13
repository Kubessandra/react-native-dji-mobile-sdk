import { useEffect } from 'react';
import { getDJISDKEventEmitter } from 'react-native-dji-mobile-sdk';
import Toast from 'react-native-toast-message';

const useSDKEventListeners = () => {
  useEffect(() => {
    const eventEmitter = getDJISDKEventEmitter();
    const subscribe = eventEmitter.addListener(
      'REGISTRATION_SUCCESS',
      (event: any) => {
        console.log(event);
        Toast.show({
          text1: 'Registration success',
        });
      }
    );
    eventEmitter.addListener('PRODUCT_CONNECTED', (event: any) => {
      console.log(event);
      Toast.show({
        text1: 'Product connect',
      });
    });
    eventEmitter.addListener('PRODUCT_DISCONNECTED', (event: any) => {
      console.log(event);
      Toast.show({
        text1: 'Product disconnect',
      });
    });
    return () => {
      subscribe.remove();
    };
  }, []);
};

export { useSDKEventListeners };
