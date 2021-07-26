import React, { FunctionComponent, useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import Favorite from '@material-ui/icons/Favorite';
import Rating from '@material-ui/lab/Rating';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
import { FavoriteBorder, LeakRemoveTwoTone } from '@material-ui/icons';
import TransferDate from '../../globalFunction/TransferDate';
import { myProfileImg } from '../../globalFunction/myInfoDefaultValue';
import { SERVER_URL } from 'config';
import useCheck from 'hooks/useCheck';
import { Like, UnLike } from 'API/USER_PUBLIC_API';
import axios from 'axios';
import { auth } from 'API/USER_PRIVATE_API/index';

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
  likeCheck: boolean;
  userNickname: any;
  checkLike: boolean;
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
  likeCheck,
  userNickname,
  checkLike,
}: IUserReviewProps) => {
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState(like_count);
  const [isCheck, setIsCheck] = useState(checkLike);
  const [userNickname2, setUserNickname] = useState<string | undefined>('');
  const [checkLikeReivew, setCheckLikeReivew] = useState<any[]>([]);
  const [action, setAction] = useState<null | string>(null);
  // const [likeShape, setLikeShape] = useState(false);
  // const { value, onChange } = useCheck({
  //   name: 'like',
  //   initialValue: likeCheck,
  // });

  // 초기값은 likeCheck ( 유저가 좋아요한 적이 있는가 )
  // value가 true => false ( unlike, 서버에서 성공 되면 setLikes(prev => prev - 1) )
  // value가 false => true ( like 서버에서 성공 되면 setLikes(prev => prev + 1) )

  // useEffect(() => {
  //   // if (!likeCheck && value) {
  //   //   Like(id)
  //   //     .then((response) => {
  //   //       console.log(response);
  //   //       setLikes((prev) => prev + 1);
  //   //     })
  //   //     .catch((err) => console.log(err));
  //   // } else if (likeCheck && !value) {
  //   //   UnLike(id)
  //   //     .then((response) => {
  //   //       console.log(response);
  //   //       setLikes((prev) => prev - 1);
  //   //     })
  //   //     .catch((err) => console.log(err));
  //   // }
  // }, [likeShape]);

  // useEffect(() => {

  // }, [likeCheck]);

  useEffect(() => {
    const getAuth = async () => {
      try {
        setLoading(true);
        const response = await auth();
        console.log(response.user.nickname);
        setUserNickname(response.user.nickname);
        const res = await axios.get(
          `/api/users/myinfo/likes/${response.user.nickname}`
        );
        setCheckLikeReivew(res.data);
        console.log(res.data);
        const isLikeReviews = res.data.some((like: any) => like.id === id);
        console.log(isLikeReviews);
        if (isLikeReviews == true) {
          setIsCheck(true);
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    getAuth();
  }, []);

  const OnLikeChange = () => {
    if (isCheck == false) {
      Like(id)
        .then((response) => {
          console.log(response);
          setLikes((prev) => prev + 1);
          setIsCheck(true);
        })
        .catch((err) => console.log(err));
    } else if (isCheck == true) {
      UnLike(id)
        .then((response) => {
          console.log(response);
          setLikes((prev) => prev - 1);
          setIsCheck(false);
        })
        .catch((err) => console.log(err));
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
            checked={isCheck}
            onChange={OnLikeChange}
            name="MyLikeReview"
          />
          <h3> {likes}명이 리뷰를 좋아합니다. </h3>
        </Box>
      </Box>
    </UserReviewContainer>
  );
};

export default UserReview;
