import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

export default function BaseActionMenu({
  id,
  menuItems,
}: BaseActionMenuProps): JSX.Element {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton color={'inherit'} onClick={openMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={`${id}-menu`}
        open={open}
        keepMounted
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={closeMenu}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              closeMenu();
              item.clickHandler();
            }}
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export interface BaseActionMenuProps {
  id: string;
  menuItems: {
    title: string;
    clickHandler: () => void;
  }[];
}
