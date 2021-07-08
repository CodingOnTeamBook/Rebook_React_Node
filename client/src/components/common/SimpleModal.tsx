import React, { FunctionComponent, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

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
  open: boolean;
  setOpen: any;
  children: JSX.Element;
}

const SimpleModal: FunctionComponent<IModalProps> = ({
  open,
  setOpen,
  children,
}: IModalProps) => {
  const location = useLocation();
  return (
    <ModalBackground open={open} onClose={() => setOpen()}>
      <ModalContentsContainer>{children}</ModalContentsContainer>
    </ModalBackground>
  );
};

export default SimpleModal;
