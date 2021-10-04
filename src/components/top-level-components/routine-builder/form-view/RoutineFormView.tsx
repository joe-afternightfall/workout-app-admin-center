import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { ExerciseVO } from 'workout-app-common-core';
import { State } from '../../../../configs/redux/store';
import InfoCard from './components/routine-info/InfoCard';
import RoutineTitleCard from './components/RoutineTitleCard';
import { createStyles, makeStyles } from '@material-ui/core/styles';

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

  const selectCard = (cardId: string) => {
    setActiveCardId(cardId);
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
        <RoutineTitleCard />
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
