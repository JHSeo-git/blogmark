'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { searchFormSchema } from '@/lib/validations/search';

import Input from '../Input';

interface FormData {
  search: string;
}

function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
    resetField,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      search: '',
    },
    mode: 'onChange',
    resolver: zodResolver(searchFormSchema),
  });
  const [focused, setFocused] = useState(false);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="flex items-center">
      <AnimatePresence>
        {focused && (
          <motion.div
            // TODO: animation
            key="search-form-frame"
            className="fixed inset-0 bg-base-100 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      <form className="relative z-50 w-full" onSubmit={onSubmit}>
        <Input
          className="w-full"
          type="text"
          boxSize="sm"
          outlined={false}
          placeholder="검색하기"
          {...register('search')}
          resetInput={watch('search') ? () => resetField('search') : undefined}
          // onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          // disabled={isLoading}
        />
      </form>
    </div>
  );
}

export default SearchForm;
