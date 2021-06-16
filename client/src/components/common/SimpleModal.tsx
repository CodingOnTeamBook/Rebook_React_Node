import React, { FunctionComponent } from 'react';
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';

const ModalBackground = styled(Modal)`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

interface IModalProps {
  open: boolean;
  setOpen: any; // function(event: object, reason: string) => void 참고
  children: JSX.Element;
}

const SimpleModal: FunctionComponent<IModalProps> = ({
  open,
  setOpen,
  children,
}: IModalProps) => {
  return (
    <ModalBackground open={open} onClose={setOpen}>
      {children}
    </ModalBackground>
  );
};

export default SimpleModal;
