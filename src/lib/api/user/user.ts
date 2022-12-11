import client from '../client';
import type { UpdateUserNameParams, UpdateUserNameResponse } from './user.types';

export async function updateUserName(params: UpdateUserNameParams) {
  await client.patch<UpdateUserNameResponse>('/api/me', params);
}
