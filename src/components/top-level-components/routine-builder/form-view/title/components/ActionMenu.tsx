import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { addPhaseToRoutine } from '../../../../../../creators/routine-builder/builder';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const ActionMenu = ({
  editHandler,
  addPhaseHandler,
}: ActionMenuProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton color={'inherit'} onClick={handleMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={'routine-menu'}
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
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            editHandler(true);
          }}
        >
          {'Edit'}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            addPhaseHandler();
          }}
        >
          {'Add Phase'}
        </MenuItem>
      </Menu>
    </div>
  );
};

interface PassedInProps {
  editHandler: (isEditing: boolean) => void;
}

interface ActionMenuProps {
  addPhaseHandler: () => void;
}

const mapStateToProps = (): ActionMenuProps => {
  return {} as unknown as ActionMenuProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ActionMenuProps =>
  ({
    addPhaseHandler: () => {
      dispatch(addPhaseToRoutine());
    },
  } as unknown as ActionMenuProps);

export default connect(mapStateToProps, mapDispatchToProps)(ActionMenu);
