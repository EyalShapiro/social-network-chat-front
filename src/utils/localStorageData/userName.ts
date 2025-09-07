import { USER_NAME_KEY } from '@/constants/localStorageKey';
import { fetchItemStorage, removeItemStorage, setItemStorage } from '../localStorageFunc';

export const getUserName = () => {
  const userName = fetchItemStorage(USER_NAME_KEY);
  return userName;
};
export const updateUserName = (name: string) => {
  setItemStorage(USER_NAME_KEY, name);
};
export const removeUserName = () => {
  removeItemStorage(USER_NAME_KEY);
};
