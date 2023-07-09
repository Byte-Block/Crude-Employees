export const defaultFormState = {
  name: '',
  position: '',
  office: '',
  age: '',
  startDate: '',
  salary: ''
};

export const SortingDirection = Object.freeze({
  ASCENDING: 1,
  DESCENDING: -1,
  UNSORTED: 0
});

export const sortData = (data, sortKey, sortingDirection) => {
  const collator = new Intl.Collator(undefined, { numeric: true });
  data.sort(({ [sortKey]: a }, { [sortKey]: b }) => {
    if (sortKey === 'salary') {
      const regex = /(^\$|,)/g;
      a = Number(a.replace(regex, ''));
      b = Number(b.replace(regex, ''));
    }

    return sortingDirection * collator.compare(a, b);
  });
};

export const getNextSortingDirection = (sortingDirection) =>
  sortingDirection === SortingDirection.UNSORTED || sortingDirection === SortingDirection.ASCENDING
    ? SortingDirection.DESCENDING
    : SortingDirection.ASCENDING;

const isCamelCase = (s) => /[a-z]+[A-Z][a-zA-Z]*/.test(s);

const splitCamelCase = (camelCase) => camelCase.split(/([A-Z][a-z]+)/).filter((e) => e);

export const camelCaseToText = (entry) => {
  if (isCamelCase(entry)) {
    const textArr = splitCamelCase(entry.toString());
    const text = textArr.join(' ').replace(' ,', '');
    const finalText = text.charAt(0).toUpperCase() + text.slice(1);
    return finalText;
  } else {
    return entry.toString().charAt(0).toUpperCase() + entry.toString().slice(1).replace(',', '');
  }
};
