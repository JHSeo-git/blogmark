import { clearClipboard, hasClipboard, isMatchClipboardText } from '@/lib/clipboard';

export async function clearClipboardForNewForm(text: string) {
  const has = await hasClipboard();

  if (!has) {
    return;
  }

  const isMatch = await isMatchClipboardText(text);

  if (isMatch) {
    await clearClipboard();
  }
}
