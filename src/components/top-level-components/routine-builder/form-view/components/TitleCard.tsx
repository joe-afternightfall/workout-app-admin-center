import clsx from 'clsx';
import React from 'react';
import {
  Card,
  Grid,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  CardHeader,
  IconButton,
  FormControl,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { workoutCategories, WorkoutCategoryVO } from 'workout-app-common-core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      borderTop: '10px solid #653bb2',
      borderRadius: '8px 8px 4px 4px',
    },
    activeBorder: {
      borderLeft: '5px solid #4285f4',
    },
    formControl: {
      minWidth: 200,
    },
  })
);

export default function TitleCard({
  routineTitle,
  activeCardId,
  selectHandler,
  workoutCategoryId,
  titleChangeHandler,
  categoryChangeHandler,
}: TitleCardProps): JSX.Element {
  const classes = useStyles();
  const cardId = 'routine-title-card';
  const isActive = activeCardId === cardId;
  let subheader = 'Category';

  workoutCategories.find((category) => {
    if (category.id === workoutCategoryId) {
      subheader = `category: ${category.name}`;
    }
  });

  return (
    <Card
      onClick={() => {
        selectHandler(cardId);
      }}
      raised={isActive}
      className={classes.root}
    >
      <CardHeader
        disableTypography={isActive}
        title={
          isActive ? (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={routineTitle}
                  placeholder={'Title'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    titleChangeHandler(e.target.value);
                  }}
                  variant={'filled'}
                  label={'Routine title'}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel id={'category-select-label'}>
                    {'Category'}
                  </InputLabel>
                  <Select
                    labelId={'category-select-label'}
                    id={'category-select'}
                    value={workoutCategoryId}
                    onChange={(
                      e: React.ChangeEvent<{
                        name?: string | undefined;
                        value: unknown;
                      }>
                    ) => {
                      categoryChangeHandler(e.target.value as string);
                    }}
                  >
                    {workoutCategories.map(
                      (category: WorkoutCategoryVO, index: number) => (
                        <MenuItem key={index} value={category.id}>
                          {category.name}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          ) : routineTitle ? (
            routineTitle
          ) : (
            'Untitled Routine'
          )
        }
        subheader={isActive ? undefined : subheader}
        className={clsx({
          [classes.activeBorder]: isActive,
        })}
        action={
          <IconButton aria-label={'phase-settings'}>
            <MoreVertIcon />
          </IconButton>
        }
      />
    </Card>
  );
}

export interface TitleCardProps {
  activeCardId: string;
  workoutCategoryId: string | undefined;
  routineTitle: string | undefined;
  selectHandler: (id: string) => void;
  titleChangeHandler: (value: string) => void;
  categoryChangeHandler: (id: string) => void;
}
