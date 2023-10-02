import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  fetchCreditsMovie,
  fetchDetailMovie,
  fetchSimilarMovies,
} from '../../api';
import {LinearGradient} from 'expo-linear-gradient';
import {Button, CastItem, Gap, Loading, MovieList} from '../../components';
import {getData, getImage, storeData} from '../../utils';
import {COLORS, FALLBACK_POSTER, THEME} from '../../constants';

const {width, height} = Dimensions.get('window');

const DetailMovie = ({navigation, route}) => {
  const {idm} = route.params;

  const [movie, setMovie] = useState({});
  const [casts, setCasts] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(true);

  const moviePoster = getImage(500, movie?.poster_path) || FALLBACK_POSTER;
  const Moviegenres = movie?.genres?.map(cat => cat.name).join(' • ');
  const info = `${movie?.status} • ${movie?.release_date?.split('-')[0]} • ${
    movie?.runtime
  } min`;

  useEffect(() => {
    getDetailMovie(idm);
    getCreditsMovie(idm);
    getSimilarMovies(idm);
    handleGetFavorite();
  }, [idm]);

  const getDetailMovie = async idm => {
    const data = await fetchDetailMovie(idm);
    if (data) {
      setMovie(data);
      setLoading(false);
    }
  };

  const getCreditsMovie = async idm => {
    const data = await fetchCreditsMovie(idm);
    if (data && data?.cast) {
      setCasts(data?.cast?.slice(0, 15));
    }
  };

  const getSimilarMovies = async idm => {
    const data = await fetchSimilarMovies(idm);
    if (data && data?.results) {
      setSimilarMovies(data?.results);
    }
  };

  const handleGetFavorite = () => {
    getData('favorite').then(data => {
      if (data) {
        const dataArr = JSON.parse(data);
        const getId = dataArr.map(item => item.id);
        const isMoviefav = getId.includes(idm);
        setIsFav(isMoviefav);
      }
    });
  };

  const handleAddFavorite = () => {
    const dataMovie = {
      id: movie?.id,
      title: movie?.title,
      poster_path: movie?.poster_path,
      vote_average: movie?.vote_average,
      vote_count: movie?.vote_count,
    };

    getData('favorite').then(data => {
      if (data) {
        const dataArr = JSON.parse(data);

        if (isFav) {
          setIsFav(!isFav);
          const newData = dataArr.filter(item => item.id !== idm);
          storeData('favorite', JSON.stringify(newData));
        } else {
          setIsFav(!isFav);
          dataArr.push(dataMovie);
          storeData('favorite', JSON.stringify(dataArr));
        }
      } else {
        setIsFav(!isFav);
        storeData('favorite', JSON.stringify([dataMovie]));
      }
    });
  };

  const renderCasts = casts?.map(cast => {
    return (
      <CastItem
        key={cast.id}
        realName={cast.original_name}
        character={cast.character}
        image={cast.profile_path}
        onPress={() => navigation.navigate('DetailCast', {idc: cast.id})}
      />
    );
  });

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Button
          iconName="chevron-left"
          iconSize={28}
          iconColor={COLORS.white}
          bgColor={COLORS.primary}
          onPress={() => navigation.goBack()}
        />
        <Button
          iconName="heart-fill"
          iconSize={28}
          iconColor={isFav ? COLORS.red : COLORS.white}
          onPress={handleAddFavorite}
        />
      </View>
      {loading ? (
        <View style={{height}}>
          <Loading />
        </View>
      ) : (
        <View>
          <View>
            <Image source={{uri: moviePoster}} style={styles.imageBg}></Image>
            <LinearGradient
              colors={['transparent', 'rgba(30,29,43,0.8)', 'rgba(30,29,43,1)']}
              style={styles.gradient}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
            />
          </View>
          <View style={styles.contentWrapper}>
            <View style={styles.movieInfoWrapper}>
              <Text style={styles.movieTitle}>{movie?.title}</Text>
              <Gap height={5} />
              <Text style={styles.text}>{info}</Text>
              <Gap height={7} />
              <Text style={styles.text}>{Moviegenres}</Text>
              <Gap height={15} />
              <Text style={styles.text}>{movie?.overview}</Text>
            </View>
            <View style={styles.castSection}>
              <Text style={styles.titleSection}>Cast</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.castWrapper}>
                {renderCasts}
              </ScrollView>
            </View>
            <View style={styles.similarMoviesSection}>
              <MovieList
                title="Similar Movies"
                navigation={navigation}
                movies={similarMovies}
              />
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default DetailMovie;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: THEME.background.primary,
  },
  header: {
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 100,
    padding: 20,
  },

  imageBg: {
    width: width,
    height: height * 0.55,
  },
  gradient: {
    width: width,
    height: height * 0.4,
    position: 'absolute',
    bottom: 0,
  },

  contentWrapper: {
    marginTop: -50,
  },
  movieInfoWrapper: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  movieTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 30,
    color: THEME.text.primary,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: THEME.text.secondary,
  },
  castSection: {
    marginTop: 20,
  },
  titleSection: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    color: THEME.text.primary,
    marginLeft: 20,
    marginBottom: 15,
  },
  castWrapper: {
    paddingStart: 20,
  },
  similarMoviesSection: {
    marginVertical: 20,
  },
});
