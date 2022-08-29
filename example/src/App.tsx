import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { Text, View } from 'react-native';
import { getDJISDKEventEmitter, sdkManager } from 'react-native-dji-mobile-sdk';

export default function App() {
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
    setTimeout(() => {
      sdkManager
        .registerApp()
        .then(() => {
          console.log('registerApp success');
        })
        .catch((error: any) => {
          console.error('RegisterAPPP', error);
        });
    }, 1000);
    return () => {
      subscribe.remove();
    };
  }, []);

  return (
    <View>
      <Text>Result</Text>
      <Toast />
    </View>
  );
}
