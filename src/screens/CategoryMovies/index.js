import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, CategoryItem, Gap, Loading, MovieItem} from '../../components';
import {fetchCategories, fetchCategoryMovies} from '../../api';
import {COLORS, THEME} from '../../constants';

const {width} = Dimensions.get('window');

const CategoryMovies = ({navigation, route}) => {
  const {cat} = route.params;
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [catActive, setCatActive] = useState(cat);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories();
    getCategoryMovies(catActive);
  }, []);

  const getCategories = async () => {
    const data = await fetchCategories();
    if (data && data?.genres) {
      setCategories(data?.genres);
      setLoading(false);
    }
  };

  const getCategoryMovies = async idc => {
    const data = await fetchCategoryMovies(idc);
    if (data && data?.results) {
      setMovies(data?.results);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.navigation}>
          <Button
            iconName="chevron-left"
            iconSize={28}
            iconColor={COLORS.white}
            bgColor="transparent"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.title}>Movies by Category</Text>
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={styles.categoriesWrapper}
          showsHorizontalScrollIndicator={false}>
          {categories?.map(cat => {
            return (
              <CategoryItem
                key={cat.id}
                name={cat.name}
                isActive={cat.id === catActive}
                onPress={() => {
                  setCatActive(cat.id);
                  getCategoryMovies(cat.id);
                }}
              />
            );
          })}
        </ScrollView>
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

export default CategoryMovies;

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
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  categoriesWrapper: {
    paddingTop: 10,
    paddingStart: 20,
    paddingEnd: 10,
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
    paddingTop: 100,
    paddingBottom: 0,
  },
});
