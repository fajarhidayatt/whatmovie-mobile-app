import axios from 'axios';
import {API_KEY, API_BASE_URL} from '../constants';

const callAPI = async endPoint => {
  try {
    const response = await axios.get(endPoint);
    return response.data;
  } catch (error) {
    return {};
  }
};

export const fetchSearchMovies = query => {
  const endPoint = `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;
  return callAPI(endPoint);
};

export const fetchTrendingMovies = () => {
  const endPoint = `${API_BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
  return callAPI(endPoint);
};

export const fetchUpcomingMovies = () => {
  const endPoint = `${API_BASE_URL}/movie/upcoming?api_key=${API_KEY}`;
  return callAPI(endPoint);
};

export const fetchCategoryMovies = idc => {
  const endPoint = `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${idc}`;
  return callAPI(endPoint);
};

export const fetchSimilarMovies = idm => {
  const endPoint = `${API_BASE_URL}/movie/${idm}/similar?api_key=${API_KEY}`;
  return callAPI(endPoint);
};

export const fetchCategories = () => {
  const endPoint = `${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
  return callAPI(endPoint);
};

export const fetchCreditsMovie = idm => {
  const endPoint = `${API_BASE_URL}/movie/${idm}/credits?api_key=${API_KEY}`;
  return callAPI(endPoint);
};

export const fetchDetailMovie = idm => {
  const endPoint = `${API_BASE_URL}/movie/${idm}?api_key=${API_KEY}`;
  return callAPI(endPoint);
};

export const fetchDetailCast = idc => {
  const endPoint = `${API_BASE_URL}/person/${idc}?api_key=${API_KEY}`;
  return callAPI(endPoint);
};

export const fetchCastMovies = idc => {
  const endPoint = `${API_BASE_URL}/person/${idc}/movie_credits?api_key=${API_KEY}`;
  return callAPI(endPoint);
};
