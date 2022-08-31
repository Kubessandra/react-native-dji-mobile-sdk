import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { Button, Text, View } from 'react-native';
import { getDJISDKEventEmitter, sdkManager } from 'react-native-dji-mobile-sdk';
import type { SDKDrone } from 'lib/typescript';

export default function App() {
  const [drone, setDrone] = useState<SDKDrone | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [droneID, setDroneID] = useState('');

  const registrationCB = () => {
    sdkManager
      .connectProduct()
      .then(async () => {
        console.log('connect success');
        const newDrone = await sdkManager.getDrone();
        setDrone(newDrone);
      })
      .catch((error: any) => {
        Toast.show({
          text1: 'Connection Failed',
        });
        console.error('connect error', error);
      });
  };

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

  useEffect(() => {
    if (drone) {
      const cb = async () => {
        const connected = await drone.isConnected();
        const newDroneID = await drone.getID();
        setIsConnected(connected);
        setDroneID(newDroneID);
      };
      cb();
    }
  }, [drone]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          margin: 8,
          alignItems: 'center',
        }}
      >
        <Text>Result</Text>
        <Text
          style={{
            marginBottom: 16,
          }}
        >
          Drone Infos
        </Text>
        {drone && (
          <>
            <Text>Is Connected {String(isConnected)}</Text>
            <Text>DroneID {droneID}</Text>
          </>
        )}
      </View>
      <Button title="Refresh registration" onPress={registrationCB} />
      <Toast />
    </View>
  );
}
