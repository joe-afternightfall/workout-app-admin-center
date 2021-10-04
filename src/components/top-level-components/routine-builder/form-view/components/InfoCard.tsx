import React from 'react';
import { Grid, Box, TextField, Paper } from '@material-ui/core';
import BaseCard from './BaseCard';
import {
  phases,
  PhaseVO,
  TrainingSetType,
  trainingSetTypes,
} from 'workout-app-common-core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import BaseSelectDropdown from './BaseSelectDropdown';

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 200,
    },
  })
);

export default function InfoCard({
  selectedSetId,
  selectedPhaseId,
  activeCardId,
  selectCardHandler,
  phaseChangeHandler,
  setChangeHandler,
}: InfoCardProps): JSX.Element {
  const classes = useStyles();
  const cardId = 'info-card';
  const isActive = activeCardId === cardId;
  let phaseTitle = '';

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
                {/*<Grid item xs={12}>*/}
                {/*  <TextField placeholder={'Set Type'} />*/}
                {/*</Grid>*/}
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
  selectedSetId: string | undefined;
  selectedPhaseId: string | undefined;
  setChangeHandler: (id: string) => void;
  selectCardHandler: (id: string) => void;
  phaseChangeHandler: (id: string) => void;
}
