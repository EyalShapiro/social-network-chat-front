import styled from 'styled-components';
import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const LogoutStyled = styled.button`
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

export const LogoutButton: React.FC<Props> = (props) => {
  return <LogoutStyled {...props} />;
};
