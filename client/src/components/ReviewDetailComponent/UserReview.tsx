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
import { Like, UnLike } from 'API/USER_PUBLIC_API';
import axios from 'axios';
import { auth } from 'API/USER_PRIVATE_API/index';

const UserReviewContainer = styled(Box)`
  border-radius: 20px;
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

const Message = styled.span`
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 20px;
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
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState(like_count);
  const [isCheck, setIsCheck] = useState(false);
  const [newheight, setNewHeight] = useState(0);
  const [newwidth, setNewWidth] = useState(0);

  useEffect(() => {
    getAuth();
    return () => {
      getAuth();
    };
  }, []);

  async function getAuth() {
    try {
      setLoading(true);
      const response = await auth();
      const res = await axios.get(
        `/api/users/myinfo/likes/${response.user.nickname}`
      );
      const isLikeReviews = res.data.some((like: any) => like.id === id);
      if (isLikeReviews == true) {
        setIsCheck(true);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  const OnLikeChange = async () => {
    const response = await auth();
    if (response.isAuth == false) {
      alert('먼저 로그인 해주세요 😀');
    } else {
      if (isCheck == false) {
        Like(id)
          .then(() => {
            setLikes((prev) => prev + 1);
            setIsCheck(true);
          })
          .catch((err) => console.log(err));
      } else if (isCheck == true) {
        UnLike(id)
          .then(() => {
            setLikes((prev) => prev - 1);
            setIsCheck(false);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const iframePart = () => {
    return {
      __html: `<iframe src=${SERVER_URL}/${text} frameborder="0" 
      style="position: absolute; left: 0; right: 0; height: 100%; width: 100%;"></iframe>`,
    };
  };

  return (
    <>
      {loading ? (
        <Message> 로딩 중입니다 📚</Message>
      ) : (
        <UserReviewContainer boxShadow={2}>
          <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="row" flexWrap="nowrap">
              <UserImg alt={nickname} src={myProfileImg(profileImg)} />
              <UserWrapperContainer>
                <UserNickName>{nickname}</UserNickName>
                <Rating size="large" name="read-only" value={score} readOnly />
                <Box display="flex" flexDirection="row" flexWrap="wrap">
                  {tags.map((tag: any) => (
                    <BookTag key={tag.id}>
                      <ChipColor label={tag.tag} />
                    </BookTag>
                  ))}
                </Box>
                <UserWrite dangerouslySetInnerHTML={iframePart()} />
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
                checked={isCheck}
                onChange={OnLikeChange}
                name="MyLikeReview"
              />
              <h3> {likes}명이 리뷰를 좋아합니다. </h3>
            </Box>
          </Box>
        </UserReviewContainer>
      )}
    </>
  );
};

export default UserReview;
