import React, { FunctionComponent } from 'react';
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';
import { RootState } from 'modules/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { modalClose } from 'modules';

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
  const { show } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  return (
    <ModalBackground open={show} onClose={() => dispatch(modalClose())}>
      <ModalContentsContainer>{children}</ModalContentsContainer>
    </ModalBackground>
  );
};

export default ModalLayout;
