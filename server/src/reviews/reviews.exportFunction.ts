import { resizeProfileImg } from 'src/users/users.multerOptions';

export const processingReview = async (review: any, includeTag: boolean) => {
  const reviews = [];
  for (const data of review) {
    const bookInfo = JSON.parse(data['book_info']);
    let temp = {
      id: data['id'],
      writer: data['user']['nickname'],
      score: data['score'],
      summary: data['summary'],
      like_count: data['like_count'],
      bookTitle: bookInfo['title'],
      bookCover: bookInfo['cover'],
      bookIsbn: data['isbn'],
      tags: [],
    };
    if (includeTag) {
      temp = {
        ...temp,
        tags: data['tags'],
      };
    } else {
      delete temp['tags'];
    }
    reviews.push(temp);
  }
  return reviews;
};

export const processingReviewISBN = async (review: any) => {
  const reviews = [];
  for (const data of review) {
    if (data['user']['profileImg'].slice(0, 6) === 'users/')
      data['user']['profileImg'] = resizeProfileImg(data['user']['profileImg']);
    const temp = {
      id: data['id'],
      writer: data['user']['nickname'],
      writerProfileImg: data['user']['profileImg'],
      summary: data['summary'],
      likeCount: data['like_count'],
      createdAt: data['createdAt'],
      commentCount: data['comments'].length,
    };
    reviews.push(temp);
  }
  return reviews;
};
