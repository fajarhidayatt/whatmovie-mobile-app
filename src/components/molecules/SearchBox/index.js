import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button} from '../../atoms';
import {COLORS} from '../../../constants';

const SearchBox = ({value, handleSetText, handleSearch}) => {
  return (
    <View style={styles.header}>
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={handleSetText}
          onSubmitEditing={handleSearch}
          placeholder="Search Movie"
          placeholderTextColor={COLORS.light1}
          style={styles.textInput}
        />
      </View>
      <Button
        iconName="search"
        iconSize={20}
        iconColor={COLORS.white}
        bgColor={COLORS.primary}
        onPress={handleSearch}
      />
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.dark1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  inputWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.white,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  textInput: {
    fontSize: 16,
    color: COLORS.white,
    flex: 1,
    paddingRight: 10,
  },
});
