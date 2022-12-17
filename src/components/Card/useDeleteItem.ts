import type { InfiniteData } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteItem } from '@/lib/api/items';
import type { GetItems } from '@/services/item.service/item.service';

import { useToast } from '../Toast';

export default function useDeleteItem(itemId: number) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteItem,
    onMutate: async () => {
      await queryClient.cancelQueries(['infinite-items']);
      const previousItems = queryClient.getQueryData<InfiniteData<GetItems>>(['infinite-items']);
      const newPageArray =
        previousItems?.pages.map((page) => {
          return {
            ...page,
            items: page.items.filter((item) => item.id !== itemId),
          };
        }) ?? [];

      queryClient.setQueryData<InfiniteData<GetItems>>(['infinite-items'], (data) => {
        return {
          pages: newPageArray,
          pageParams: data?.pageParams ?? [],
        };
      });

      return { previousItems };
    },
    onSuccess: () => {
      toast.add({
        title: '삭제 성공 ✅',
        description: '삭제되었습니다.',
      });
    },
    onError: () => {
      toast.add({
        title: '에러',
        description: '삭제에 실패했습니다.',
      });
    },
    onSettled: () => {
      // queryClient.invalidateQueries(['infinite-items']);
    },
  });

  return {
    mutate,
    isLoading,
  };
}
