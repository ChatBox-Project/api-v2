export const isValidNumberPhone = (numberPhone: string): unknown => {
  return /((0[3|5|7|8|9])+([0-9]{8})|([+]84[3|5|7|8|9])+([0-9]{8}))\b/g.test(
    numberPhone,
  );
};
