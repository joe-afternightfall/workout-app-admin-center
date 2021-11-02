import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Grid, IconButton, Typography } from '@material-ui/core';

export default function DefaultOptionTitle(
  props: DefaultOptionTitleProps
): JSX.Element {
  return (
    <Grid container alignItems={'center'}>
      <Grid item xs={8}>
        <Typography>{props.title}</Typography>
      </Grid>
      <Grid item xs={4}>
        <IconButton onClick={props.selectOptionHandler}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

interface DefaultOptionTitleProps {
  title: string;
  selectOptionHandler: () => void;
}
