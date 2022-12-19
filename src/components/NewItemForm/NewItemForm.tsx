'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import Input from '@/components/Input';
import { itemSchema } from '@/lib/validations/item';
import { urlSchema } from '@/lib/validations/url';

import LoadingIcon from '../__icons/Loading.Icon';
import { useCreateItem } from './useCreateItem';

type FormData = {
  url: string;
  title: string;
};

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
    resolver: zodResolver(itemSchema),
  });
  const { mutate, isLoading } = useCreateItem();

  const onSubmit = handleSubmit((data) => {
    mutate({ title: data.title, url: encodeURIComponent(data.url) });

    reset({ url: '', title: '' });
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

  if (url && !urlSchema.parse(url)) {
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
