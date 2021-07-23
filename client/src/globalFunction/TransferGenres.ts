import { genreTags } from 'components/defaultData/genre';

export const TransferGenres = (tags: string) => {
  const numArr = tags.split(',');
  const StringArr = numArr.map((item) => {
    const target = FindByType(Number(item));
    if (target) return target.value;
  });
  return StringArr;
};

const FindByType = (num: number) => {
  return genreTags.find((item) => item.type === num);
};

export const TransferCheckGenres = (tags: string) => {
  const numArr = tags.split(',').map((x) => +x);
  const CopyGenre = genreTags;
  const CheckedGenre = CopyGenre.map((item) => {
    if (numArr.includes(item.type)) item.defaultValue = true;
    return item;
  });
  return CheckedGenre;
};
