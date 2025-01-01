import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { MessageDataType, SendMsgType } from "../types/MessageDataType";

export const useChatSocket = (serverUrl: string) => {
	const [messages, setMessages] = useState<MessageDataType[]>([]);
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const socketInstance = io(serverUrl);
		setSocket(socketInstance);

		socketInstance.on("chat message", (msg: MessageDataType) => {
			setMessages((prevMessages) => [...prevMessages, msg]);
		});

		return () => {
			socketInstance.off("chat message");
			socketInstance.disconnect();
		};
	}, [serverUrl]);

	const sendMessage = (msg: SendMsgType) => {
		if (socket) {
			socket.emit("chat message", msg);
			return msg;
			// setMessages((prevMessages) => [...prevMessages, msg]);
		}
	};

	return { messages, sendMessage };
};
