import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ExerciseCard from './ExerciseCard';
import { Box, Grid, Paper, List } from '@material-ui/core';
import SetTypeDropdown from '../dropdowns/SetTypeDropdown';
import { isStraightSet, Segment } from 'workout-app-common-core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import BaseListItem from '../BaseListItem';

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
    <Grid item xs={12}>
      <Box className={classes.root}>
        <Paper style={{ padding: 16 }} elevation={0}>
          <List>
            <BaseListItem
              title={'Set Type'}
              component={<SetTypeDropdown segment={segment} />}
            />
            {isStraightSet(segment.trainingSetTypeId) ? (
              <ExerciseCard segment={segment} />
            ) : undefined}
          </List>
        </Paper>
      </Box>
    </Grid>
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
