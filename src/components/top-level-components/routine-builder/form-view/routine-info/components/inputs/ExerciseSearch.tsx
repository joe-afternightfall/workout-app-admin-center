import React, { ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { ExerciseVO, Segment } from 'workout-app-common-core';
import { State } from '../../../../../../../configs/redux/store';
import { updateSegmentExercise } from '../../../../../../../creators/routine-builder/builder';
import SetIncrementer from '../inputs/SetIncrementer';
import RestBetweenDropdown from '../inputs/RestBetweenDropdown';
import BaseListItem from '../../../base-components/BaseListItem';
import BaseListDivider from '../../../base-components/BaseListDivider';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const ExerciseSearch = ({
  exercises,
  searchBarChangeHandler,
}: ExerciseSearchProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  // const [editingExercise, setEditingExercise] = React.useState(true);
  // const [searchBarValue, setSearchBarValue] = React.useState('');
  // let selectedExercise: ExerciseVO | undefined = undefined;
  // let selectedExerciseId = '';
  // let exerciseTitle = '';

  // exercises.map((exercise) => {
  //   segment.exercises.find((workoutExercise) => {
  //     if (workoutExercise.exerciseId === exercise.id) {
  //       selectedExerciseId = exercise.id;
  //       exerciseTitle = exercise.name;
  //       return (selectedExercise = exercise);
  //     }
  //   });
  // });

  // const handleEditClick = (isEditing: boolean): void => {
  //   if (isEditing) {
  //     setEditingExercise(true);
  //   } else {
  //     setEditingExercise(false);
  //     selectExerciseHandler(searchBarValue);
  //   }
  // };

  return (
    <>
      <Autocomplete
        fullWidth
        // value={defaultValue}
        id={`${uuidv4()}-exercise-menu`}
        options={exercises}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label={'Exercise'} variant={'outlined'} />
        )}
        onChange={(e: ChangeEvent<Record<string, never>>, newValue) => {
          newValue && searchBarChangeHandler(newValue.id);
        }}
        getOptionSelected={(option, value) => option.id === value.id}
      />
      {/*<BaseListItem*/}
      {/*  title={editingExercise ? 'Select Exercise: ' : exerciseTitle}*/}
      {/*  isEditing={editingExercise}*/}
      {/*  editClickHandler={handleEditClick}*/}
      {/*  component={*/}
      {/*    <Autocomplete*/}
      {/*      fullWidth*/}
      {/*      // value={defaultValue}*/}
      {/*      id={`${segment.id}-exercise-menu`}*/}
      {/*      options={exercises}*/}
      {/*      getOptionLabel={(option) => option.name}*/}
      {/*      renderInput={(params) => (*/}
      {/*        <TextField {...params} label={'Exercise'} variant={'outlined'} />*/}
      {/*      )}*/}
      {/*      onChange={(e: ChangeEvent<Record<string, never>>, newValue) => {*/}
      {/*        newValue && setSearchBarValue(newValue.id);*/}
      {/*      }}*/}
      {/*      getOptionSelected={(option, value) => option.id === value.id}*/}
      {/*    />*/}
      {/*  }*/}
      {/*/>*/}
      {/*{selectedExercise &&*/}
      {/*  !editingExercise &&*/}
      {/*  segment.exercises.map((workoutExercise) => {*/}
      {/*    if (workoutExercise.exerciseId === selectedExerciseId) {*/}
      {/*      return (*/}
      {/*        <>*/}
      {/*          <SetIncrementer />*/}
      {/*          <BaseListDivider />*/}
      {/*          <RestBetweenDropdown*/}
      {/*            value={String(segment.secondsRestBetweenSets)}*/}
      {/*            segmentId={segment.id}*/}
      {/*            type={'Sets'}*/}
      {/*          />*/}
      {/*          <RestBetweenDropdown*/}
      {/*            value={String(segment.secondsRestBetweenNextSegment)}*/}
      {/*            segmentId={segment.id}*/}
      {/*            type={'Segment'}*/}
      {/*          />*/}
      {/*        </>*/}
      {/*      );*/}
      {/*    }*/}
      {/*  })}*/}
    </>
  );
};

interface PassedInProps {
  searchBarChangeHandler: (value: string) => void;
}

interface ExerciseSearchProps {
  exercises: ExerciseVO[];
}

const mapStateToProps = (state: State): ExerciseSearchProps => {
  return {
    exercises: state.applicationState.workoutConfigurations.exercises,
  } as unknown as ExerciseSearchProps;
};

const mapDispatchToProps = (): ExerciseSearchProps =>
  ({} as unknown as ExerciseSearchProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseSearch);
