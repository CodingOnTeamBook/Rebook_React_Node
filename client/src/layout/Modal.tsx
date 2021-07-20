import React, { FunctionComponent, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';
import { RootState } from 'redux/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

const ModalBackground = styled(Modal)`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ModalContentsContainer = styled.div`
  position: relative;
`;

interface IModalProps {
  children: NonNullable<React.ReactNode>;
}

const ModalLayout: FunctionComponent<IModalProps> = ({
  children,
}: IModalProps) => {
  return <div>layout</div>;
};

export default ModalLayout;
