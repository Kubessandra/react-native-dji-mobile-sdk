import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import type { SDKDrone } from 'react-native-dji-mobile-sdk';

interface InfosProps {
  drone: SDKDrone;
}

const Infos = (props: InfosProps) => {
  const { drone } = props;

  const [isConnected, setIsConnected] = useState(false);
  const [droneModel, setDroneModel] = useState('');
  const [droneID, setDroneID] = useState('');

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
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text
        style={{
          margin: 16,
          color: 'black',
        }}
      >
        Drone Infos
      </Text>
      <View>
        <Text style={{ color: 'black' }}>
          Is Connected {String(isConnected)}
        </Text>
        <Text style={{ color: 'black' }}>DroneID {droneID}</Text>
        <Text style={{ color: 'black' }}>DroneModel {droneModel}</Text>
      </View>
    </View>
  );
};

export default Infos;
