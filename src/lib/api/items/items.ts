import type { CreateItemParams, CreateItemResponse } from './items.types';

export async function createItem(params: CreateItemParams): Promise<CreateItemResponse> {
  const response = await fetch('/api/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();

  return data;
}
