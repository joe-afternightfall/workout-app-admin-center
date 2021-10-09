import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default function LineItemTitle({
  title,
}: LineItemTitleProps): JSX.Element {
  const classes = useStyles();

  return (
    <Typography variant={'subtitle1'} color={'textSecondary'}>
      {title}
    </Typography>
  );
}

export interface LineItemTitleProps {
  title: string;
}
