import { useState, useEffect } from "react";
import { MessageDataType } from "../types/MessageDataType";
import { socket } from "../api/socket";
import { getAllItems } from "../api/axiosApi";
import { MESSAGES_TABLE } from "../constants/tableName";

export const useChatSocket = () => {
	const [messages, setMessages] = useState<MessageDataType[]>([]);

	useEffect(() => {
		// Fetch previous messages
		const fetchMessages = async () => {
			try {
				const response = await getAllItems<MessageDataType[]>(MESSAGES_TABLE);
				setMessages(response);
			} catch (error) {
				console.error("Error fetching messages:", error);
			}
		};

		fetchMessages();

		// Listen for incoming chat messages from the socket
		const handleMessage = (msg: MessageDataType) => {
			setMessages((prevMessages) => {
				const newMessages = [...prevMessages, msg];
				if (newMessages.length > 50) newMessages.shift(); // Keep max 50 messages
				return newMessages;
			});
		};

		socket.on("chat message", handleMessage);

		// Cleanup: remove listeners on unmount
		return () => {
			socket.off("chat message", handleMessage);
		};
	}, []);

	// Function to send a message
	const sendMessage = async (msg: MessageDataType) => {
		if (!socket.connected) {
			console.error("Socket not connected. Message could not be sent.");
			return null;
		}

		try {
			// Emit the message via socket
			socket.emit("chat message", msg);
			console.log("Message sent:", msg);
			return msg;
		} catch (error) {
			console.error("Error sending message:", error);
			return null;
		}
	};

	return { messages, sendMessage };
};
