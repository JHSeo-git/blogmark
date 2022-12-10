import client from '../client';
import type { UpdateUserNameParams, UpdateUserNameResponse } from './user.types';

export async function updateUserName(params: UpdateUserNameParams) {
  await client.put<UpdateUserNameResponse>('/api/me', params);
}
