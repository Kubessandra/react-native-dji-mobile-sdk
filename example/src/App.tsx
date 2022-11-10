import React, { useCallback, useState } from 'react';

import { useSDKEventListeners } from './useSDKEventListeners';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { SDKDrone } from 'react-native-dji-mobile-sdk';
import Home from './screen/Home';
import Camera from './screen/Camera';
import Toast from 'react-native-toast-message';
import Control from './screen/Control';
import { Text } from 'react-native';
import Infos from './screen/Infos';

type RootStackParamList = {
  Home: undefined;
  DroneCam: undefined;
  Control: undefined;
  Infos: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const NoDroneError = () => <Text style={{ color: 'black' }}>No Drone</Text>;

export default function App() {
  const [drone, setDrone] = useState<SDKDrone | null>(null);
  useSDKEventListeners();

  const HomeNav = useCallback(() => {
    return <Home drone={drone} onDroneConnected={setDrone} />;
  }, [drone, setDrone]);

  const ControlNav = useCallback(() => {
    if (!drone) return <NoDroneError />;
    return <Control drone={drone} />;
  }, [drone]);

  const InfosNav = useCallback(() => {
    if (!drone) return <NoDroneError />;
    return <Infos drone={drone} />;
  }, [drone]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeNav} />
        <Stack.Screen name="DroneCam" component={Camera} />
        <Stack.Screen name="Control" component={ControlNav} />
        <Stack.Screen name="Infos" component={InfosNav} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
