import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Loading, MovieItem} from '../../components';
import {getData} from '../../utils';
import {useIsFocused} from '@react-navigation/native';
import {FontAwesome5} from '@expo/vector-icons';
import {COLORS, THEME} from '../../constants';

const Favorite = ({navigation}) => {
  const isFocus = useIsFocused();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFocus) {
      getData('favorite').then(data => {
        if (data) {
          const dataArr = JSON.parse(data);
          setMovies(dataArr);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    }
  }, [isFocus]);

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
        <Text style={styles.title}>Favorite</Text>
      </View>
      {loading ? (
        <Loading />
      ) : !loading && !movies.length ? (
        <View style={styles.notFoundWrapper}>
          <FontAwesome5 name="heart-broken" size={75} color={COLORS.red} />
          <Text style={styles.title}>No favorite movies yet</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
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

export default Favorite;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.dark1,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.background.primary,
    paddingVertical: 15,
    paddingHorizontal: 10,
    position: 'absolute',
    zIndex: 100,
  },
  title: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    color: COLORS.white,
  },
  moviesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 75,
    paddingBottom: 0,
  },
  notFoundWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
