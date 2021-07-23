import axios from 'axios';
import { REVIEW_SERVER } from '../../config';
import { IReviewerResponse } from './reviewer.interface';

export async function SearchReviewerByNickname(
  nickname: string
): Promise<IReviewerResponse> {
  const response = await axios.get(`${REVIEW_SERVER}/detail/${nickname}`);
  return response.data;
}
