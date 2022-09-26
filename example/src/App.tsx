/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { Button, Text, View } from 'react-native';
import { DJIVideoView, sdkManager } from 'react-native-dji-mobile-sdk';
import type { SDKDrone } from 'lib/typescript';
import { useSDKEventListeners } from './useSDKEventListeners';

export default function App() {
  const [drone, setDrone] = useState<SDKDrone | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [droneModel, setDroneModel] = useState('');
  const [droneID, setDroneID] = useState('');
  useSDKEventListeners();

  const initDrone = async () => {
    try {
      await sdkManager.registerApp();
      console.log('Registration success');
      await sdkManager.startConnectionToProduct();
      console.log('Connection success');
      const newDrone = await sdkManager.getProduct();
      setDrone(newDrone);
    } catch (e) {
      Toast.show({
        text1: 'Connection Failed',
      });
      console.error('connect error', e);
    }
  };

  useEffect(() => {
    if (drone) {
      const cb = async () => {
        const connected = await drone.isConnected();
        const newDroneID = await drone.getSerialNumber();
        setDroneModel(await drone.getModel());
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
            <Text>DroneModel {droneModel}</Text>
          </>
        )}
      </View>
      {drone && (
        <>
          <View
            style={{
              width: '100%',
              height: '60%',
            }}
          >
            <>
              <Text>{JSON.stringify(DJIVideoView, null, 2)}</Text>
              <DJIVideoView style={{
                // TODO - this is a hack to get the video to show up
                // Need to find a a better way to do this
                width: 200,
                height: 200,
              }} />
            </>
          </View>
          <View
            style={{
              margin: 8,
            }}
          >
            <Button
              color="green"
              title="TakeOFF"
              onPress={drone.startTakeOff}
            />
          </View>
          <View style={{ margin: 8, marginBottom: 20 }}>
            <Button color="red" title="Landing" onPress={drone.startLanding} />
          </View>
        </>
      )}
      {!drone && <Button title="Refresh registration" onPress={initDrone} />}
      <Toast />
    </View>
  );
}
