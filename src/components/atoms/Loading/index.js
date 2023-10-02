import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {COLORS} from '../../../constants';
import * as Progress from 'react-native-progress';

const {width, height} = Dimensions.get('window');
const Loading = () => {
  return (
    <View style={styles.container}>
      <Progress.CircleSnail thickness={12} size={160} color={COLORS.primary} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
