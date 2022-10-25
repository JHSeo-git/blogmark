import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Input from '@/components/Input';
import Layout from '@/components/Layout';

import type { ProtectedNextPage } from '../_app';

type FormData = {
  url: string;
  title: string;
  description: string;
};

const schema = yup.object().shape({
  url: yup.string().url('URL 형식에 맞게 작성해주세요.').required('URL을 입력해주세요.'),
  title: yup.string().min(2, '2글자 이상 입력해주세요').required('제목을 입력해주세요.'),
  description: yup.string(),
});

const ItemsNew: ProtectedNextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    resetField,
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Layout naked>
      <section className="p-6">
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            label="URL"
            className="mb-4"
            {...register('url')}
            error={errors.url?.message}
            resetInput={watch('url') ? () => resetField('url') : undefined}
          />
          <Input
            type="text"
            label="제목"
            className="mb-4"
            {...register('title')}
            error={errors.title?.message}
            resetInput={watch('title') ? () => resetField('title') : undefined}
          />
          <Input
            type="text"
            label="설명"
            {...register('description')}
            error={errors.description?.message}
            resetInput={watch('description') ? () => resetField('description') : undefined}
          />
          <button
            type="submit"
            className="mt-16 w-full bg-primary text-base-100 rounded-md p-3 transition-all hover:bg-primary-focus active:bg-primary disabled:bg-base-300"
          >
            등록
          </button>
        </form>
      </section>
    </Layout>
  );
};

ItemsNew.protected = true;

export default ItemsNew;
