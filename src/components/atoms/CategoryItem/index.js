import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../constants';

const CategoryItem = ({name, isActive, onPress}) => {
  return (
    <TouchableOpacity style={styles.container(isActive)} onPress={onPress}>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: isActive => ({
    backgroundColor: isActive ? COLORS.primary : COLORS.dark2,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 5,
    borderRadius: 50,
  }),
  name: {
    color: COLORS.white,
  },
});
