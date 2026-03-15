const SORT_ORDER = ['asc', 'desc'];

const SORT_FİELDS = [
  '_id',
  'name',
  'age',
  'gender',
  'avgMark',
  'onDuty',
  'createdAt',
  'updatedAt',
];

const DEFAULT_PAGINATION_VALUES = {
  page: 1,
  perPage: 5,
  sortBy: '_id',
  sortOrder: 'asc',
};

export { DEFAULT_PAGINATION_VALUES, SORT_ORDER, SORT_FİELDS };
