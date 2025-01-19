import { MessageDataType } from "@/types/MessageDataType";
import { socket } from "../socket";
import { getItemsWithPagination } from "../axiosApi";
import { MESSAGES_PAGINATED_TABLE } from "@/constants/tableName";

export async function sendChatMessage(msg: MessageDataType) {
	if (!socket.connected) {
		throw new Error("Socket not connected");
	}
	socket.emit("chat message", msg);
	return msg;
}
type PaginatedMessagesType = {
	messages: MessageDataType[];
	totalCount: number;
	page: number;
	limit: number;
};
export async function getMessagesByPage(limitGetItems: number, { pageParam = 1 }) {
	const response = await getItemsWithPagination<PaginatedMessagesType>(
		MESSAGES_PAGINATED_TABLE,
		pageParam,
		limitGetItems
	);
	return {
		messages: response.messages,
		nextPage: response.messages.length === limitGetItems ? pageParam + 1 : undefined,
	};
}
