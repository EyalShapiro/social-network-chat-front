import { useNavigate } from 'react-router';
import { USER_NAME_KEY } from '../constants/localStorageKey';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const userName = localStorage.getItem(USER_NAME_KEY) || null;
  const isBackToChat = typeof userName === 'string';
  const handleButtonClick = () => {
    const navePath = isBackToChat ? 'chat' : '';
    navigate(`/${navePath}`);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={handleButtonClick} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Back to {isBackToChat ? 'Chat' : 'Home'}
      </button>
    </div>
  );
};

export default NotFoundPage;
