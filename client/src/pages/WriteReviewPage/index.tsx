import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { LineGreenBtn } from '../../style/componentStyled';
import BookDetail from '../../components/common/BookDetail';
import TagsInput from '../../components/WriteReviewComponent/TagsInput';
import WriteEditor from '../../components/WriteReviewComponent/WriteEditor';
import StarRate from '../../components/WriteReviewComponent/StarRate';
import ToggleBtn from '../../components/WriteReviewComponent/ToggleBtn';
import { useRef } from 'react';
import axios from 'axios';
import { auth } from 'API/USER_PRIVATE_API/index';
import { useLocation } from 'react-router';

const SubmitBtn = styled(LineGreenBtn)`
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

//submit 했을 때 일어나는 일: writeEditor 값 txt로 저장, 앞부분 30글자 summary로 저장(ref)
// tagsInput => '오늘, 투두'이런식으로 저장 (ref)
// starRate => 입력한 숫자 저장 (ref)
// toggleBtn => true or false로 (ref)
//submit을 이 파일에서 보내는데 나머지 부분은 ref로 값을 받아옴.
//writeEditor 부분은 파일 저장이라서 저 부분만 writeeditor에서 진행
//writeEditor에서 저장이 되면 서버에서 파일 경로를 return
//submit 할 때 filepath나 url로 해당 내용 저장
// fileSave boolean값으로 관리 => writeEditor에서 쓴 내용 저장하고 filepath 가벼오는거 기다리기

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
`;

const WriteReviewPage: FunctionComponent = () => {
  const location: any = useLocation();
  const isbn = location.state.isbn;
  const [userNickname, setUserNickname] = useState<string | undefined>('');
  const [userAuthError, setUserAuthError] = useState<boolean>(false);
  const [isFileSaved, setIsFileSaved] = useState<boolean | null>(true);

  const [bookInfo, setBookInfo] = useState();
  const [bookError, setBookError] = useState(false);

  const editorRef = useRef<any>();
  const tagsRef = useRef<any>();
  const starRateRef = useRef<any>();
  const toggleRef = useRef<any>();

  // 파라미터로 넘길 nickname
  useEffect(() => {
    getAuth();
    async function getAuth() {
      try {
        const response = await auth();
        // console.log(response.user.nickname);
        setUserNickname(response.user.nickname);
        setUserAuthError(false);
      } catch (e) {
        console.log(e);
        setUserAuthError(true);
      }
    }
  }, []);

  useEffect(() => {
    const fetchBookInfo = async () => {
      try {
        const response = await axios.get(`/api/book/search?title=${isbn}`);
        setBookInfo(response.data.books.item[0]);
      } catch (err) {
        setBookError(true);
      }
    };
    fetchBookInfo();
  }, []);

  // 내용을 updateText에 저장 후 서버에서 받은 filePath값 저장
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
      // console.log(filePath);
      const summary = await editorRef.current.getSummary();
      if (summary.length < 5) {
        alert('5자 이상의 글자를 입력해주세요');
        return;
      }
      const score = await starRateRef.current.getRate();
      const isPublic = await toggleRef.current.getIsPublic();
      const tag = await tagsRef.current.getTags();
      const data = {
        text: JSON.stringify(filePath),
        writer: JSON.stringify(userNickname),
        bookInfo: JSON.stringify(bookInfo),
        summary: JSON.stringify(summary),
        score: JSON.stringify(score),
        isPublic: JSON.stringify(isPublic),
        tag: JSON.stringify(tag),
      };

      const response = await axios.post('/api/review/write', data);
      if (response.data) {
        alert('성공적으로 저장되었습니다');
        window.location.href = '/';
      }
    } catch (err) {
      console.log(err);
      alert('잠시후 다시 시도해주세요');
    }
  };

  // To do : 에러페이지
  if (userAuthError || !isFileSaved) return <div>에러발생</div>;

  return (
    <Container>
      <Title>리뷰 작성</Title>
      <BookDetail bookInfo={bookInfo} />
      <EditorContainer>
        <WriteEditor ref={editorRef} />
        <TagsInput ref={tagsRef} />
      </EditorContainer>
      <StarRate ref={starRateRef} />
      <ToggleBtn ref={toggleRef} />
      <SubmitBtn onClick={onSubmit}>리뷰발행</SubmitBtn>
    </Container>
  );
};

export default WriteReviewPage;
