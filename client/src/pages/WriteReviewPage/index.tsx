import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import BookDetail from '../../components/common/BookDetail';
import TagsInput from '../../components/WriteReviewComponent/TagsInput';
import WriteEditor from '../../components/WriteReviewComponent/WriteEditor';
import StarRate from '../../components/WriteReviewComponent/StarRate';
import ToggleBtn from '../../components/WriteReviewComponent/ToggleBtn';
import SubmitBtn from '../../components/WriteReviewComponent/SubmitBtn';

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
//submit 할 때 filepath로 해당 내용 저장
// fileSave boolean값으로 관리 => writeEditor에서 쓴 내용 저장하고 filepath 가벼오는거 기다리기

const WriteReviewPage: FunctionComponent = () => {
  return (
    <Container>
      <Title>리뷰 작성</Title>
      <BookDetail />
      <WriteEditor />
      <TagsInput />
      <StarRate />
      <ToggleBtn />
      <SubmitBtn />
    </Container>
  );
};

export default WriteReviewPage;
