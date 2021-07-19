export interface IReviewer {
  countFollowers: number;
  countUserReviews: number;
  genres: string | any;
  id: number;
  info: null | any;
  nickname: string;
}

export interface IReviewerResponse {
  success: boolean;
  reviewer: Array<IReviewer> | string;
}
