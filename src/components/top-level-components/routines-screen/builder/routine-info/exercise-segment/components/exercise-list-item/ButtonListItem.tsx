import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default function ButtonListItem({
  title,
  clickHandler,
}: ButtonListItemProps): JSX.Element {
  const classes = useStyles();

  return (
    <ListItem button onClick={clickHandler}>
      <ListItemText primary={title} />
    </ListItem>
  );
}

export interface ButtonListItemProps {
  title: string;
  clickHandler: () => void;
}
