import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { LineGreenBtn } from '../../style/componentStyled';
import BookDetail from '../../components/BookDetail/BookDetail';
import TagsInput from '../../components/WriteReviewComponent/TagsInput';
import WriteEditor from '../../components/WriteReviewComponent/WriteEditor';
import StarRate from '../../components/WriteReviewComponent/StarRate';
import ToggleBtn from '../../components/WriteReviewComponent/ToggleBtn';
import { useRef } from 'react';
import axios from 'axios';
import { auth } from 'API/USER_PRIVATE_API/index';
import { useLocation } from 'react-router';
import fetchData from 'globalFunction/fetchData';

const SubmitBtn = styled(LineGreenBtn)`
  width: 200px;
  margin: 50px 0;
  background-color: white;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10vh auto;
  padding: 2rem;
  background-color: ${(props) => props.theme.palette.white};
`;

const Title = styled.h1`
  margin-bottom: 0;
  background-color: white;
`;

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
`;

interface initialState {
  data: any | null;
  isError: boolean | null;
}

const WriteReviewPage: FunctionComponent = () => {
  const MIN_LENGTH = 5;

  const location: any = useLocation();
  const ISBN = location.state.isbn;

  const [userNickname, setUserNickname] = useState<string | undefined>('');
  const [userAuthError, setUserAuthError] = useState<boolean>(false);

  const [isFileSaved, setIsFileSaved] = useState<boolean | null>(true);

  const [bookInfoState, setBookInfoState] = useState<initialState>({
    data: null,
    isError: null,
  });

  const editorRef = useRef<any>();
  const tagsRef = useRef<any>();
  const starRateRef = useRef<any>();
  const toggleRef = useRef<any>();

  useEffect(() => {
    fetchData({
      method: 'GET',
      url: `/api/book/search?title=${ISBN}`,
    }).then(({ data, isError }) => {
      setBookInfoState({
        ...bookInfoState,
        data: data.books.item[0],
        isError,
      });
    });
    // ??????????????? ?????? nickname
    getAuth();
    async function getAuth() {
      try {
        const response = await auth();
        setUserNickname(response.user.nickname);
        setUserAuthError(false);
      } catch (e) {
        console.log(e);
        setUserAuthError(true);
      }
    }
  }, []);

  // ????????? updateText??? ?????? ??? ???????????? ?????? filePath??? ??????
  const fetchTextFilePath = async () => {
    const textData = {
      text: editorRef.current.getContent(),
    };
    const { data } = await axios.post(
      `/api/review/updatefile/${userNickname}`,
      textData
    );
    if (data.success) {
      setIsFileSaved(true);
      return data.filePath;
    } else {
      setIsFileSaved(false);
      throw data.err;
    }
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const filePath = await fetchTextFilePath();
      const summary = await editorRef.current.getSummary();
      if (summary.length < MIN_LENGTH) {
        alert(`${MIN_LENGTH}??? ????????? ????????? ??????????????????`);
        return;
      }
      const score = await starRateRef.current.getRate();
      const isPublic = await toggleRef.current.getIsPublic();
      const tag = await tagsRef.current.getTags();
      const data = {
        text: filePath,
        writer: userNickname,
        bookInfo: JSON.stringify(bookInfoState.data),
        summary: summary,
        score: score.toString(),
        isPublic: isPublic.toString(),
        tag: tag,
      };

      const response = await axios.post('/api/review/write', data);
      if (response.data) {
        alert('??????????????? ?????????????????????');
        window.location.href = '/';
      }
    } catch (err) {
      console.log(err);
      alert('????????? ?????? ??????????????????');
      // window.location.reload();
    }
  };

  if (userAuthError || !isFileSaved)
    return <Container>????????? ??????????????????? ????????? ?????? ??????????????????</Container>;

  return (
    <Container>
      <Title>?????? ??????</Title>
      <BookDetail bookInfo={bookInfoState.data} />
      <EditorContainer>
        <WriteEditor ref={editorRef} />
        <TagsInput ref={tagsRef} />
      </EditorContainer>
      <StarRate ref={starRateRef} />
      <ToggleBtn ref={toggleRef} />
      <SubmitBtn onClick={onSubmit}>????????????</SubmitBtn>
    </Container>
  );
};

export default WriteReviewPage;
