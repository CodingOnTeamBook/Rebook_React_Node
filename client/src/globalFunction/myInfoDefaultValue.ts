import userImg from '../style/img/user (1).png';

export const myGender = (gender: string): string => {
  if (gender == 'Secret') {
    return '비공개';
  } else {
    return gender;
  }
};

export const myProfileImg = (profileImg: string): string => {
  if (profileImg == 'defaultImg') {
    return userImg;
  } else {
    return profileImg;
  }
};

export const myAgeRange = (ageRange: string): string => {
  if (ageRange == 'Secret') {
    return '비공개';
  } else {
    return ageRange;
  }
};

export const myInfo = (info: string): string => {
  if (info == 'defaultInfo') {
    return '안녕하세요! 반갑습니다.';
  } else {
    return info;
  }
};
