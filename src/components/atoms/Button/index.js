import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Octicons} from '@expo/vector-icons';

const Button = ({iconName, iconColor, iconSize, onPress, bgColor}) => {
  return (
    <TouchableOpacity style={styles.container(bgColor)} onPress={onPress}>
      <Octicons name={iconName} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: bgColor => ({
    backgroundColor: bgColor,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  }),
});
