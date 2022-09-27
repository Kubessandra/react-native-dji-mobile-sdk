import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, View } from 'react-native';
import type { SDKDrone } from 'react-native-dji-mobile-sdk';
import Control from './Control';
import Infos from './Infos';
import Registration from '../components/Registration';

interface HomeProps {
  drone: SDKDrone | null;
  onDroneConnected: (drone: SDKDrone) => void;
}

const Home = (props: HomeProps) => {
  const navigation = useNavigation<any>();
  const { drone, onDroneConnected } = props;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {drone && <Infos drone={drone} />}
      {drone && <Control drone={drone} />}
      <View
        style={{
          flex: 1,
          marginHorizontal: 16,
          justifyContent: 'space-around',
        }}
      >
        <Registration onDroneConnected={onDroneConnected} />
        <Button
          color="purple"
          title="Go to Camera"
          onPress={() => navigation.navigate('DroneCam')}
        />
        <Button
          color="green"
          title="Go to Controls"
          onPress={() => navigation.navigate('Control')}
        />
        <Button
          color="blue"
          title="Go to drone infos"
          onPress={() => navigation.navigate('Infos')}
        />
      </View>
    </View>
  );
};

export default Home;
