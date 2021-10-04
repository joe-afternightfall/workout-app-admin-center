import {
  phases,
  PhaseVO,
  ExerciseVO,
  TrainingSetType,
  trainingSetTypes,
} from 'workout-app-common-core';
import BaseCard from '../base-components/BaseCard';
import React, { ChangeEvent } from 'react';
import BaseSelectDropdown from '../base-components/BaseSelectDropdown';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid, Box, TextField, Paper } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 200,
    },
  })
);

function buildOptions(exercise: ExerciseVO) {
  const firstLetter = exercise.name[0].toUpperCase();
  return {
    firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
    ...exercise,
  };
}

export default function InfoCard({
  exercises,
  selectedSetId,
  selectedPhaseId,
  activeCardId,
  selectCardHandler,
  phaseChangeHandler,
  setChangeHandler,
  selectedExerciseId,
  selectExerciseHandler,
}: InfoCardProps): JSX.Element {
  const classes = useStyles();
  const cardId = 'info-card';
  const isActive = activeCardId === cardId;
  let phaseTitle = '';
  const options = exercises.map((exercise) => {
    return buildOptions(exercise);
  });
  let defaultValue = null;
  exercises.find((exercise) => {
    if (exercise.id === selectedExerciseId) {
      return (defaultValue = buildOptions(exercise));
    }
  });

  return (
    <BaseCard
      isActive={isActive}
      activeTitleComponent={
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <BaseSelectDropdown
              value={selectedPhaseId}
              label={'Phase'}
              changeHandler={phaseChangeHandler}
              data={phases.map((phase: PhaseVO) => {
                if (phase.id === selectedPhaseId) {
                  phaseTitle = phase.name;
                }
                return {
                  id: phase.id,
                  name: phase.name,
                };
              })}
            />
          </Grid>
        </Grid>
      }
      cardId={cardId}
      selectCardHandler={selectCardHandler}
      baseTitleText={selectedPhaseId ? phaseTitle : 'Untitled Phase'}
      cardContent={
        selectedPhaseId ? (
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
  exercises: ExerciseVO[];
  selectedExerciseId: string | undefined;
  selectedSetId: string | undefined;
  selectedPhaseId: string | undefined;
  setChangeHandler: (id: string) => void;
  selectCardHandler: (id: string) => void;
  phaseChangeHandler: (id: string) => void;
  selectExerciseHandler: (id: string) => void;
}
