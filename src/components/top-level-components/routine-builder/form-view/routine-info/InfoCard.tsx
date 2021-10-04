import {
  Phase,
  phases,
  ExerciseVO,
  TrainingSetType,
  trainingSetTypes,
} from 'workout-app-common-core';
import React, { ChangeEvent } from 'react';
import BaseCard from '../base-components/BaseCard';
import PhaseDropdown from './components/PhaseDropdown';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid, Box, TextField, Paper } from '@material-ui/core';
import BaseSelectDropdown from '../base-components/BaseSelectDropdown';

function buildOptions(exercise: ExerciseVO) {
  const firstLetter = exercise.name[0].toUpperCase();
  return {
    firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
    ...exercise,
  };
}

export default function InfoCard({
  phase,
  exercises,
  selectedSetId,
  activeCardId,
  selectCardHandler,
  setChangeHandler,
  selectedExerciseId,
  selectExerciseHandler,
}: InfoCardProps): JSX.Element {
  const cardId = 'info-card';
  const isActive = activeCardId === cardId;
  const options = exercises.map((exercise) => {
    return buildOptions(exercise);
  });
  let defaultValue = null;
  let phaseTitle = 'Untitled Phase';
  exercises.find((exercise) => {
    if (exercise.id === selectedExerciseId) {
      return (defaultValue = buildOptions(exercise));
    }
  });
  phases.find((phaseVO) => {
    if (phaseVO.id === phase.phaseId) {
      phaseTitle = phaseVO.name;
    }
  });

  return (
    <BaseCard
      isActive={isActive}
      activeTitleComponent={
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PhaseDropdown phase={phase} />
          </Grid>
        </Grid>
      }
      cardId={cardId}
      selectCardHandler={selectCardHandler}
      baseTitleText={phaseTitle}
      cardContent={
        phase.phaseId ? (
          <Box
            style={{
              borderRadius: 4,
              backgroundColor: '#EDEDED',
              minHeight: 300,
              padding: 24,
            }}
          >
            <Paper style={{ padding: 16 }} elevation={0}>
              <Grid container>
                <Grid item xs={12}>
                  <BaseSelectDropdown
                    value={selectedSetId}
                    label={'Set Type'}
                    changeHandler={setChangeHandler}
                    data={trainingSetTypes.map((set: TrainingSetType) => {
                      return {
                        id: set.id,
                        name: set.name,
                      };
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    fullWidth
                    value={defaultValue}
                    id={'set-exercise'}
                    options={options.sort(
                      (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                    )}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={'Exercise'}
                        variant={'outlined'}
                      />
                    )}
                    onChange={(
                      e: ChangeEvent<Record<string, never>>,
                      newValue
                    ) => {
                      newValue && selectExerciseHandler(newValue.id);
                    }}
                    getOptionSelected={(option, value) =>
                      option.id === value.id
                    }
                  />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        ) : undefined
      }
    />
  );
}

export interface InfoCardProps {
  activeCardId: string;
  phase: Phase;
  exercises: ExerciseVO[];
  selectedExerciseId: string | undefined;
  selectedSetId: string | undefined;
  setChangeHandler: (id: string) => void;
  selectCardHandler: (id: string) => void;
  selectExerciseHandler: (id: string) => void;
}
