import { MessageDataType } from "@/types/MessageDataType";
import { socket } from "../socket";
import axiosInstance from "../axiosInstance";

export async function sendChatMessage(msg: MessageDataType) {
	if (!socket.connected) {
		throw new Error("Socket not connected");
	}
	socket.emit("message", msg);
	return msg;
}
type PaginatedMessagesType = {
	messages: MessageDataType[];
	totalCount: number;
	page: number;
	limit: number;
};
export async function getMessagesByPage(limitGetItems: number, { pageParam = 1 }) {
	const configApi = {
		params: { page: pageParam, limit: limitGetItems },
	};
	const response = await axiosInstance.get<PaginatedMessagesType>(`messages/paginated`, configApi);
	const { messages } = response.data;
	return {
		messages: messages,
		nextPage: messages.length === limitGetItems ? pageParam + 1 : undefined,
	};
}
