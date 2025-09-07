import { LogoutButton } from '@/components/buttons';
import { useCopyToClipboard } from '@/hook/useCopyToClipboard';
import { useHandleLogout } from '@/hook/useHandleLogout';
import { getUserName } from '@/utils/localStorageData/userName';
import styled from 'styled-components';

export function UsernameDisplay() {
  const userName = getUserName();
  const handleLogout = useHandleLogout();
  const { copy } = useCopyToClipboard();
  if (!userName) {
    handleLogout();
    return null;
  }
  return (
    <UsernameDisplayContainer>
      <span onClick={() => copy(userName)}>{userName}</span>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </UsernameDisplayContainer>
  );
}
const UsernameDisplayContainer = styled.div`
  position: absolute;
  flex: 1;
  right: 40px;
  top: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px 20px;
  & span {
    color: white;
    &:hover {
      color: lightcyan;
    }
  }
`;
