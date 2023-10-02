import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../constants';
import {Link} from '../../atoms';
import {MovieItem} from '../../molecules';

const UpcomingSections = ({navigation, movies}) => {
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
        <Text style={styles.title}>Upcoming</Text>
        <Link
          text="View All"
          onPress={() => navigation.navigate('UpcomingMovies')}
        />
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

export default UpcomingSections;

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
