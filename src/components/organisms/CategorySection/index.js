import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {MovieItem} from '../../molecules';
import {CategoryItem, Link} from '../../atoms';
import {fetchCategories, fetchCategoryMovies} from '../../../api';
import {COLORS} from '../../../constants';

const CategorySection = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [catActive, setCatActive] = useState(28);

  useEffect(() => {
    getCategories();
    getCategoryMovies(catActive);
  }, []);

  const getCategories = async () => {
    const data = await fetchCategories();
    if (data && data?.genres) {
      setCategories(data?.genres);
    }
  };

  const getCategoryMovies = async idc => {
    const data = await fetchCategoryMovies(idc);
    if (data && data?.results) {
      setMovies(data?.results);
    }
  };

  const renderCategory = ({item}) => {
    return (
      <CategoryItem
        name={item.name}
        isActive={item.id === catActive}
        onPress={() => {
          setCatActive(item.id);
          getCategoryMovies(item.id);
        }}
      />
    );
  };

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
        <Text style={styles.title}>Category</Text>
        <Link
          text="View All"
          onPress={() =>
            navigation.navigate('CategoryMovies', {cat: catActive})
          }
        />
      </View>
      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        renderItem={renderCategory}
        horizontal
        contentContainerStyle={styles.categoriesContainer}
        showsHorizontalScrollIndicator={false}
      />
      <FlatList
        data={movies}
        keyExtractor={item => item.id}
        renderItem={renderMovies}
        horizontal
        contentContainerStyle={styles.moviesContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CategorySection;

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  title: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    color: COLORS.white,
  },
  categoriesContainer: {
    paddingStart: 20,
    paddingEnd: 10,
    marginBottom: 10,
  },
  moviesContainer: {
    paddingStart: 20,
  },
  movieItemWrapper: {
    marginRight: 15,
  },
});
