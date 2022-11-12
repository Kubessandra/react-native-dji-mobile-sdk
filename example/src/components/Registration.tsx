import React from 'react';
import { Button, View } from 'react-native';
import { SDKDrone, sdkManager } from 'react-native-dji-mobile-sdk';
import Toast from 'react-native-toast-message';

interface RegistrationProps {
  onDroneConnected: (drone: SDKDrone) => void;
}

const Registration = (props: RegistrationProps) => {
  const { onDroneConnected } = props;

  const initDrone = async () => {
    try {
      await sdkManager.registerApp();
      console.log('Registration success');
      await sdkManager.startConnectionToProduct();
      console.log('Connection success');
      const newDrone = await sdkManager.getProduct();
      onDroneConnected(newDrone);
    } catch (e) {
      Toast.show({
        text1: 'Connection Failed',
      });
      console.error('connect error', e);
    }
  };

  return (
    <View>
      <Button title="Make Registration of Drone" onPress={initDrone} />
    </View>
  );
};

export default Registration;
