export const formatPrice = (price, useComma = true) => {
  const separator = useComma ? ", " : " ";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};
