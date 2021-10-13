import React from 'react';
import {
  List,
  Divider,
  ListItem,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core';
import ExerciseInfoCardActions from './EditingInfoCardActions';
import SetIncrementer from './components/inputs/SetIncrementer';
import SetTypeDropdown from './components/inputs/SetTypeHeader';
import RestBetweenOptions from './components/inputs/RestBetweenOptions';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ListItemMessage from './components/base-components/ListItemMessage';
import { isStraightSet, isSuperset, Segment } from 'workout-app-common-core';
import ExerciseListItem from './components/exercise-list-item/ExerciseListItem';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default function EditingSegmentContainer({
  segment,
  doneHandler,
}: EditingSegmentContainerProps): JSX.Element {
  let displayInputs = false;

  const emptySetType = segment.trainingSetTypeId === '';
  const title = `Segment #${segment.order}`;

  if (isSuperset(segment.trainingSetTypeId)) {
    if (
      segment.exercises[0] &&
      segment.exercises[0].exerciseId !== '' &&
      segment.exercises[1] &&
      segment.exercises[1].exerciseId !== ''
    ) {
      displayInputs = true;
    }
  } else if (isStraightSet(segment.trainingSetTypeId)) {
    if (segment.exercises[0] && segment.exercises[0].exerciseId !== '') {
      displayInputs = true;
    }
  }

  return (
    <>
      <CardHeader
        disableTypography={emptySetType}
        title={
          <Typography variant={'h6'} color={'textSecondary'}>
            {title}
          </Typography>
        }
        subheader={<SetTypeDropdown segment={segment} />}
      />
      <CardContent>
        <List>
          <Divider variant={'middle'} style={{ marginBottom: 12 }} />
          {emptySetType ? (
            <ListItemMessage message={'select a set type to continue'} />
          ) : (
            <>
              <ExerciseListItem segment={segment} />

              {displayInputs ? (
                <>
                  <Divider variant={'middle'} />
                  <ListItem style={{ marginTop: 16, marginBottom: 16 }}>
                    <SetIncrementer segment={segment} />
                  </ListItem>
                  <ListItem>
                    <RestBetweenOptions
                      segmentId={segment.id}
                      restBetweenNextSegmentValue={
                        segment.secondsRestBetweenNextSegment
                      }
                      restBetweenSetValue={segment.secondsRestBetweenSets}
                    />
                  </ListItem>
                </>
              ) : (
                <>
                  <Divider variant={'middle'} style={{ marginTop: 12 }} />
                  <ListItemMessage message={'select exercises to continue'} />
                </>
              )}
            </>
          )}
        </List>
      </CardContent>
      {!emptySetType && (
        <ExerciseInfoCardActions segment={segment} doneHandler={doneHandler} />
      )}
    </>
  );
}

interface EditingSegmentContainerProps {
  segment: Segment;
  doneHandler: () => void;
}
