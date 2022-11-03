'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef, useId, useState } from 'react';

import XCircleIcon from '../__icons/XCircle.Icon';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  resetInput?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, leftIcon, resetInput, ...rest }, forwardedRef) => {
    const [isFocus, setIsFocus] = useState(false);
    const isError = Boolean(error);
    const id = useId();

    return (
      <div className={`relative ${className ?? ''}`}>
        {label && (
          <label htmlFor={id} className="label">
            <span
              className={`label-text transition-colors${
                !isError && isFocus ? ' text-primary' : ''
              }${isError ? ' text-error' : ''}`}
            >
              {label}
            </span>
          </label>
        )}
        <div
          className={`overflow-hidden flex items-center border rounded-md group-focus:border-primary transition-all${
            !isError && isFocus ? ' border-primary' : ''
          }${isError ? ' border-error' : ''}`}
        >
          {leftIcon && <div className="flex pl-3">{leftIcon}</div>}
          <input
            autoComplete="off"
            autoCorrect="off"
            {...rest}
            ref={forwardedRef}
            id={id}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            className="border-none outline-none bg-inherit flex-1 py-2 px-3"
          />
          <AnimatePresence>
            {resetInput && isFocus && (
              <motion.button
                tabIndex={-1}
                type="button"
                className="flex pr-3 text-gray-400"
                onClick={resetInput}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <XCircleIcon width={20} height={20} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        {error && (
          <div className="absolute">
            <label className="label">
              <span className="label-text-alt text-error">{error}</span>
            </label>
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
