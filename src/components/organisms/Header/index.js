import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../constants';
import {Button} from '../../atoms';

const Header = ({handleMenu, handleSearch}) => {
  return (
    <View style={styles.header}>
      <Button
        iconName="three-bars"
        iconSize={24}
        iconColor={COLORS.white}
        onPress={handleMenu}
      />
      <Text style={styles.title}>
        <Text style={styles.whatText}>What</Text>Movie
      </Text>
      <Button
        iconName="search"
        iconSize={24}
        iconColor={COLORS.white}
        onPress={handleSearch}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: 'Inter-Regular',
    fontSize: 24,
    color: COLORS.white,
  },
  whatText: {
    fontFamily: 'Inter-Bold',
    color: COLORS.primary,
  },
});
