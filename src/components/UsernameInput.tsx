import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { updateUserName } from "@/utils/LocalStorageFunction";

const UsernameInput = () => {
	/**
	 * TODO: Add validation for username
	 * TODO: Add error handling
	 * TODO: Add loading if is loading or new user
	 * TODO: add if is new user add to database and enter email or user name and password to login add firebase to connect in google
	 */
	const [name, setName] = useState("");
	const navigate = useNavigate();

	const handleRegister = () => {
		const trimmedName = name.trim();

		if (!trimmedName) {
			// Display an error message or provide visual feedback for empty input
			new Error("Please enter your username.");
			return;
		}

		updateUserName(trimmedName);
		navigate("/chat");
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleRegister();
	};
	const handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleRegister();
		}
	};
	return (
		<FormContainer onSubmit={handleSubmit}>
			<h2>Enter your username to join the chat</h2>
			<div>
				<input
					type="text"
					placeholder="Your username"
					value={name}
					onChange={(e) => setName(e.target.value)}
					onKeyDown={handleKey}
				/>
				<button type="submit" disabled={!name.trim()}>
					Join Chat
				</button>
			</div>
		</FormContainer>
	);
};

export default UsernameInput;

const FormContainer = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	text-align: center;

	& input {
		margin: 10px;
		padding: 10px;
		font-size: 1rem;
		border: 1px solid #ccc;
		border-radius: 5px;
		width: 200px;
	}

	& button {
		padding: 10px 20px;
		font-size: 1rem;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;

		&:hover {
			background-color: #0056b3;
		}

		&:disabled {
			background-color: #ccc;
			cursor: not-allowed;
		}
	}
`;
