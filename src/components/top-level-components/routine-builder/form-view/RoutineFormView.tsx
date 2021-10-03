import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TitleCard from './components/TitleCard';

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
        <Card
          onClick={() => {
            selectCard('set-type-card');
          }}
          raised={activeCardId === 'set-type-card'}
        >
          <CardHeader
            disableTypography
            title={<Typography>{'Set Type'}</Typography>}
            action={
              <IconButton aria-label={'phase-settings'}>
                <MoreVertIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Card>
              <CardHeader
                disableTypography
                title={<Typography>{'Exercise #1'}</Typography>}
                action={
                  <IconButton aria-label={'phase-settings'}>
                    <MoreVertIcon />
                  </IconButton>
                }
              />
            </Card>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export interface RoutineFormViewProps {
  DELETE_ME?: undefined;
}
