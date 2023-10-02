import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  CategorySection,
  Gap,
  Header,
  Loading,
  TrendingSection,
  UpcomingSections,
} from '../../components';
import {fetchTrendingMovies, fetchUpcomingMovies} from '../../api';
import {StatusBar} from 'expo-status-bar';
import {useFonts} from 'expo-font';
import {THEME} from '../../constants';
import FONTS from '../../assets/fonts';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Home = ({navigation}) => {
  const [fontsLoaded] = useFonts(FONTS);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data?.results) {
      setTrendingMovies(data?.results);
    }
  };

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data && data?.results) {
      setUpcomingMovies(data?.results);
    }
  };

  /*
    ================================================
    FONT LOADED
    ================================================
   */

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  /* ================================================ */

  return (
    <View style={styles.screen} onLayout={onLayoutRootView}>
      <StatusBar translucent={false} style="light" />
      <Header
        handleSearch={() => navigation.navigate('SearchMovie')}
        handleMenu={() => navigation.openDrawer('Root')}
      />
      {!trendingMovies.length && !upcomingMovies.length ? (
        <Loading />
      ) : (
        <ScrollView style={styles.content}>
          <TrendingSection navigation={navigation} movies={trendingMovies} />
          <Gap height={30} />
          <UpcomingSections navigation={navigation} movies={upcomingMovies} />
          <Gap height={30} />
          <CategorySection navigation={navigation} />
          <Gap height={50} />
        </ScrollView>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: THEME.background.primary,
  },
  content: {
    paddingTop: 20,
  },

  inputContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.5)',
    width: '100%',
    height: '100%',
    zIndex: 90,
  },
});
