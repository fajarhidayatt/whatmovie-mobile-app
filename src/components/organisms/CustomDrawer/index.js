import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {COLORS, THEME} from '../../../constants';

const CustomDrawer = props => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>
        <Text style={styles.whatText}>What</Text>Movie
      </Text> */}
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background.primary,
    padding: 10,
  },
  // title: {
  //   fontFamily: 'Inter-Regular',
  //   fontSize: 24,
  //   color: THEME.text.primary,
  //   textAlign: 'center',
  //   marginBottom: 5,
  // },
  // whatText: {
  //   fontFamily: 'Inter-Bold',
  //   color: COLORS.primary,
  // },
});
