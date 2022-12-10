export interface UpdateUserImageParams {
  userId: string;
  imageUrl: string;
}

export interface UpdateUserInfoParams {
  userId: string;
  userName: string;
}

export interface UpdateUserInfoByEmailParams {
  email: string;
  userName: string;
}
