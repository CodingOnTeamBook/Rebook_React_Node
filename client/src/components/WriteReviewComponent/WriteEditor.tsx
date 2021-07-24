import React, { forwardRef, useImperativeHandle, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  width: 100%;
  & h1,
  h2,
  h3,
  h4,
  ul,
  ol,
  li,
  blockquote,
  em,
  a {
    margin: revert;
    padding: revert;
    border: revert;
    font-size: revert;
    font: revert;
    vertical-align: revert;
    list-style: revert;
  }
  & blockquote {
    border-left: 4px solid #ccc;
    margin-bottom: 5px;
    margin-top: 5px;
    padding-left: 16px;
  }
  & h1 {
    font-size: 2em;
  }
  & h2 {
    font-size: 1.5em;
  }
`;

const WriteEditor = (props: any, ref: any) => {
  const [editorValue, setEditorValue] = useState<string>('');
  const [summary, setSummary] = useState<string>('');

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link'],
      [{ align: [] }, { color: [] }, { background: [] }],
      ['clean'],
    ],
  };

  const formats = [
    'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
  ];

  const setHtml = (html: string) => {
    setEditorValue(html);
  };

  const setText = (text: string) => {
    setSummary(text.slice(0, 30));
  };

  useImperativeHandle(ref, () => ({
    getContent: () => editorValue,
    getSummary: () => summary,
  }));

  return (
    <Container>
      <ReactQuill
        placeholder="이 책에 대한 나의 생각은..."
        style={{ height: `60vh` }}
        theme="snow"
        onChange={(_, __, ___, editor) => {
          setHtml(editor.getHTML());
          setText(editor.getText());
        }}
        modules={modules}
        formats={formats}
      />
    </Container>
  );
};

export default forwardRef(WriteEditor);
