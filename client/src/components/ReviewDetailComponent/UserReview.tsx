import React, { FunctionComponent, useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import Favorite from '@material-ui/icons/Favorite';
import Rating from '@material-ui/lab/Rating';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
import { FavoriteBorder } from '@material-ui/icons';
import TransferDate from '../../globalFunction/TransferDate';
import { myProfileImg } from '../../globalFunction/myInfoDefaultValue';
import { SERVER_URL } from 'config';
import { auth } from 'API/USER_PRIVATE_API/index';
import axios from 'axios';

const UserReviewContainer = styled(Box)`
  border-radius: 20px;
  position: relative;
  background-color: white;
  padding: 3%;
  width: 100%;
`;

const UserWrapperContainer = styled(Box)`
  width: 100%;
  height: 100%;
`;

const UserImg = styled(Avatar)`
  width: 60px;
  height: 60px;
  margin-right: 1rem;
  img {
    padding: 0.4rem;
    border-radius: 50%;
    border: 2px solid ${(props) => props.theme.palette.green};
  }
`;

const UserNickName = styled.div`
  font-weight: 900;
  font-size: 1.3rem;
  margin-bottom: 5px;
`;

const UserWrite = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const ReviewDay = styled.p`
  font-size: 1rem;
  color: #808080;
  font-size: 1rem;
`;

const ChipColor = styled(Chip)`
  background-color: ${(props) => props.theme.palette.green};
`;

const BookTag = styled(Box)`
  margin-top: 5px;
  &:not(:last-of-type) {
    content: '';
    margin-right: 10px;
  }
`;

interface IUserReviewProps {
  score: number;
  text: any;
  nickname: string;
  profileImg: string;
  createdAt: string;
  like_count: number;
  tags: any;
  id: number;
}

const UserReview: FunctionComponent<IUserReviewProps> = ({
  score,
  text,
  nickname,
  profileImg,
  createdAt,
  like_count,
  tags,
  id,
}: IUserReviewProps) => {
  const [userNickname, setUserNickname] = useState<string | undefined>('');
  const [userAuthError, setUserAuthError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLike, setIsLike] = useState(false);
  const [likes, setLikes] = useState(0);
  const [checkUserLike, setCheckUserLike] = useState([]);
  const [action, setAction] = useState('like');
  const [likeId, setLikeId] = useState(0);

  useEffect(() => {
    setLikes(like_count);
    setIsLike(isLike);

    const getAuth = async () => {
      try {
        const res = await auth();
        setUserNickname(res.user.nickname);
        setUserAuthError(false);
      } catch (e) {
        console.log(e);
        setUserAuthError(true);
      }
    };
    getAuth();
  }, []);

  useEffect(() => {
    const checkMyLikeReview = async () => {
      axios.get(`/api/users/myinfo/likes/${userNickname}`).then((res) => {
        console.log(res.data);
        res.data.map((like: any) => {
          if (like.id == likeId) {
            setIsLike(true);
            console.log(like.id);
          }
        });
      });
    };
    checkMyLikeReview();
  }, []);

  const onChangeLike = async () => {
    try {
      setError(null);
      if (isLike == false) {
        await axios
          .post('/api/review/like/', {
            reviewid: id,
          })
          .then((res) => {
            setLikes((prev) => (prev += 1));
            setLikes(res.data.reviews.review.like_count);
            setLikeId(res.data.reviews.id);
            console.log(res.data);
            setIsLike(true);
          });
      } else if (isLike == true) {
        // 이미 좋아요를 눌렀는 데 다시 눌렀을 때이므로 취소 로직
        await axios
          .post('/api/review/unlike/', {
            reviewid: id,
          })
          .then((res) => {
            setLikes((prev) => (prev -= 1));
            setIsLike(false);
            console.log(res.data);
          });
      }
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  return (
    <UserReviewContainer boxShadow={2}>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row" flexWrap="nowrap">
          <UserImg alt={nickname} src={myProfileImg(profileImg)} />
          <UserWrapperContainer width={1}>
            <UserNickName>{nickname}</UserNickName>
            <Rating size="large" name="read-only" value={score} readOnly />
            <Box display="flex" flexDirection="row" flexWrap="wrap">
              {tags.map((tag: any) => (
                <BookTag key={tag.id}>
                  <ChipColor label={tag.tag} />
                </BookTag>
              ))}
            </Box>
            <UserWrite
              dangerouslySetInnerHTML={{
                __html: `<iframe src="${SERVER_URL}/${text}" frameborder="0" width="100%" height="100%"></iframe>`,
              }}
            ></UserWrite>
            <ReviewDay> {TransferDate(createdAt)} </ReviewDay>
          </UserWrapperContainer>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={isLike}
            onChange={onChangeLike}
            name="MyLikeReview"
          />
          <h3> {likes}명이 리뷰를 좋아합니다. </h3>
        </Box>
      </Box>
    </UserReviewContainer>
  );
};

export default UserReview;
