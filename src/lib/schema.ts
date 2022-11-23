import * as yup from 'yup';

export const paginationSchema = yup.object({
  page: yup.number().optional(),
  limit: yup.number().optional(),
});

export const paginationByCursorSchema = yup.object({
  cursor: yup.number().optional(),
  limit: yup.number().optional(),
});

export const urlSchema = yup.string().url().required();
