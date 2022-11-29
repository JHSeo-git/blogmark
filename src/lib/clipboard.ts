export async function hasClipboard() {
  if (!navigator.clipboard) {
    return false;
  }

  const clipboardText = await navigator.clipboard.readText();

  return Boolean(clipboardText);
}

export async function isMatchClipboardText(text: string, isDeep = false) {
  if (!navigator?.clipboard) {
    return false;
  }

  const clipboardText = await navigator.clipboard.readText();

  if (isDeep) {
    return clipboardText === text;
  }

  console.log('clipboardText', clipboardText);
  console.log('input text', text);

  return (
    clipboardText.toLowerCase().includes(text.toLowerCase()) ||
    text.toLowerCase().includes(clipboardText.toLowerCase())
  );
}

export async function clearClipboard() {
  if (!navigator?.clipboard) {
    return false;
  }

  await navigator.clipboard.writeText('');

  return true;
}
