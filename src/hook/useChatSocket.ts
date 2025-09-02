import { toast } from 'react-toastify';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MessageDataType } from '../types/MessageDataType';
import { getMessagesByPage, sendChatMessage } from '@/api/ChatMessage/function';
import { useEffect } from 'react';
import { socket } from '@/api/socket';

type QueryDataType = {
  pages: {
    messages: MessageDataType[];
    nextPage?: number;
  }[];
};

export const useChatSocket = (roomName: string) => {
  console.log(roomName);

  const queryClient = useQueryClient();
  const limitGetItems = 100;

  // Setup infinite query for messages
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, refetch } = useInfiniteQuery({
    queryKey: ['messages'],
    queryFn: () => getMessagesByPage(limitGetItems, { pageParam: 1 }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  // Mutation for sending messages
  const { mutate: sendMessage } = useMutation({
    mutationFn: (msg: MessageDataType) => {
      queryClient.invalidateQueries({ queryKey: ['messages'] }); //todo:customize
      return sendChatMessage(msg);
    },
    onError: (err) => {
      console.error('Error sending message:', err);
      toast.error('Error sending message check your internet connection');
    },
  });

  // // Socket event listener for new messages
  useEffect(() => {
    const handleMessage = (msg: MessageDataType) => {
      queryClient.setQueryData(['messages'], (oldData: QueryDataType | undefined) => {
        if (!oldData) return { pages: [{ messages: [msg], nextPage: undefined }] };
        return {
          ...oldData,
          pages: oldData.pages.map((page, idx) => (idx === 0 ? { ...page, messages: [msg, ...page.messages] } : page)),
        };
      });
    };

    socket.on('send-message', (msg: MessageDataType) => {
      console.log('New message received:', msg);

      handleMessage(msg);
    });
    return () => {
      socket.off('send-message', handleMessage);
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
