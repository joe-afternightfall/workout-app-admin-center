import React from 'react';
import { Grid, ListItem, ListItemText } from '@material-ui/core';
import LineItemTitle from '../../base-components/LineItemTitle';

export default function BuiltListItem({
  title,
  rightComponent,
}: BuiltListItemProps): JSX.Element {
  return (
    <ListItem>
      <ListItemText
        disableTypography
        primary={
          <Grid container>
            <Grid item xs={6} container alignItems={'center'}>
              <LineItemTitle title={title} />
            </Grid>
            <Grid item xs={6} container>
              {rightComponent}
            </Grid>
          </Grid>
        }
      />
    </ListItem>
  );
}

interface BuiltListItemProps {
  title: string;
  rightComponent: JSX.Element;
}
