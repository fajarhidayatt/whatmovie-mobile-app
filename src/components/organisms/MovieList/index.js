import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {MovieItem} from '../../molecules';
import {COLORS} from '../../../constants';

const MovieList = ({title, navigation, movies}) => {
  const renderMovies = ({item}) => {
    return (
      <View style={styles.movieItemWrapper}>
        <MovieItem
          title={item.title}
          posterPath={item.poster_path}
          voteAverage={item.vote_average}
          voteCount={item.vote_count}
          onPress={() => navigation.navigate('DetailMovie', {idm: item.id})}
          size="small"
        />
      </View>
    );
  };

  return (
    <View>
      <View style={styles.top}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <FlatList
        data={movies}
        keyExtractor={item => item.id}
        renderItem={renderMovies}
        horizontal
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  title: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    color: COLORS.white,
  },
  contentContainer: {
    paddingStart: 20,
  },
  movieItemWrapper: {
    marginRight: 15,
  },
});
