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

export default function InputSettings(): JSX.Element {
  const [timers, setTimers] = useState<NewWorkoutTimer[]>([]);

  const addTimer = () => {
    const newTimers = [
      ...timers,
      {
        newTimer: true,
        id: uuidv4(),
        order: timers.length + 1,
        stepperTitle: '',
        timerMessage: '',
        seconds: 0,
      },
    ];
    setTimers(newTimers);
  };

  const changeHandler = (
    timerId: string,
    type: 'seconds' | 'stepper' | 'timer',
    value: string
  ) => {
    const clonedTimers = ramda.clone(timers);
    const foundTimer = clonedTimers.find((timer) => timer.id === timerId);

    if (foundTimer) {
      switch (type) {
        case 'seconds':
          if (validateForOnlyNumbers(value)) {
            foundTimer.seconds = Number(value);
          }
          break;
        case 'stepper':
          foundTimer.stepperTitle = value;
          break;
        case 'timer':
          foundTimer.timerMessage = value;
          break;
      }
      setTimers(clonedTimers);
    }
  };

  const handleSave = (timerId: string) => {
    const clonedTimers = ramda.clone(timers);
    const foundTimer = clonedTimers.find((timer) => timer.id === timerId);
    if (foundTimer) {
      foundTimer.newTimer = false;
      setTimers(clonedTimers);
    }
  };

  const handleDelete = (timer: NewWorkoutTimer) => {
    const clonedTimers = ramda.clone(timers);
    const foundIndex = clonedTimers.indexOf(timer);
    if (foundIndex) {
      clonedTimers.splice(foundIndex, 1);
      setTimers(clonedTimers);
    }
  };

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
                  saveHandler={handleSave}
                  deleteHandler={handleDelete}
                />
              ) : (
                <TimerListItemCard
                  key={index}
                  timer={timer}
                  deleteHandler={handleDelete}
                />
              );
            })}
          <ListItem style={{ marginTop: 16 }}>
            <ListItemIcon>
              <Typography>{`${timers.length + 1}.`}</Typography>
            </ListItemIcon>
            <ListItemText
              primary={
                <Link style={{ cursor: 'pointer' }} onClick={addTimer}>
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
