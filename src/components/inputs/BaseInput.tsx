import styled from 'styled-components';
import React from 'react';

const InputStyled = styled.input`
  margin: 10px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const BaseInput: React.FC<Props> = (props) => {
  return <InputStyled {...props} />;
};
