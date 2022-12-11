'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { updateUserName } from '@/lib/api/user';
import { userSchema } from '@/lib/validations/user';

import LoadingIcon from '../__icons/Loading.Icon';
import Input from '../Input';

type FormData = {
  userName: string;
  email: string;
};

interface UserFormProps {
  userName?: string;
  email?: string;
}

function UserForm({ userName, email }: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
    resetField,
  } = useForm<FormData>({
    defaultValues: {
      userName: userName ?? '',
      email: email ?? '',
    },
    mode: 'onChange',
    resolver: zodResolver(userSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);

      await updateUserName({ userName: data.userName, email: data.email });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <form className="flex flex-col gap-4 w-full mt-4" onSubmit={onSubmit}>
      <Input
        className="w-full"
        label="이름"
        type="text"
        {...register('userName')}
        error={errors.userName?.message}
        resetInput={watch('userName') ? () => resetField('userName') : undefined}
        disabled={isLoading}
      />
      <Input className="w-full" label="이메일" type="text" readOnly {...register('email')} />
      <div className="mt-16 flex md:justify-end">
        <button
          type="submit"
          disabled={!isDirty || !isValid || isLoading}
          className="btn w-full btn-primary no-animation active:bg-primary text-base md:w-auto"
        >
          {isLoading ? <LoadingIcon /> : 'UPDATE'}
        </button>
      </div>
    </form>
  );
}

export default UserForm;
