import { useEffect } from "react";
import { toast } from "react-toastify";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { MessageDataType } from "../types/MessageDataType";
import { socket } from "../api/socket";
import { getItemsWithPagination } from "../api/axiosApi";
import { MESSAGES_PAGINATED_TABLE } from "../constants/tableName";

type PaginatedMessagesType = {
	messages: MessageDataType[];
	totalCount: number;
	page: number;
	limit: number;
};

type QueryDataType = {
	pages: {
		messages: MessageDataType[];
		nextPage?: number;
	}[];
};

export const useChatSocket = () => {
	const queryClient = useQueryClient();
	const limitGetItems = 100;

	// Setup infinite query for messages
	const { data, fetchNextPage, hasNextPage, isFetching, isLoading, refetch } = useInfiniteQuery({
		queryKey: ["messages"],
		queryFn: async ({ pageParam = 1 }) => {
			const response = await getItemsWithPagination<PaginatedMessagesType>(
				MESSAGES_PAGINATED_TABLE,
				pageParam,
				limitGetItems
			);
			return {
				messages: response.messages,
				nextPage: response.messages.length === limitGetItems ? pageParam + 1 : undefined,
			};
		},
		getNextPageParam: (lastPage) => lastPage.nextPage,
		initialPageParam: 1,
	});

	// Mutation for sending messages
	const { mutate: sendMessage } = useMutation({
		mutationFn: async (msg: MessageDataType) => {
			if (!socket.connected) {
				throw new Error("Socket not connected");
			}
			socket.emit("chat message", msg);
			return msg;
		},
		onError: (err) => {
			console.error("Error sending message:", err);
			toast.error("Error sending message check your internet connection");
		},
	});

	// Socket event listener for new messages
	useEffect(() => {
		const handleMessage = (msg: MessageDataType) => {
			queryClient.setQueryData(["messages"], (oldData: QueryDataType | undefined) => ({
				...oldData,
				pages: oldData?.pages.map((page, idx) =>
					idx === oldData.pages.length - 1 ? { ...page, messages: [...page.messages, msg] } : page
				),
				onError: () => {
					toast.error("Error get message reload the page and check your internet connection");
				},
			}));
		};

		socket.on("chat message", handleMessage);
		return () => {
			socket.off("chat message", handleMessage);
		};
	}, [queryClient]);

	return {
		messages: data?.pages.flatMap((page) => page.messages) || [],
		sendMessage,
		loadMoreMessages: fetchNextPage,
		hasMore: hasNextPage,
		isLoading,
		isFetching,
		refetch,
	};
};
