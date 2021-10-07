import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { Grid, IconButton, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const SetIncrementer = (props: SetIncrementerProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container alignItems={'center'} justify={'space-between'}>
      <Grid item xs={6}>
        <Typography color={'textSecondary'}>{'Number of sets: '}</Typography>
      </Grid>
      <Grid item xs={6} container>
        <Grid item>
          <IconButton>
            <RemoveIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography>{'6'}</Typography>
        </Grid>
        <Grid item>
          <IconButton>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export interface SetIncrementerProps {
  DELETE_ME?: undefined;
}

const mapStateToProps = (state: any): SetIncrementerProps => {
  return {} as unknown as SetIncrementerProps;
};

const mapDispatchToProps = (dispatch: Dispatch): SetIncrementerProps =>
  ({} as unknown as SetIncrementerProps);

export default connect(mapStateToProps, mapDispatchToProps)(SetIncrementer);
