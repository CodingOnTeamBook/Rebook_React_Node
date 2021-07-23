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
  const [userNickname, setUserNickname] = useState<any>();
  const [userAuthError, setUserAuthError] = useState<boolean>(false);
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
        console.log(response.user.nickname);
        setUserNickname(response.user.nickname);
        setUserAuthError(false);
      } catch (e) {
        console.log(e);
        setUserAuthError(true);
      }
    }
  }, []);

  // 내용을 updateText에 저장 후 서버에서 받은 filePath값 저장
  const fetchTextFilePath = async () => {
    const textData = {
      text: editorRef.current.getContent(),
    };
    const { data } = await axios.post(
      `api/review/updatefile/${userNickname}`,
      textData
    );
    if (data.success) {
      return data.filePath;
    } else {
      throw data.err;
    }
  };

  const onSubmit = async () => {
    console.log(`[onSubmit]`);
    // const filePath = await fetchTextFilePath();
    // 🔥 Todo
    // Editor null값 검사
    // axios.post 요청
    console.log(editorRef.current.getContent());
    console.log(editorRef.current.getSummary());
    console.log(tagsRef.current.getTags());
    console.log(starRateRef.current.getRate());
    console.log(toggleRef.current.getIsPublic());
  };

  return (
    <Container>
      <Title>리뷰 작성</Title>
      <BookDetail />
      <EditorContainer>
        <WriteEditor ref={editorRef} />
        <TagsInput ref={tagsRef} />
      </EditorContainer>
      <StarRate ref={starRateRef} />
      <ToggleBtn ref={toggleRef} />
      <SubmitBtn onClick={() => onSubmit()}>리뷰발행</SubmitBtn>
    </Container>
  );
};

export default WriteReviewPage;
