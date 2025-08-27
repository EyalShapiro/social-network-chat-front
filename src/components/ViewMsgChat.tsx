import { useRef, useEffect } from "react";
import styled from "styled-components";
import { useChatSocket } from "../hook/useChatSocket";
import { Loading } from "./Loading/Loading";
import { formattersOptions, FormatOptionType } from "./formatText/formattersOptions";
import { formatDate } from "@/utils/dateFormat";

// change to https://mantine.dev/hooks/use-intersection/
// use Infinity scroll and add itm to the top of the list
interface ChatProps {
	username: string;
}

export default function ViewMsgChat({ username }: ChatProps) {
	const { messages, sendMessage, loadMoreMessages, hasMore, isLoading } = useChatSocket();
	const messagesContainerRef = useRef<HTMLDivElement>(null);
	const scrollPositionRef = useRef(0);
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollIntoView({ behavior: "smooth" });
			messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
		}
	}, [messages]);

	const getSelectedText = () => {
		const textareaElemnt = textareaRef.current;
		const selectionStartIndex = textareaElemnt?.selectionStart ?? 0;
		const selectionEndIndex = textareaElemnt?.selectionEnd ?? 0;
		const selectedText = textareaElemnt?.value?.substring(selectionStartIndex, selectionEndIndex) || undefined;
		return { selectionStartIndex, selectionEndIndex, selectedText };
	};

	function handleFormat(char: string) {
		if (!textareaRef.current) return;
		const { selectionStartIndex, selectionEndIndex, selectedText } = getSelectedText();
		if (selectedText) {
			const formattedText = `${char}${selectedText}${char}`;
			const updatedText =
				textareaRef.current.value.substring(0, selectionStartIndex) +
				formattedText +
				textareaRef.current.value.substring(selectionEndIndex);
			textareaRef.current.value = updatedText; // Update the textarea value directly
			const cursorPosition = selectionStartIndex + formattedText.length;
			setTimeout(() => {
				textareaRef.current?.setSelectionRange(cursorPosition, cursorPosition);
			}, 0);
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		} else if (textareaRef.current && getSelectedText().selectedText) {
			const findKeyFormat = formattersOptions.find((option: FormatOptionType) => option.keyboardCharEvent === e.key);
			if (findKeyFormat) {
				e.preventDefault();
				handleFormat(findKeyFormat.charFormt);
			}
			const pressedKey = e.code.toLowerCase().replace(/^key/, "");
			if (!pressedKey) return;
			const findCtrlKeyFormat = formattersOptions.find(
				(option: FormatOptionType) => option.ctrlKeyEvent === pressedKey
			);
			if (e.ctrlKey && findCtrlKeyFormat) {
				e.preventDefault();
				handleFormat(findCtrlKeyFormat.charFormt);
			}
		}
	};

	const handleSendMessage = () => {
		const message = textareaRef.current?.value?.trim() || "";
		if (textareaRef?.current?.value && message) {
			sendMessage({ sender: username, message });
			textareaRef.current.value = "";
		}
	};

	const handleScroll = () => {
		const container = messagesContainerRef.current;
		if (container && container.scrollTop <= 50 && hasMore) {
			const previousScrollHeight = container.scrollHeight;
			loadMoreMessages();
			const newScrollHeight = container.scrollHeight;
			container.scrollTop = newScrollHeight - previousScrollHeight;
		}
	};

	useEffect(() => {
		const container = messagesContainerRef?.current;
		if (container) container.scrollTop = container.scrollHeight - scrollPositionRef.current;
	}, [messages]);
	return (
		<ChatContainer>
			{isLoading ? (
				<Loading />
			) : (
				<MessagesContainer aria-live="polite" ref={messagesContainerRef} onScroll={handleScroll}>
					{messages?.length > 0 &&
						messages.map((msg, index) => (
							<Message key={index} $isUserMessage={msg.sender === username}>
								<div className="msgHeader" dir="rtl">
									<span className="sender">{msg.sender}</span>
								</div>
								<p dir="auto" className="message">
									{msg.message}
								</p>
								<div className="msgFooter">
									<div style={{ flexGrow: 1 }} />
									<span className="created"> {formatDate(msg?.created_at, "MM/DD/YYYY, HH:mm:ss")}</span>
								</div>
							</Message>
						))}
				</MessagesContainer>
			)}

			<InputContainer>
				<textarea
					className="inputMsg"
					ref={textareaRef}
					onKeyDown={handleKeyDown}
					placeholder="Type a message"
					aria-label="Type your message"
				/>
				<button className="SendButton" onClick={handleSendMessage}>
					Send
				</button>
			</InputContainer>
			<div style={{ display: "flex", gap: "4px", margin: "4px 0" }}>
				<button className="btn" onClick={() => handleFormat("**")}>
					Bold
				</button>
				<button className="btn" onClick={() => handleFormat("_")}>
					Italic
				</button>
				<button className="btn" onClick={() => handleFormat("~")}>
					Strike
				</button>
				<button className="btn" onClick={() => handleFormat("==")}>
					Mark
				</button>
				<button className="btn" onClick={() => handleFormat("__")}>
					Underline
				</button>
			</div>
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
	gap: 0.5rem;
	margin: 0.5rem 0.75rem;
	padding: 0.125rem;
	flex-direction: column;
	overflow-y: auto;
	flex-grow: 1;
	overflow-x: hidden;

	@media (max-width: 768px) {
		overflow-x: auto;
	}
`;

const Message = styled.div<{ $isUserMessage: boolean }>`
	direction: ${({ $isUserMessage }) => ($isUserMessage ? "rtl" : "ltr")};
	width: fit-content;
	min-width: 70%;
	max-width: 95%;
	align-self: ${({ $isUserMessage }) => ($isUserMessage ? "flex-end" : "flex-start")};
	padding: 0.5rem;
	background-color: ${({ $isUserMessage }) => ($isUserMessage ? "#d4f8d4" : "#e3f2fd")};
	color: ${({ $isUserMessage }) => ($isUserMessage ? "green" : "blue")};
	border-radius: 5px;
	max-width: 70%;
	& .msgHeader {
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
	width: 100%;
	padding: 4px 0.25rem;
	justify-content: space-around;
	align-items: center;
	border-top: 1px solid #ccc;
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
	.SendButton {
		padding: 10px 20px;
		margin: 1px;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;

		&:hover {
			background-color: #0056b3;
		}
	}
`;
