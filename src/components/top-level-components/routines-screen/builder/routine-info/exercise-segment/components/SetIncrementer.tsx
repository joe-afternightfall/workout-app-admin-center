import React from 'react';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

const SetIncrementer = (props: SetIncrementerProps): JSX.Element => {
  return (
    <Grid container justify={'center'} alignItems={'center'}>
      <Grid item xs={6}>
        <Typography variant={'subtitle1'} color={'textSecondary'}>
          {'Number of sets'}
        </Typography>
      </Grid>
      <Grid item xs={6} container alignItems={'center'} justify={'flex-end'}>
        <Grid item>
          <IconButton>
            <RemoveIcon />
          </IconButton>
        </Grid>
        <Grid item xs={3} container justify={'center'}>
          <Typography variant={'h6'}>{'6'}</Typography>
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
