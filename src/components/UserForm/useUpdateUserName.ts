import { useMutation } from '@tanstack/react-query';

import { updateUserName } from '@/lib/api/user';

import { useToast } from '../Toast';

export function useUpdateUserName() {
  const toast = useToast();
  const { mutate, isLoading } = useMutation({
    mutationKey: ['updateUserName'],
    mutationFn: updateUserName,
    onSuccess: () => {
      toast.add({
        title: '변경 ✅',
        description: '이름이 변경되었습니다.',
      });
    },
    onError: () => {
      toast.add({
        title: '실패 ❌',
        description: '이름 변경에 실패했습니다.',
      });
    },
  });

  return {
    mutate,
    isLoading,
  };
}
