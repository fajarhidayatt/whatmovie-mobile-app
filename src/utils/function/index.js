import {IMG_BASE_URL} from '../../constants';

export const truncateText = (text, length) => {
  return text?.length > length ? text?.slice(0, length) + '...' : text;
};

export const getImage = (width, path) => {
  return path ? `${IMG_BASE_URL}/t/p/w${width}${path}` : null;
};
