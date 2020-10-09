export const getMonths = () => [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getDays = () => {
  let result = [];
  for (let i = 1; i <= 31; i++) {
    result.push(i);
  }
  return result;
};

export const getYears = () => {
  let result = [];
  for (let i = new Date().getFullYear() - 13; i >= 1919; i--) {
    result.push(i);
  }
  return result;
};
