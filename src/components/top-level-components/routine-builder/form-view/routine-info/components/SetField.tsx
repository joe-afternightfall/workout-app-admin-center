import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  isWeightsAndReps,
  isDuration,
  isRepsOnly,
} from 'workout-app-common-core';
import { Grid, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const SetField = ({
  paramTypeId,
}: SetFieldProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  let display = <div />;

  if (isWeightsAndReps(paramTypeId)) {
    display = (
      <Grid container>
        <Grid item xs={6}>
          <TextField fullWidth label={'lb'} variant={'outlined'} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth variant={'outlined'} label={'reps'} />
        </Grid>
      </Grid>
    );
  } else if (isRepsOnly(paramTypeId)) {
    display = (
      <Grid container>
        <Grid item xs={6}>
          <TextField fullWidth variant={'outlined'} label={'reps'} />
        </Grid>
      </Grid>
    );
  } else if (isDuration(paramTypeId)) {
    display = (
      <Grid container>
        <Grid item xs={6}>
          <TextField fullWidth variant={'outlined'} label={'duration'} />
        </Grid>
      </Grid>
    );
  }

  return display;
};

interface PassedInProps {
  paramTypeId: string;
}

interface SetFieldProps {
  DELETE_ME?: undefined;
}

const mapStateToProps = (state: any): SetFieldProps => {
  return {} as unknown as SetFieldProps;
};

const mapDispatchToProps = (dispatch: Dispatch): SetFieldProps =>
  ({} as unknown as SetFieldProps);

export default connect(mapStateToProps, mapDispatchToProps)(SetField);
