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
