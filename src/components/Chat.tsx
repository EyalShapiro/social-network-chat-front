import { useState } from "react";
import moment from "moment";
import styled from "styled-components";

import { useChatSocket } from "../hook/useChatSocket";

interface ChatProps {
	username: string;
	serverUrl: string;
}

export default function Chat({ username, serverUrl }: ChatProps) {
	const [input, setInput] = useState("");
	const { messages, sendMessage } = useChatSocket(serverUrl);

	const handleSendMessage = () => {
		if (input.trim()) {
			sendMessage({ sender: username, message: input });
			setInput("");
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<ChatContainer>
			<MessagesContainer aria-live="polite">
				{messages.map((msg, index) => (
					<Message key={index} $isUserMessage={msg.sender === username}>
						<div className="msgHeader">
							<span className="sender">{msg.sender}</span>
						</div>
						<p dir="auto" className="message">
							{msg.message}
						</p>
						<div className="msgFooter">
							<div style={{ flexGrow: 1 }} />
							<span className="created"> {moment(msg.created_at).format("MM/DD/YYYY, HH:mm:ss")}</span>
						</div>
					</Message>
				))}
			</MessagesContainer>
			<InputContainer>
				<textarea
					className="inputMsg"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Type a message"
					aria-label="Type your message"
				/>
				<SendButton onClick={handleSendMessage}>Send</SendButton>
			</InputContainer>
		</ChatContainer>
	);
}

const ChatContainer = styled.div`
	min-width: 600px;
	margin: 0 auto;
	padding: 5px;
	border-radius: 10px;
	box-shadow: 0 5px 10px rgba(0, 0, 10, 0.1);
	position: relative;
	display: flex;
	flex-direction: column;
	overflow: hidden;

	background-color: darkslategray;
	width: 60vw;
	height: 80vh;
`;

const MessagesContainer = styled.div`
	display: flex;
	gap: 1px;
	flex-direction: column;
	overflow-y: auto;
	flex-grow: 1;
	margin-bottom: 20px;
	padding-bottom: 60px; /* Ensure space for the input field */
`;

const Message = styled.div<{ $isUserMessage: boolean }>`
	direction: ${({ $isUserMessage }) => ($isUserMessage ? "rtl" : "ltr")};
	width: fit-content;
	min-width: 70%;
	align-self: ${({ $isUserMessage }) => ($isUserMessage ? "flex-end" : "flex-start")};
	padding: 10px;
	margin: 5px;
	background-color: ${({ $isUserMessage }) => ($isUserMessage ? "#d4f8d4" : "#e3f2fd")};
	color: ${({ $isUserMessage }) => ($isUserMessage ? "green" : "blue")};
	border-radius: 5px;
	max-width: 70%;
	& .msgHeader {
		direction: rtl;
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: space-between;
		& .sender {
			display: block;
			padding: 5px 0;
			font-weight: bold;
			color: ${({ $isUserMessage }) => ($isUserMessage ? "green" : "blue")};
			margin-bottom: 5px;
		}
		& .created {
			display: flex;
		}
	}
	& .msgFooter {
		display: flex;
	}
	& .message {
		font-size: 1rem;
		margin: 0;
		word-wrap: break-word;
	}
`;

const InputContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	border-top: 1px solid #ccc;
	width: 100%;
	& .inputMsg {
		width: 80%;
		padding: 10px;
		font-size: 1rem;
		border: 1px solid #ccc;
		border-radius: 5px;
		margin-right: 10px;
		color: black;
		background: white;
		resize: none;
		min-height: 40px;
	}
`;

const SendButton = styled.button`
	padding: 10px 20px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;

	&:hover {
		background-color: #0056b3;
	}
`;
