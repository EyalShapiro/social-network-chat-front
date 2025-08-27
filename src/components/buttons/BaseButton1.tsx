import styled from "styled-components";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonStyled = styled.button`
	padding: 10px 20px;
	font-size: 1rem;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;

	&:hover:not(:disabled) {
		background-color: #0056b3;
	}

	&:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
`;

export const BaseButton: React.FC<Props> = (props) => {
	return <ButtonStyled {...props} />;
};
