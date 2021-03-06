import React, {
  FunctionComponent,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';
import CancelIcon from '@material-ui/icons/Cancel';

const InputWrapper = styled.div`
  display: flex;
  position: relative;
  top: 30px;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 50px;
  background-color: white;
  border: 1px solid #ccc;
`;

const TagWrapper = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  list-style: none;
  background-color: white;

  .tag {
    display: flex;
    align-items: center;
    margin: 6px;
    padding: 4px;
    background-color: ${(props) => props.theme.palette.lightgreen};
    border-radius: 6px;
  }
`;

const Input = styled(InputBase)`
  position: relative;
  background-color: white;
  margin: 0;
  padding: 0 10px;
`;

const RemoveBtn = styled(CancelIcon)`
  cursor: pointer;
  font-size: 1rem;
  margin-left: 6px;
  color: ${(props) => props.theme.palette.green};
`;

const TagsInput = (props: any, ref: any) => {
  const [inputTag, setInputTags] = useState<string[]>([]);

  const addTag = (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e?.key !== 'Enter') return;
    // 중복 태그 입력 처리
    if (inputTag.includes(e.currentTarget.value)) {
      alert('이미 존재하는 태그입니다');
      return;
    }

    setInputTags([...inputTag, e.currentTarget.value]);
    e.currentTarget.value = '#';
  };

  const removeTag = (index: number) =>
    setInputTags([...inputTag].filter((_, idx) => idx !== index));

  useImperativeHandle(ref, () => ({
    getTags: () => inputTag.join(),
  }));

  return (
    <InputWrapper>
      <TagWrapper>
        {inputTag.map((tag, index) => (
          <li className="tag" key={index}>
            {tag}
            <RemoveBtn onClick={() => removeTag(index)} />
          </li>
        ))}
      </TagWrapper>
      <Input
        type="text"
        placeholder="#태그 입력 후 엔터"
        onKeyUp={(e) => addTag(e)}
      />
    </InputWrapper>
  );
};

export default forwardRef(TagsInput);
