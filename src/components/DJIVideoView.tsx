import React, { useEffect, useState } from 'react';
import {
  requireNativeComponent,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import { sdkManager } from '../SDKManager';

interface Props extends ViewProps {}

const DJIVideoView = (props: Props): JSX.Element => {
  const { style } = props;
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    sdkManager.getProduct().then((product) => setAvailable(!!product));
  }, []);

  const containerStyle = {
    ...styles.view,
    // @ts-expect-error
    // typescript doest not like spread on custom typed objects(https://stackoverflow.com/questions/51189388/typescript-spread-types-may-only-be-created-from-object-types)
    ...style,
  };

  if (!available) {
    return (
      <View style={containerStyle}>
        <Text style={styles.text}>
          Connect a product before showing the DJI VideoView
        </Text>
      </View>
    );
  }
  return <NativeDJIVideoView {...props} style={containerStyle} />;
};

const styles = StyleSheet.create({
  text: {
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  view: {
    height: 1920,
    widht: 1080,
    backgroundColor: 'gray',
  },
});

const NativeDJIVideoView = requireNativeComponent<Props>('DJIVideoView');
export { DJIVideoView };
