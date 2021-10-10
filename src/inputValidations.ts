export const validatorAmount = (value: number) => {
  if (isNaN(value) || value === 0) {
    throw new Error("Incorrect Amount");
  }

  return value;
};

export const validatorString = (value: string) => {
  if (value.trim().length <= 2) {
    throw new Error("Must be above 2 characters long");
  }

  return value.trim();
};
