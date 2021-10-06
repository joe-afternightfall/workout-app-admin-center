import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, ListItem, ListItemText, Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

export default function BaseListItem({
  title,
  component,
}: BaseListItemProps): JSX.Element {
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemText
        disableTypography
        primary={
          <Grid container alignItems={'center'}>
            <Grid item xs={6} sm={8}>
              <Typography variant={'body2'} color={'textSecondary'}>
                {title}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              {component}
            </Grid>
          </Grid>
        }
      />
    </ListItem>
  );
}

export interface BaseListItemProps {
  title: string;
  component: JSX.Element;
}
