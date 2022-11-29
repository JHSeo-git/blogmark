'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Input from '@/components/Input';
import { createItem } from '@/lib/api/items';
import { urlSchema } from '@/lib/schema';

import LoadingIcon from '../__icons/Loading.Icon';
import { clearClipboardForNewForm } from './NewItemForm.helpers';

type FormData = {
  url: string;
  title: string;
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
  url?: string;
  title?: string;
}

function NewItemFormWithInitialValues({ url }: NewItemFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    resetField,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      url: url ?? '',
    },
    mode: 'onChange',
    resolver: yupResolver(newItemScheme),
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);

      await createItem({ title: data.title, url: encodeURIComponent(data.url) });

      reset({ url: '', title: '' });

      clearClipboardForNewForm(data.url);

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
        resetInput={watch('url') ? () => resetField('url', { defaultValue: '' }) : undefined}
        disabled={isLoading}
      />
      <Input
        type="text"
        label="제목"
        className="mt-4 md:mt-6"
        {...register('title')}
        error={errors.title?.message}
        resetInput={watch('title') ? () => resetField('title') : undefined}
        disabled={isLoading}
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

function NewItemForm() {
  const searchParams = useSearchParams();

  const url = searchParams.get('markUrl') ?? undefined;

  if (url && !urlSchema.isValidSync(url)) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold">Not valid url.</h1>
        <p>{url}</p>
      </div>
    );
  }

  return <NewItemFormWithInitialValues url={url} />;
}

export default NewItemForm;
