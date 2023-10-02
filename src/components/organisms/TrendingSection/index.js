import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {MovieItem} from '../../molecules';
import {COLORS} from '../../../constants';
import Carousel from 'react-native-snap-carousel';

const {width} = Dimensions.get('window');

const TrendingSection = ({navigation, movies}) => {
  const renderMovies = ({item}) => {
    return (
      <MovieItem
        title={item.title}
        posterPath={item.poster_path}
        voteAverage={item.vote_average}
        voteCount={item.vote_count}
        onPress={() => navigation.navigate('DetailMovie', {idm: item.id})}
      />
    );
  };

  return (
    <View>
      <Text style={styles.title}>Trending</Text>
      <Carousel
        data={movies}
        keyExtractor={item => item.id}
        renderItem={renderMovies}
        firstItem={5}
        inactiveSlideOpacity={0.5}
        sliderWidth={width}
        itemWidth={width * 0.65}
        slideStyle={styles.slide}
      />
    </View>
  );
};

export default TrendingSection;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: COLORS.white,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  slide: {
    display: 'flex',
    alignItems: 'center',
  },
});
