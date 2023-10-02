import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {getImage, truncateText} from '../../../utils';
import {COLORS, FALLBACK_PROFIL} from '../../../constants';

const CastItem = ({realName, character, image, onPress}) => {
  const castPhoto = getImage(185, image) || FALLBACK_PROFIL;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{uri: castPhoto}} style={styles.image} />
      <Text style={styles.character}>{truncateText(character, 10)}</Text>
      <Text style={styles.realName}>{truncateText(realName, 10)}</Text>
    </TouchableOpacity>
  );
};

export default CastItem;

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  character: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 5,
  },
  realName: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.light1,
    textAlign: 'center',
  },
});
