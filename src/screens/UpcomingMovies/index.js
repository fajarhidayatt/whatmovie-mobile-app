import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Loading, MovieItem} from '../../components';
import {fetchUpcomingMovies} from '../../api';
import {COLORS, THEME} from '../../constants';

const {width} = Dimensions.get('window');

const UpcomingMovies = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUpcomingMovies();
  }, []);

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data && data?.results) {
      setMovies(data?.results);
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Button
          iconName="chevron-left"
          iconSize={28}
          iconColor={COLORS.white}
          bgColor="transparent"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Upcoming Movies</Text>
      </View>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={styles.moviesWrapper}>
            {movies?.map(movie => {
              return (
                <View key={movie.id}>
                  <MovieItem
                    size="medium"
                    title={movie.title}
                    posterPath={movie.poster_path}
                    voteAverage={movie.vote_average}
                    voteCount={movie.vote_count}
                    onPress={() =>
                      navigation.navigate('DetailMovie', {idm: movie.id})
                    }
                  />
                  <Gap height={20} />
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default UpcomingMovies;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: THEME.background.primary,
  },
  header: {
    width,
    backgroundColor: THEME.background.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    position: 'absolute',
    zIndex: 100,
  },
  title: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    color: THEME.text.primary,
  },
  moviesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 65,
    paddingBottom: 0,
  },
});
