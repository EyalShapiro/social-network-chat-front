import { BaseButton } from '@/components/buttons';
import { BaseInput } from '@/components/inputs';
import { updateUserName } from '@/utils/localStorageData/userName';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

export default function LoginPage() {
  /**
   * TODO: Add validation for username
   * TODO: Add error handling
   * TODO: Add loading if is loading or new user
   * TODO: add if is new user add to database and enter email or user name and password to login add firebase to connect in google
   */
  const [inpName, setInpName] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    const newName = inpName.trim();
    if (!newName) {
      // Display an error message or provide visual feedback for empty input
      new Error('Please enter your username.');
      return null;
    }

    updateUserName(newName);
    navigate('/chat');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleRegister();
  };
  const handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleRegister();
    }
  };
  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Enter your username to join the chat</h2>
      <div>
        <BaseInput
          type="text"
          placeholder="Your username"
          value={inpName}
          onChange={(e) => setInpName(e.target.value)}
          onKeyDown={handleKey}
        />
        <BaseButton type="submit" disabled={!inpName.trim()}>
          Join Chat
        </BaseButton>
      </div>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 10px outset;
  justify-content: center;
  text-align: center;
`;
