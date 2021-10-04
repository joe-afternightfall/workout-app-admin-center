import React from 'react';
import { Grid } from '@material-ui/core';
import InfoCard from './components/InfoCard';
import TitleCard from './components/TitleCard';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

export default function RoutineFormView(
  props: RoutineFormViewProps
): JSX.Element {
  const classes = useStyles();
  const [activeCardId, setActiveCardId] = React.useState('');
  const [selectedPhaseId, setSelectedPhaseId] = React.useState<
    string | undefined
  >(undefined);
  const [selectedSetId, setSelectedSetId] = React.useState<string | undefined>(
    undefined
  );
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
}

export interface RoutineFormViewProps {
  DELETE_ME?: undefined;
}
