import React, { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Container = styled.div`
  width: 100%;
  background-color: white;

  .quill {
    height: 60%;
  }

  .quill-editor {
    height: 100%;
  }

  .ql-toolbar.ql-snow + .ql-container.ql-snow {
    height: 70vh;
  }
`;

const WriteEditor: FunctionComponent = () => {
  return (
    <Container>
      <ReactQuill placeholder="이 책에 대한 나의 생각은..." />
    </Container>
  );
};

export default WriteEditor;