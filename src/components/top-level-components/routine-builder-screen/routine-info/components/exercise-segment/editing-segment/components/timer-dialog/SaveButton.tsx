import React from 'react';
import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginLeft: 'auto',
    },
  })
);

export default function SaveButton(props: SaveButtonProps): JSX.Element {
  const classes = useStyles();

  return (
    <Button className={classes.root} onClick={props.closeHandler}>
      {'Save'}
    </Button>
  );
}

interface SaveButtonProps {
  closeHandler: () => void;
}
