import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { DJIVideoView } from 'react-native-dji-mobile-sdk';

const Camera = () => {
  const windowDim = useWindowDimensions();

  const landscape = windowDim.width > windowDim.height;

  return (
    <View
      style={{
        flex: 1,
        flexDirection: landscape ? 'column' : 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <DJIVideoView
        style={{
          flex: 1,
          aspectRatio: 16 / 9,
          maxHeight: '100%',
          maxWidth: '100%',
        }}
      />
    </View>
  );
};

export default Camera;
