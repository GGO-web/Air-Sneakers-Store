export const isValidEmail = (value: string): boolean => {
   return /\S+@\S+\.\S+/g.test(value);
};
