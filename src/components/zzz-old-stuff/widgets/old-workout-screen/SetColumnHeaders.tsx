import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SetType } from '../../../../configs/zzz-old-stuff/old-models/ExerciseTypeDAO';

export default function SetColumnHeaders(props: SetTitleProps): JSX.Element {
  let displayComponent: JSX.Element;

  switch (props.setType) {
    case SetType.TIME_AND_REPS:
      displayComponent = (
        <>
          <Grid item xs={props.displayAction ? 3 : 5}>
            <Typography>{'time'}</Typography>
          </Grid>

          <Grid item xs={props.displayAction ? 3 : 5}>
            <Typography>{'reps'}</Typography>
          </Grid>
        </>
      );
      break;
    case SetType.TIME:
      displayComponent = (
        <Grid item xs={props.displayAction ? 6 : 5}>
          <Typography>{'time'}</Typography>
        </Grid>
      );
      break;
    case SetType.TIME_AND_DISTANCE:
      displayComponent = (
        <>
          <Grid item xs={props.displayAction ? 3 : 5}>
            <Typography>{'time'}</Typography>
          </Grid>

          <Grid item xs={props.displayAction ? 3 : 5}>
            <Typography>{'distance'}</Typography>
          </Grid>
        </>
      );
      break;
    case SetType.WEIGHTS:
      displayComponent = (
        <>
          <Grid item xs={props.displayAction ? 3 : 5}>
            <Typography>{'lbs'}</Typography>
          </Grid>
          <Grid item xs={props.displayAction ? 3 : 5}>
            <Typography>{'reps'}</Typography>
          </Grid>
        </>
      );
      break;
    case SetType.REPS:
      displayComponent = (
        <Grid item xs={props.displayAction ? 6 : 5}>
          <Typography>{'reps'}</Typography>
        </Grid>
      );
      break;
    default:
      return <div />;
  }

  return (
    <Grid item xs={12} container>
      <Grid item xs={2}>
        <Typography>{'set'}</Typography>
      </Grid>

      {displayComponent}

      {props.displayAction ? (
        <Grid item xs={4} container justify={'center'} spacing={2}>
          <Grid item>
            <Typography>{'Action'}</Typography>
          </Grid>
        </Grid>
      ) : (
        <React.Fragment />
      )}
    </Grid>
  );
}

interface SetTitleProps {
  setType: SetType;
  displayAction: boolean;
}
