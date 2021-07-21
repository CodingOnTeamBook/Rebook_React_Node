import React, { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const WriteEditor: FunctionComponent = () => {
  return (
    <ReactQuill
      placeholder="이 책에 대한 나의 생각은..."
      style={{ height: `60vh` }}
      theme="snow"
    />
  );
};

export default WriteEditor;
