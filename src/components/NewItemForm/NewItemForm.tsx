'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Input from '@/components/Input';
import { createItem } from '@/lib/api/items';

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
  description: yup.string(),
});

function NewItemForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    resetField,
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(newItemScheme),
  });

  const onSubmit = handleSubmit((data) => {
    createItem({
      title: data.title,
      url: data.url,
      description: data.description,
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Input
        type="text"
        label="URL"
        className="mb-8"
        {...register('url')}
        error={errors.url?.message}
        resetInput={watch('url') ? () => resetField('url') : undefined}
      />
      <Input
        type="text"
        label="제목"
        className="mb-8"
        {...register('title')}
        error={errors.title?.message}
        resetInput={watch('title') ? () => resetField('title') : undefined}
      />
      <Input
        type="text"
        label="소개글"
        {...register('description')}
        error={errors.description?.message}
        resetInput={watch('description') ? () => resetField('description') : undefined}
      />
      <button
        type="submit"
        disabled={!isValid}
        className="mt-16 btn btn-block btn-primary no-animation active:bg-primary text-base"
      >
        블로그마크{isValid ? ' 🎉' : ''}
      </button>
    </form>
  );
}

export default NewItemForm;
