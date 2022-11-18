import * as yup from 'yup';

export const infiniteScrollingSchema = yup.object({
  cursor: yup.number().optional(),
  limit: yup.number().optional(),
});

export const paginationSchema = yup.object({
  page: yup.number().optional(),
  limit: yup.number().optional(),
});

export const urlSchema = yup.string().url();
