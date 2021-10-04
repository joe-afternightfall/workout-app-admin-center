import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import InfoCard from './components/InfoCard';
import TitleCard from './components/TitleCard';
import { State } from '../../../../configs/redux/store';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ExerciseVO } from 'workout-app-common-core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

const RoutineFormView = ({ exercises }: RoutineFormViewProps): JSX.Element => {
  const classes = useStyles();
  const [activeCardId, setActiveCardId] = React.useState('');
  const [selectedPhaseId, setSelectedPhaseId] = React.useState<
    string | undefined
  >(undefined);
  const [selectedSetId, setSelectedSetId] = React.useState<string | undefined>(
    undefined
  );
  const [selectedExerciseId, setSelectedExerciseId] = React.useState<
    string | undefined
  >(undefined);

  const [routineTitle, setRoutineTitle] = React.useState<string | undefined>(
    undefined
  );
  const [workoutCategoryId, setWorkoutCategoryId] = React.useState<
    string | undefined
  >(undefined);

  const selectCard = (cardId: string) => {
    setActiveCardId(cardId);
  };

  const handleTitleChange = (value: string) => {
    setRoutineTitle(value);
  };

  const handleCategoryChange = (id: string) => {
    setWorkoutCategoryId(id);
  };

  const handlePhaseChange = (id: string) => {
    setSelectedPhaseId(id);
  };

  const handleSetChange = (id: string) => {
    setSelectedSetId(id);
  };

  const handleSelectExercise = (id: string) => {
    setSelectedExerciseId(id);
  };

  return (
    <Grid item xs={7} container spacing={2}>
      <Grid item xs={12}>
        <TitleCard
          routineTitle={routineTitle}
          workoutCategoryId={workoutCategoryId}
          activeCardId={activeCardId}
          selectHandler={selectCard}
          titleChangeHandler={handleTitleChange}
          categoryChangeHandler={handleCategoryChange}
        />
      </Grid>

      <Grid item xs={12}>
        <InfoCard
          exercises={exercises}
          selectedExerciseId={selectedExerciseId}
          selectExerciseHandler={handleSelectExercise}
          selectedPhaseId={selectedPhaseId}
          selectedSetId={selectedSetId}
          activeCardId={activeCardId}
          selectCardHandler={selectCard}
          setChangeHandler={handleSetChange}
          phaseChangeHandler={handlePhaseChange}
        />
      </Grid>
    </Grid>
  );
};

export interface RoutineFormViewProps {
  exercises: ExerciseVO[];
}

const mapStateToProps = (state: State): RoutineFormViewProps => {
  return {
    exercises: state.applicationState.workoutConfigurations.exercises,
  } as unknown as RoutineFormViewProps;
};

const mapDispatchToProps = (dispatch: Dispatch): RoutineFormViewProps =>
  ({} as unknown as RoutineFormViewProps);

export default connect(mapStateToProps, mapDispatchToProps)(RoutineFormView);
