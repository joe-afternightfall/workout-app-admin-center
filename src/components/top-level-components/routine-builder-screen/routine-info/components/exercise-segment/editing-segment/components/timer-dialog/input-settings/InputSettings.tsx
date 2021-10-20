import React from 'react';
import {
  List,
  Card,
  Grid,
  Link,
  Divider,
  ListItem,
  Typography,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { WorkoutTimer } from 'workout-app-common-core';
import NewTimerListItem from './components/NewTimerListItem';
import TimerListItemCard from './components/TimerListItemCard';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    cardRoot: {
      paddingTop: 4,
      marginTop: 12,
      marginBottom: 12,
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
  const classes = useStyles();

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
            overflowY: 'scroll',
          }}
        >
          {timers
            .sort((a, b) => a.order - b.order)
            .map((timer, index) => {
              return (
                <Card key={index} className={classes.cardRoot}>
                  {timer.newTimer ? (
                    <NewTimerListItem
                      timer={timer}
                      changeHandler={changeHandler}
                      saveHandler={saveHandler}
                      deleteHandler={deleteHandler}
                    />
                  ) : (
                    <TimerListItemCard
                      timer={timer}
                      deleteHandler={deleteHandler}
                    />
                  )}
                </Card>
              );
            })}
          <ListItem style={{ marginTop: 24, marginBottom: 16 }}>
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
