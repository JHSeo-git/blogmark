'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Input from '@/components/Input';
import { createItem } from '@/lib/api/items';

import LoadingIcon from '../__icons/Loading.Icon';

type FormData = {
  url: string;
  title: string;
  description: string;
};

export const newItemScheme = yup.object().shape({
  url: yup.string().url('URL 형식에 맞게 작성해주세요.').required('URL을 입력해주세요.'),
  title: yup
    .string()
    .min(2, '2~40글자를 입력해주세요.')
    .max(40, '2~40글자를 입력해주세요.')
    .required('제목을 입력해주세요.'),
});

interface NewItemFormProps {
  initialUrl?: string;
}

function NewItemForm({ initialUrl }: NewItemFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    resetField,
  } = useForm<FormData>({
    defaultValues: {
      url: initialUrl ?? '',
    },
    mode: 'onChange',
    resolver: yupResolver(newItemScheme),
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);

      await createItem({
        title: data.title,
        url: encodeURIComponent(data.url),
      });

      /**
       * @see https://beta.nextjs.org/docs/data-fetching/mutating
       */
      router.refresh();
      router.push('/');
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Input
        type="text"
        label="URL"
        {...register('url')}
        error={errors.url?.message}
        resetInput={watch('url') ? () => resetField('url') : undefined}
      />
      <Input
        type="text"
        label="제목"
        className="mt-4 md:mt-6"
        {...register('title')}
        error={errors.title?.message}
        resetInput={watch('title') ? () => resetField('title') : undefined}
      />
      <div className="mt-16 flex md:justify-end">
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="btn w-full btn-primary no-animation active:bg-primary text-base md:w-auto"
        >
          {isLoading ? <LoadingIcon /> : 'MARK'}
        </button>
      </div>
    </form>
  );
}

export default NewItemForm;
