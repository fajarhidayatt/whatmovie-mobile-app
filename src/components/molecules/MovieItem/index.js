import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Octicons} from '@expo/vector-icons';
import {getImage, truncateText} from '../../../utils';
import {COLORS, FALLBACK_POSTER} from '../../../constants';

const {width} = Dimensions.get('window');

const MovieItem = ({
  title,
  posterPath,
  voteAverage,
  voteCount,
  size = 'large',
  onPress,
}) => {
  const moviePoster = getImage(185, posterPath) || FALLBACK_POSTER;
  const styleImg = {
    small: {
      width: width * 0.33,
      height: 200,
      borderRadius: 10,
    },
    medium: {
      width: width / 2 - 30,
      height: 250,
      borderRadius: 10,
    },
    large: {
      width: width * 0.6,
      height: 390,
      borderRadius: 30,
    },
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={{uri: moviePoster}} style={styles.image(styleImg[size])} />
      <View>
        <Text style={styles.movieTitle(size)}>
          {size === 'large' ? title : truncateText(title, 15)}
        </Text>
        <View style={styles.ratingWrapper}>
          <Octicons name="star-fill" size={12} color="yellow" />
          <Text
            style={styles.ratingText}>{`${voteAverage} (${voteCount})`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieItem;

const styles = StyleSheet.create({
  image: styleImg => ({
    width: styleImg.width,
    height: styleImg.height,
    borderRadius: styleImg.borderRadius,
    alignSelf: 'center',
  }),
  movieTitle: size => ({
    fontFamily: 'Inter-Bold',
    fontSize: size === 'large' ? 18 : 14,
    color: COLORS.white,
    marginTop: 5,
  }),
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.light1,
    marginLeft: 5,
  },
});
