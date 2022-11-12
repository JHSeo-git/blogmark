import * as yup from 'yup';

export const paginationSchema = yup.object({
  cursor: yup.number().optional(),
  limit: yup.number().optional(),
});
