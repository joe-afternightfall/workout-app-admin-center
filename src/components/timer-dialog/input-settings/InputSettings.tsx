import React, { useState } from 'react';
import {
  List,
  Card,
  Grid,
  Divider,
  ListItem,
  Typography,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Link,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { validateForOnlyNumbers, WorkoutTimer } from 'workout-app-common-core';
import TimerListItemCard from './components/TimerListItemCard';
import { v4 as uuidv4 } from 'uuid';
import * as ramda from 'ramda';
import NewTimerListItem from './components/NewTimerListItem';

const useStyles = makeStyles(() =>
  createStyles({
    contentWrapper: {
      minHeight: '30vh',
      height: '100%',
      textAlign: 'center',
      paddingBottom: 16,
    },
    dialogTitle: {
      padding: '16px 0',
    },
  })
);

export interface NewWorkoutTimer extends WorkoutTimer {
  newTimer: boolean;
}

export default function InputSettings({
  timers,
  saveHandler,
  changeHandler,
  deleteHandler,
  addTimerHandler,
}: InputSettingsProps): JSX.Element {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>{'Configure timer settings below'}</Typography>
        <Divider orientation={'horizontal'} variant={'middle'} />
      </Grid>
      <Grid item xs={12}>
        <List
          style={{
            backgroundColor: '#ececec',
            borderRadius: 6,
            paddingLeft: 12,
            paddingRight: 12,
            minHeight: '50vh',
            maxHeight: '65vh',
          }}
        >
          {timers
            .sort((a, b) => a.order - b.order)
            .map((timer, index) => {
              return timer.newTimer ? (
                <NewTimerListItem
                  key={index}
                  timer={timer}
                  changeHandler={changeHandler}
                  saveHandler={saveHandler}
                  deleteHandler={deleteHandler}
                />
              ) : (
                <TimerListItemCard
                  key={index}
                  timer={timer}
                  deleteHandler={deleteHandler}
                />
              );
            })}
          <ListItem style={{ marginTop: 16 }}>
            <ListItemIcon>
              <Typography>{`${timers.length + 1}.`}</Typography>
            </ListItemIcon>
            <ListItemText
              primary={
                <Link style={{ cursor: 'pointer' }} onClick={addTimerHandler}>
                  {'Click to add'}
                </Link>
              }
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}

interface InputSettingsProps {
  timers: NewWorkoutTimer[];
  addTimerHandler: () => void;
  changeHandler: (
    timerId: string,
    type: 'seconds' | 'stepper' | 'timer',
    value: string
  ) => void;
  saveHandler: (timerId: string) => void;
  deleteHandler: (timer: NewWorkoutTimer) => void;
}
