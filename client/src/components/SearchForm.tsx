import React, { FunctionComponent, useState, useRef } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import InputBase from '@material-ui/core/InputBase';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import {
  setKeyword,
  resetKeyword,
  getSearchResult,
} from '../redux/search/action';

const Wrapper = styled.div`
  position: relative;
  width: 50vw;
  box-shadow: 0 4px 8px ${(props) => props.theme.palette.gray};
  margin: 50px auto;
  border-radius: 16px;
  padding: 8px 10px;

  .form {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;

const Search_Icon = styled(SearchIcon)`
  color: ${(props) => props.theme.palette.darkgreen};
  font-size: 32px;
  margin-right: 4px;
`;

const CancleBtn = styled(CancelIcon)`
  cursor: pointer;
  color: ${(props) => props.theme.palette.green};
`;

const SearchForm: FunctionComponent = () => {
  // const keyword = useSelector((state) => state.search.keyword);
  const history = useHistory();
  const dispatch = useDispatch();
  const keyword = useSelector((state: RootState) => state.search.keyword);
  // const keywordResult = useSelector((state: RootState) => state.search.data);

  const [inputValue, setInputValue] = useState(keyword);
  const inputRef: React.MutableRefObject<any> = useRef();

  const OnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const searchKeyword = e.target.value;
    setInputValue(searchKeyword);
  };

  const onSubmit = (e: any) => {
    console.log('[onSubmit]');
    e.preventDefault();
    // ⭐ To do
    // 1. searchPage로 이동
    // 2. inputValue 전달
    // 3. 검색어 searchResult action dispatch
    // store에 저장한 기존 search Keyword 없애기
    dispatch(resetKeyword());
    dispatch(setKeyword(inputValue));
    history.push('/search');
  };

  const onReset = () => {
    dispatch(resetKeyword());
    setInputValue('');
    inputRef.current.focus();
  };

  return (
    <Wrapper>
      <form className="form" autoComplete="off" onSubmit={(e) => onSubmit(e)}>
        <Search_Icon />
        <InputBase
          value={inputValue}
          type="text"
          inputRef={inputRef}
          fullWidth
          placeholder="검색할 책 또는 리뷰어를 입력하세요"
          onChange={(e) => OnChange(e)}
        />
        {inputValue.length > 0 && <CancleBtn onClick={() => onReset()} />}
      </form>
    </Wrapper>
  );
};

// store에 있는 keyword 사용
// const mapStateToProps = (state: any) => {
//   console.log(state); //search, auth
//   return {
//     keyword: state.search.keyword,
//   };
// };

// store의 데이터 변경하기
// const mapDispatchToProps = (dispatch: Dispatch) => {
//   return {
//     setKeyword: (inputValue: string) => dispatch(setKeyword(inputValue)),
//     resetKeyword: () => dispatch(resetKeyword()),
//   };
// };

export default SearchForm;
