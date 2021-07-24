export const myGender = (gender: string): string => {
  if (gender == 'Secret') {
    return '비공개';
  } else {
    return gender === 'female' ? '여성' : '남성';
  }
};

export const myProfileImg = (profileImg: string | null): string => {
  if (profileImg) {
    return profileImg;
  } else {
    return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
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
  if (info) {
    return info;
  } else {
    return '자기 소개를 입력해주세요.';
  }
};
