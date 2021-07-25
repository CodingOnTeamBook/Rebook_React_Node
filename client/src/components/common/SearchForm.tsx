import React, { useRef } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import InputBase from '@material-ui/core/InputBase';
import { fetchApi } from '../../modules/search/action';
import { useDispatch } from 'react-redux';
import useInput from 'hooks/useInput';

const Wrapper = styled.div`
  position: relative;
  width: 50vw;
  box-shadow: 0 4px 8px ${(props) => props.theme.palette.gray};
  margin: 50px auto;
  font-size: 12px;
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
  font-size: 28px;
  margin-right: 4px;
`;

const CancleBtn = styled(CancelIcon)`
  cursor: pointer;
  color: ${(props) => props.theme.palette.green};
`;

interface Props {
  query?: string;
}

const SearchForm = ({ query }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { value, onChange, setInitialValue } = useInput({
    initialValue: query ? decodeURI(query) : '',
  });

  const inputRef: React.MutableRefObject<any> = useRef();

  const onSubmit = () => {
    if (value.trim().length === 0) return;
    dispatch(fetchApi(value.trim(), 1));
    history.push({
      pathname: '/search',
      search: `?query=${value.trim()}`,
    });
  };

  const onReset = () => {
    setInitialValue('');
    inputRef.current.focus();
  };

  return (
    <Wrapper>
      <form className="form" autoComplete="off" onSubmit={() => onSubmit()}>
        <Search_Icon />
        <InputBase
          value={value}
          type="text"
          inputRef={inputRef}
          fullWidth
          placeholder="검색할 책 또는 리뷰어를 입력하세요"
          onChange={onChange}
        />
        {value.length > 0 && <CancleBtn onClick={() => onReset()} />}
      </form>
    </Wrapper>
  );
};

export default SearchForm;
