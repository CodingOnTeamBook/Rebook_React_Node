import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const MenuContainer = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
`;

const MenuIconBtn = () => {
  const [open, setOpen] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(null);
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
        <MenuItem style={{ fontSize: '12px' }}>수정하기</MenuItem>
        <MenuItem style={{ fontSize: '12px' }}>삭제하기</MenuItem>
      </Menu>
    </>
  );
};

export default MenuIconBtn;
