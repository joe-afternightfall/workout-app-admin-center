import React, { ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import BaseListItem from '../../../base-components/BaseListItem';
import SetIncrementer from '../inputs/SetIncrementer';
import BaseListDivider from '../../../base-components/BaseListDivider';
import RestBetweenDropdown from '../inputs/RestBetweenDropdown';
import { ExerciseVO, Segment } from 'workout-app-common-core';
import { State } from '../../../../../../../configs/redux/store';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { updateSegmentExercise } from '../../../../../../../creators/routine-builder/builder';
import ExerciseSearch from '../inputs/ExerciseSearch';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const ExerciseInfo = ({
  segment,
  exercises,
  selectExerciseHandler,
}: ExerciseInfoProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  const [editingExercise, setEditingExercise] = React.useState(true);
  const [searchBarValue, setSearchBarValue] = React.useState('');
  let selectedExerciseId: string | null = null;
  let exerciseTitle = '';

  exercises.map((exercise) => {
    segment.exercises.map((workoutExercise) => {
      if (workoutExercise.exerciseId === exercise.id) {
        selectedExerciseId = exercise.id;
        exerciseTitle = exercise.name;
      }
    });
  });

  const handleEditClick = (isEditing: boolean): void => {
    if (isEditing) {
      setEditingExercise(true);
    } else {
      setEditingExercise(false);
      selectExerciseHandler(searchBarValue);
    }
  };

  return (
    <>
      <BaseListItem
        title={editingExercise ? 'Select Exercise: ' : exerciseTitle}
        isEditing={editingExercise}
        editClickHandler={handleEditClick}
        component={
          <ExerciseSearch searchBarChangeHandler={setSearchBarValue} />
        }
      />
      {selectedExerciseId &&
        !editingExercise &&
        segment.exercises.map((workoutExercise) => {
          if (workoutExercise.exerciseId === selectedExerciseId) {
            return (
              <>
                <SetIncrementer />
                <BaseListDivider />
                <RestBetweenDropdown
                  value={String(segment.secondsRestBetweenSets)}
                  segmentId={segment.id}
                  type={'Sets'}
                />
                <RestBetweenDropdown
                  value={String(segment.secondsRestBetweenNextSegment)}
                  segmentId={segment.id}
                  type={'Segment'}
                />
              </>
            );
          }
        })}
    </>
  );
};

interface PassedInProps {
  segment: Segment;
}

interface ExerciseInfoProps {
  exercises: ExerciseVO[];
  selectExerciseHandler: (exerciseId: string) => void;
}

const mapStateToProps = (state: State): ExerciseInfoProps => {
  return {
    exercises: state.applicationState.workoutConfigurations.exercises,
  } as unknown as ExerciseInfoProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): ExerciseInfoProps =>
  ({
    selectExerciseHandler: (exerciseId: string) => {
      dispatch(updateSegmentExercise(ownProps.segment.id, exerciseId));
    },
  } as unknown as ExerciseInfoProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseInfo);
