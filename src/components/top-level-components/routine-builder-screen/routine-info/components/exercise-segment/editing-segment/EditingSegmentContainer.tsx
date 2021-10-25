import React, { useState } from 'react';
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
import ListItemMessage from './components/base-components/ListItemMessage';
import {
  isCircuitSet,
  isStraightSet,
  isSuperset,
  Segment,
} from 'workout-app-common-core';
import ExerciseListItem from './components/exercise-list-item/ExerciseListItem';
import CircuitIncrementer from './components/inputs/CircuitIncrementer';

export default function EditingSegmentContainer({
  segment,
  doneHandler,
}: EditingSegmentContainerProps): JSX.Element {
  const [circuitExercises, setCircuitExercises] = useState(1);
  const [doneSelectingCircuits, setDoneSelectingCircuits] = useState(false);

  const incrementCircuitExercises = (type: 'add' | 'subtract') => {
    setCircuitExercises((prevState) =>
      type === 'add' ? prevState + 1 : prevState - 1
    );
  };

  const resetCircuit = () => {
    setCircuitExercises(1);
    setDoneSelectingCircuits(false);
  };

  let displayInputs = false;

  const emptySetType = segment.trainingSetTypeId === '';
  const title = `Segment #${segment.order}`;

  const circuitSet = isCircuitSet(segment.trainingSetTypeId);
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
  } else if (circuitSet) {
    displayInputs = segment.exercises.length === circuitExercises;
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
              {circuitSet && (
                <CircuitIncrementer
                  numberOfExercises={circuitExercises}
                  incrementor={incrementCircuitExercises}
                  done={doneSelectingCircuits}
                  doneHandler={() => {
                    setDoneSelectingCircuits(true);
                  }}
                />
              )}

              {circuitSet ? (
                doneSelectingCircuits && (
                  <ExerciseListItem
                    segment={segment}
                    numberOfExercises={circuitExercises}
                  />
                )
              ) : (
                <ExerciseListItem
                  segment={segment}
                  numberOfExercises={circuitExercises}
                />
              )}

              {displayInputs ? (
                <>
                  <Divider variant={'middle'} />
                  <ListItem style={{ marginTop: 16, marginBottom: 16 }}>
                    <SetIncrementer segment={segment} circuitSet={circuitSet} />
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
        <ExerciseInfoCardActions
          segment={segment}
          doneHandler={doneHandler}
          isCircuitSet={circuitSet}
          clearCircuitHandler={resetCircuit}
        />
      )}
    </>
  );
}

interface EditingSegmentContainerProps {
  segment: Segment;
  doneHandler: () => void;
}
