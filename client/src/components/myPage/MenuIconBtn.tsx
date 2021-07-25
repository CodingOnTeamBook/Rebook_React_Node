import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { DeleteMyReview } from 'API/USER_PRIVATE_API';

const MenuContainer = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
`;

interface IProps {
  reviewid: number;
}
const MenuIconBtn = ({ reviewid }: IProps) => {
  const [open, setOpen] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(null);
  };

  const updateReview = () => {
    console.log('updateReview');
  };

  const deleteReview = () => {
    DeleteMyReview(reviewid).then((response) => {
      if (response.success) {
        alert('성공적으로 삭제되었습니다.');
        window.location.reload();
      }
    });
  };
  return (
    <>
      <MenuContainer
        aria-label="more"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </MenuContainer>
      <Menu
        id="menu"
        anchorEl={open}
        keepMounted
        open={Boolean(open)}
        onClose={handleClose}
      >
        <MenuItem style={{ fontSize: '12px' }} onClick={() => updateReview()}>
          수정하기
        </MenuItem>
        <MenuItem style={{ fontSize: '12px' }} onClick={() => deleteReview()}>
          삭제하기
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuIconBtn;
