import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button, Loading, MovieList} from '../../components';
import {fetchCastMovies, fetchDetailCast} from '../../api';
import {getImage} from '../../utils';
import {COLORS, FALLBACK_PROFIL, THEME} from '../../constants';

const {width, height} = Dimensions.get('window');
const gender = {
  0: 'Not set',
  1: 'Female',
  2: 'Male',
  3: '-',
};

const DetailCast = ({navigation, route}) => {
  const {idc} = route.params;

  const [cast, setCast] = useState({});
  const [castMovies, setCastMovies] = useState({});
  const [loading, setLoading] = useState(true);

  const castPhoto = getImage(342, cast?.profile_path) || FALLBACK_PROFIL;

  useEffect(() => {
    getDetailCast(idc);
    getCastMovies(idc);
  }, []);

  const getDetailCast = async idc => {
    const data = await fetchDetailCast(idc);
    if (data) {
      setCast(data);
      setLoading(false);
    }
  };

  const getCastMovies = async idc => {
    const data = await fetchCastMovies(idc);
    if (data && data?.cast) {
      setCastMovies(data?.cast);
    }
  };

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
      </View>
      {loading ? (
        <View style={{height}}>
          <Loading />
        </View>
      ) : (
        <View>
          <View style={styles.castInfoWrapper}>
            <Image source={{uri: castPhoto}} style={styles.image} />
            <Text style={styles.name}>{cast?.name}</Text>
            <Text style={styles.bornPlace}>{cast?.place_of_birth}</Text>
          </View>
          <View style={styles.castDetailWrapper}>
            <View style={[styles.detailItem, styles.borderRight]}>
              <Text style={styles.titleDetail}>Gender</Text>
              <Text style={styles.desc}>{gender[cast?.gender]}</Text>
            </View>
            <View style={[styles.detailItem, styles.borderRight]}>
              <Text style={styles.titleDetail}>Birthday</Text>
              <Text style={styles.desc}>{cast?.birthday}</Text>
            </View>
            <View style={[styles.detailItem, styles.borderRight]}>
              <Text style={styles.titleDetail}>Know for</Text>
              <Text style={styles.desc}>{cast?.known_for_department}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.titleDetail}>Popularity</Text>
              <Text style={styles.desc}>{cast?.popularity?.toFixed(2)}%</Text>
            </View>
          </View>
          <View style={styles.castBiographyWrapper}>
            <Text style={styles.titleBiography}>Biography</Text>
            <Text style={styles.desc}>{cast?.biography}</Text>
          </View>
          <View style={styles.castMoviesWrapper}>
            <MovieList
              title="Movies"
              navigation={navigation}
              movies={castMovies}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default DetailCast;

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

  castInfoWrapper: {
    alignItems: 'center',
    marginTop: 100,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 300,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 30,
    color: THEME.text.primary,
    marginTop: 20,
  },
  bornPlace: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: THEME.text.secondary,
  },

  castDetailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.dark3,
    margin: 20,
    padding: 15,
    borderRadius: 50,
  },
  detailItem: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: COLORS.white,
  },
  titleDetail: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: THEME.text.primary,
  },
  desc: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: THEME.text.secondary,
  },

  castBiographyWrapper: {
    paddingHorizontal: 20,
  },
  titleBiography: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: THEME.text.primary,
    marginBottom: 5,
  },

  castMoviesWrapper: {
    marginVertical: 10,
  },
});
