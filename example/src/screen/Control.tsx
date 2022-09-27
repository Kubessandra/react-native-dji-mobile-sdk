import React from 'react';
import { View, Button } from 'react-native';
import type { SDKDrone } from 'react-native-dji-mobile-sdk';

interface ControlProps {
  drone: SDKDrone;
}

const Control = (props: ControlProps) => {
  const { drone } = props;

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          margin: 8,
        }}
      >
        <Button color="green" title="TakeOFF" onPress={drone.startTakeOff} />
      </View>
      <View style={{ margin: 8, marginBottom: 20 }}>
        <Button color="red" title="Landing" onPress={drone.startLanding} />
      </View>
    </View>
  );
};

export default Control;
