import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ExerciseSearch from '../inputs/ExerciseSearch';
import { IconButton, Box, Grid, Paper, List } from '@material-ui/core';
import SetTypeDropdown from '../inputs/SetTypeDropdown';
import { isStraightSet, Segment } from 'workout-app-common-core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import BaseListItem from '../../../base-components/BaseListItem';
import BaseListDivider from '../../../base-components/BaseListDivider';
import { getSetTypeName } from '../../../../../../../utils/name-finder';

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
  const [editSetType, setEditSetType] = React.useState<boolean>(true);

  const title = editSetType
    ? 'Select Set Type'
    : getSetTypeName(segment.trainingSetTypeId);

  return (
    <Grid item xs={12}>
      <Box className={classes.root}>
        <Paper style={{ padding: 16 }} elevation={0}>
          <List>
            <BaseListItem
              title={title}
              isEditing={editSetType}
              component={<SetTypeDropdown segment={segment} />}
              editClickHandler={setEditSetType}
            />
            <BaseListDivider />
            {isStraightSet(segment.trainingSetTypeId) ? (
              <ExerciseSearch segment={segment} />
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
