import { AnimatePresence, motion } from 'framer-motion';

import useClipboardCopy from '@/hooks/useClipboardCopy';

import CloseIcon from '../__icons/Close.Icon';
import MoreVerticalIcon from '../__icons/MoreVertical.Icon';
import * as Popover from '../Popover';
import ProtectedButton from '../ProtectedButton';
import { useToast } from '../Toast';
import useDeleteItem from './useDeleteItem';

interface CardMoreProps {
  itemId: number;
  url?: string | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

function CardMore({ itemId, url, isOpen, setIsOpen }: CardMoreProps) {
  const { copied, copy } = useClipboardCopy();
  const { mutate, isLoading } = useDeleteItem(itemId);
  const toast = useToast();

  const onClipboardCopyClick = () => {
    if (!url) {
      return;
    }
    copy(url);
    setIsOpen(false);
    toast.add({
      title: '복사 완료 ✅',
      description: '링크가 복사되었습니다.',
    });
  };

  const onDeleteClick = () => {
    setIsOpen(false);
    mutate(itemId);
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <ProtectedButton type="button" className="flex justify-center items-center">
          <AnimatePresence>
            <>
              {isOpen ? (
                <motion.span
                  key="card-more-close"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.7 }}
                >
                  <CloseIcon
                    className="transition-all hover:text-gray-500 text-gray-400"
                    width={20}
                    height={20}
                  />
                </motion.span>
              ) : (
                <motion.span
                  key="card-more-open"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.7 }}
                >
                  <MoreVerticalIcon
                    className="transition-all hover:text-gray-400 text-gray-300"
                    width={20}
                    height={20}
                  />
                </motion.span>
              )}
            </>
          </AnimatePresence>
        </ProtectedButton>
      </Popover.Trigger>
      <Popover.Content className="border p-1" hasCloseButton={false}>
        <ul>
          <li className="border-b py-1">
            <button
              type="button"
              disabled={copied}
              onClick={onClipboardCopyClick}
              className="btn btn-sm btn-block btn-ghost no-animation"
            >
              {copied ? '복사 완료 ✅' : '링크 복사 🔗'}
            </button>
          </li>
          <li className="py-1">
            <button
              type="button"
              onClick={onDeleteClick}
              disabled={isLoading}
              className="btn btn-sm btn-block btn-ghost no-animation"
            >
              삭제
            </button>
          </li>
          <li />
        </ul>
      </Popover.Content>
    </Popover.Root>
  );
}

export default CardMore;
