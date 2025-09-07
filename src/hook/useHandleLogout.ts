import { removeUserName } from '@/utils/localStorageData/userName';
import { useNavigate } from 'react-router';

export function useHandleLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeUserName();
    navigate('/login');
  };
  return handleLogout;
}
