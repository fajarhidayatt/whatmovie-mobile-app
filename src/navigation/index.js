import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Home,
  DetailMovie,
  DetailCast,
  SearchMovie,
  UpcomingMovies,
  CategoryMovies,
  Favorite,
} from '../screens';
import {CustomDrawer} from '../components';
import {COLORS} from '../constants';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Root = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: COLORS.white,
        drawerInactiveTintColor: COLORS.light1,
        // drawerLabelStyle: {fontFamily: 'Inter-Regular'},
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Favorite" component={Favorite} />
    </Drawer.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        <Stack.Screen name="Root" component={Root} />
        <Stack.Screen name="DetailMovie" component={DetailMovie} />
        <Stack.Screen name="DetailCast" component={DetailCast} />
        <Stack.Screen name="SearchMovie" component={SearchMovie} />
        <Stack.Screen name="UpcomingMovies" component={UpcomingMovies} />
        <Stack.Screen name="CategoryMovies" component={CategoryMovies} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
