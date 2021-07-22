import React, { forwardRef, useImperativeHandle, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const WriteEditor = (props: any, ref: any) => {
  const [value, setValue] = useState<string>('');
  const [summary, setSummary] = useState<string>('');

  const onChangeHtml = (html: string) => {
    setValue(html);
  };

  const onChangeText = (text: string) => {
    setSummary(text.slice(0, 30));
  };

  useImperativeHandle(ref, () => ({
    getContent: () => value,
    getSummary: () => summary,
  }));

  return (
    <ReactQuill
      placeholder="이 책에 대한 나의 생각은..."
      style={{ height: `60vh` }}
      theme="snow"
      onChange={(_, __, ___, editor) => {
        onChangeHtml(editor.getHTML());
        onChangeText(editor.getText());
      }}
      value={value}
    />
  );
};

export default forwardRef(WriteEditor);
