'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import useDebounce from '@/hooks/useDebounce';
import useLockedBodyEffect from '@/hooks/useLockedBodyEffect';
import useLockedElementByIdEffect from '@/hooks/useLockedElementByIdEffect';

import ChevronLeftIcon from '../__icons/ChevronLeft.Icon';
import { DRAWER_CONTENT } from '../Drawer';
import Input from '../Input';
import SearchItems from './SearchItems';

function SearchForm() {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState('');

  const debouncedQuery = useDebounce(query, 500);
  useLockedBodyEffect(focused);
  useLockedElementByIdEffect(DRAWER_CONTENT, focused);

  const onBack = () => {
    setFocused(false);
    setQuery('');
  };

  return (
    <div className="flex items-center">
      <AnimatePresence>
        {focused && (
          <motion.div
            // TODO: animation
            key="search-form-frame"
            className="fixed inset-0 bg-base-100 z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="sticky top-0 h-[88px] z-[1] bg-base-100" />
            {debouncedQuery && (
              <article className="max-w-7xl mx-auto">
                <div className="mt w-full">
                  <SearchItems query={debouncedQuery} />
                </div>
              </article>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative z-50 w-full">
        <AnimatePresence>
          {focused && (
            <motion.button
              key="search-form-back"
              type="button"
              className="absolute top-1/2 -left-12 -translate-y-1/2 inline-flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onBack}
            >
              <ChevronLeftIcon />
            </motion.button>
          )}
        </AnimatePresence>
        <Input
          className="w-full"
          type="text"
          boxSize="sm"
          outlined={false}
          placeholder="????????????"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          resetInput={query ? () => setQuery('') : undefined}
        />
      </div>
    </div>
  );
}

export default SearchForm;
