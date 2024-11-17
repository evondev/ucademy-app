export const formatDateVN = (date: number | string | Date) => {
  return new Date(date).toLocaleDateString('vi-Vi');
};
