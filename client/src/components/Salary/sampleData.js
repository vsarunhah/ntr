const defaultLevels = [
  {
    name: 'L3',
    base: 4000,
    bonus: 2400,
    stocks: 2400,
    totalComp: 100000,
  },
  {
    name: 'L4',
    base: 4000,
    bonus: 2400,
    stocks: 2400,
    totalComp: 100000,
  },
  {
    name: 'L5',
    base: 4000,
    bonus: 2400,
    stocks: 2400,
    totalComp: 100000,
  },
];

const defaultRoleList = [
  {
    name: 'Software Engineer',
    avgTotalComp: 100000,
    levels: defaultLevels,
  },
  {
    name: 'Product Manager',
    avgTotalComp: 120000,
    levels: defaultLevels.slice(1),
  },
  {
    name: 'Data Scientist',
    avgTotalComp: 110000,
  },
  {
    name: 'UX Designer',
    avgTotalComp: 90000,
  },
  {
    name: 'Unique',
    avgTotalComp: 90000,
    levels: defaultLevels.slice(2),
  },
];

const defaultCompanyData = [
  {
    name: 'Unique',
    base: 4000,
    bonus: 2400,
    stocks: 2400,
    roles: defaultRoleList,
  },
  {
    name: 'Google',
    base: 4000,
    bonus: 2400,
    stocks: 2400,
    roles: defaultRoleList,
  },
  {
    name: 'Amazon',
    base: 3000,
    bonus: 1398,
    stocks: 2210,
  },
  {
    name: 'Facebook',
    base: 2000,
    bonus: 9800,
    stocks: 2290,
  },
  {
    name: 'Apple',
    base: 2780,
    bonus: 3908,
    stocks: 2000,
  },
  {
    name: 'Microsoft',
    base: 1890,
    bonus: 4800,
    stocks: 2181,
  },
  {
    name: 'Google',
    base: 4000,
    bonus: 2400,
    stocks: 2400,
  },
  {
    name: 'Amazon',
    base: 3000,
    bonus: 1398,
    stocks: 2210,
  },
  {
    name: 'Facebook',
    base: 2000,
    bonus: 9800,
    stocks: 2290,
  },
  {
    name: 'Apple',
    base: 2780,
    bonus: 3908,
    stocks: 2000,
  },
  {
    name: 'Microsoft',
    base: 1890,
    bonus: 4800,
    stocks: 2181,
  },
  {
    name: 'Facebook',
    base: 2000,
    bonus: 9800,
    stocks: 2290,
  },
  {
    name: 'Apple',
    base: 2780,
    bonus: 3908,
    stocks: 2000,
  },
  {
    name: 'Microsoft',
    base: 1890,
    bonus: 4800,
    stocks: 2181,
  },
  {
    name: 'Facebook',
    base: 2000,
    bonus: 9800,
    stocks: 2290,
  },
  {
    name: 'Apple',
    base: 2780,
    bonus: 3908,
    stocks: 2000,
  },
  {
    name: 'Microsoft',
    base: 1890,
    bonus: 4800,
    stocks: 2181,
  },
  {
    name: 'Apple',
    base: 2780,
    bonus: 3908,
    stocks: 2000,
  },
  {
    name: 'Microsoft',
    base: 1890,
    bonus: 4800,
    stocks: 2181,
  },
  {
    name: 'Facebook',
    base: 2000,
    bonus: 9800,
    stocks: 2290,
  },
  {
    name: 'Apple',
    base: 2780,
    bonus: 3908,
    stocks: 2000,
  },
  {
    name: 'Microsoft',
    base: 1890,
    bonus: 4800,
    stocks: 2181,
  },

];

export {defaultRoleList, defaultCompanyData, defaultLevels};