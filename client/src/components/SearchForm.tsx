import React, { FunctionComponent, useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import InputBase from '@material-ui/core/InputBase';
import axios from 'axios';

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

const SearchForm = () => {
  const [inputValue, setInputValue] = useState('');
  const inputRef: React.MutableRefObject<any> = useRef();
  const history = useHistory();

  const OnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const searchKeyword = e.target.value;
    setInputValue(searchKeyword);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    // ⭐ To do
    // 1. searchPage로 이동
    // 2. inputValue 전달
    // 3. 검색어 searchResult action dispatch
    axios
      .get(`api/book/search?title=${inputValue}`)
      .then(
        ({
          data: {
            books: { item },
          },
        }) => {
          history.push({
            pathname: '/search',
            state: { inputValue, item },
          });
          console.log(item);
        }
      )
      .catch((e) => console.log(e));
  };

  const onReset = () => {
    setInputValue('');
    inputRef.current.focus();
    // To do
    // store에 저장한 search Keyword 없애기
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

export default SearchForm;
