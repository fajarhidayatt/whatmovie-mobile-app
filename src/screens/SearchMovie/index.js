import React, {useState} from 'react';
import {
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Gap, Loading, MovieItem, SearchBox} from '../../components';
import {MovieNotFound} from '../../assets/images';
import {fetchSearchMovies} from '../../api';
import {THEME} from '../../constants';

const {width, height} = Dimensions.get('window');

const SearchMovie = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async query => {
    Keyboard.dismiss();
    setLoading(true);
    setIsSearch(true);

    const data = await fetchSearchMovies(query);
    if (data && data?.results) {
      setMovies(data?.results);
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <SearchBox
          value={search}
          handleSetText={text => setSearch(text)}
          handleSearch={() => handleSearch(search)}
        />
        <Text style={styles.text}>Results ({movies?.length})</Text>
      </View>
      {loading ? (
        <Loading />
      ) : isSearch && movies?.length < 1 ? (
        <View style={styles.notFoundWrapper}>
          <MovieNotFound width={300} height={300} />
          <Text style={styles.notFoundText}>Upss, Movie Not Found!</Text>
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

export default SearchMovie;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: THEME.background.primary,
  },
  header: {
    width,
    backgroundColor: THEME.background.primary,
    paddingTop: 10,
    paddingBottom: 15,
    position: 'absolute',
    zIndex: 100,
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: THEME.text.primary,
    marginLeft: 20,
  },
  moviesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 110,
    paddingBottom: 0,
  },

  notFoundWrapper: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: THEME.text.primary,
  },
});
