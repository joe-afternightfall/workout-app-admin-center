import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { workoutCategories, WorkoutCategoryVO } from 'workout-app-common-core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BaseCard from './BaseCard';
import { State } from '../../../../../configs/redux/store';
import {
  setActiveCard,
  updateRoutineTitle,
  updateSelectedCategoryId,
} from '../../../../../creators/routine-builder/builder';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    formControl: {
      minWidth: 200,
    },
  })
);

const RoutineTitleCard = ({
  routineTitle,
  activeCardId,
  selectCardHandler,
  titleChangeHandler,
  selectedWorkoutCategoryId,
  categoryChangeHandler,
}: RoutineTitleCardProps): JSX.Element => {
  const classes = useStyles();
  const cardId = 'routine-title-card';
  const isActive = activeCardId === cardId;
  let subheader = 'Category';

  console.log('USING_NEW_CONNECTED_TITLE');

  workoutCategories.find((category) => {
    if (category.id === selectedWorkoutCategoryId) {
      subheader = `category: ${category.name}`;
    }
  });

  return (
    <BaseCard
      isActive={isActive}
      cardId={cardId}
      selectCardHandler={selectCardHandler}
      activeTitleComponent={
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
              <InputLabel id={'category-select-label'}>{'Category'}</InputLabel>
              <Select
                labelId={'category-select-label'}
                id={'category-select'}
                value={selectedWorkoutCategoryId}
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
      }
      baseTitleText={routineTitle ? routineTitle : 'Untitled Routine'}
      baseSubheader={isActive ? undefined : subheader}
      actionButton={
        <IconButton aria-label={'phase-settings'}>
          <MoreVertIcon />
        </IconButton>
      }
    />
  );
};

export interface RoutineTitleCardProps {
  routineTitle: string;
  activeCardId: string;
  selectedWorkoutCategoryId: string;
  selectCardHandler: (id: string) => void;
  titleChangeHandler: (value: string) => void;
  categoryChangeHandler: (id: string) => void;
}

const mapStateToProps = (state: State): RoutineTitleCardProps => {
  const builderState = state.routineBuilderState;
  return {
    activeCardId: builderState.activeCardId,
    routineTitle: builderState.selectedRoutine.name,
    selectedWorkoutCategoryId: builderState.selectedRoutine.workoutCategoryId,
  } as unknown as RoutineTitleCardProps;
};

const mapDispatchToProps = (dispatch: Dispatch): RoutineTitleCardProps =>
  ({
    selectCardHandler: (id: string) => {
      dispatch(setActiveCard(id));
    },
    titleChangeHandler: (value: string) => {
      dispatch(updateRoutineTitle(value));
    },
    categoryChangeHandler: (id: string) => {
      dispatch(updateSelectedCategoryId(id));
    },
  } as unknown as RoutineTitleCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(RoutineTitleCard);
