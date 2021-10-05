import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ExerciseCard from './ExerciseCard';
import { Box, Grid, Paper } from '@material-ui/core';
import SetTypeDropdown from '../dropdowns/SetTypeDropdown';
import { isStraightSet, Segment } from 'workout-app-common-core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      borderRadius: 4,
      backgroundColor: '#EDEDED',
      minHeight: 300,
      padding: 24,
    },
  })
);

const SegmentCard = ({
  segment,
}: SegmentCardProps & PassedInProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Paper style={{ padding: 16 }} elevation={0}>
        <Grid container>
          <Grid item xs={12}>
            <SetTypeDropdown segment={segment} />
          </Grid>
          {isStraightSet(segment.trainingSetTypeId) ? (
            <ExerciseCard segment={segment} />
          ) : undefined}
        </Grid>
      </Paper>
    </Box>
  );
};

interface PassedInProps {
  segment: Segment;
}

export interface SegmentCardProps {
  DELETE_ME?: undefined;
}

const mapStateToProps = (state: any): SegmentCardProps => {
  return {} as unknown as SegmentCardProps;
};

const mapDispatchToProps = (dispatch: Dispatch): SegmentCardProps =>
  ({} as unknown as SegmentCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(SegmentCard);
