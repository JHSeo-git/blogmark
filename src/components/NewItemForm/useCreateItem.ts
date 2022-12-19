import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { createItem } from '@/lib/api/items';

import { useToast } from '../Toast';

export function useCreateItem() {
  const toast = useToast();
  const router = useRouter();
  const { mutate, isLoading } = useMutation({
    mutationKey: ['createItem'],
    mutationFn: createItem,
    onSuccess: () => {
      toast.add({
        title: '등록 ✅',
        description: 'Mark를 등록했습니다.',
      });

      router.push('/');
    },
    onError: () => {
      toast.add({
        title: '실패 ❌',
        description: 'Mark에 실패했습니다.',
      });
    },
  });

  return {
    mutate,
    isLoading,
  };
}
