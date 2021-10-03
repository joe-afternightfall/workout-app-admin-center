import React from 'react';
import {
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import BaseCard from './BaseCard';
import { phases, PhaseVO } from 'workout-app-common-core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 200,
    },
  })
);

export default function InfoCard({
  phaseId,
  activeCardId,
  selectCardHandler,
  phaseChangeHandler,
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
            <FormControl className={classes.formControl}>
              <InputLabel id={'phase-select-label'}>{'Phase'}</InputLabel>
              <Select
                labelId={'phase-select-label'}
                id={'phase-select'}
                value={phaseId}
                onChange={(
                  e: React.ChangeEvent<{
                    name?: string | undefined;
                    value: unknown;
                  }>
                ) => {
                  phaseChangeHandler(e.target.value as string);
                }}
              >
                {phases.map((phase: PhaseVO, index: number) => {
                  if (phase.id === phaseId) {
                    phaseTitle = phase.name;
                  }
                  return (
                    <MenuItem key={index} value={phase.id}>
                      {phase.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      }
      cardId={cardId}
      selectCardHandler={selectCardHandler}
      baseTitleText={phaseId ? phaseTitle : 'Untitled Phase'}
    />
  );
}

export interface InfoCardProps {
  activeCardId: string;
  phaseId: string | undefined;
  selectCardHandler: (id: string) => void;
  phaseChangeHandler: (id: string) => void;
}
