import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { workoutCategories, WorkoutCategoryVO } from 'workout-app-common-core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BaseCard from '../base-components/BaseCard';
import { State } from '../../../../../configs/redux/store';
import {
  updateRoutineTitle,
  updateSelectedCategoryId,
} from '../../../../../creators/routine-builder/builder';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    formControl: {
      minWidth: 200,
    },
  })
);

const RoutineTitleCard = ({
  editHandler,
  isEditing,
  routineTitle,
  activeCardId,
  titleChangeHandler,
  selectedWorkoutCategoryId,
  categoryChangeHandler,
}: RoutineTitleCardProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  const cardId = 'routine-title-card';
  const isActive = activeCardId === cardId;
  let subheader = 'Category';

  workoutCategories.find((category) => {
    if (category.id === selectedWorkoutCategoryId) {
      subheader = `category: ${category.name}`;
    }
  });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <BaseCard
      cardId={cardId}
      titleText={routineTitle ? routineTitle : 'Untitled Routine'}
      isSelectedCard={isActive}
      isEditing={isEditing}
      doneClickHandler={() => {
        editHandler(false);
      }}
      editingTitleComponent={
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
      subheader={isEditing ? undefined : subheader}
      actionButton={
        <div>
          <IconButton color={'inherit'} onClick={handleMenu}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id={'routine-menu'}
            open={open}
            keepMounted
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            anchorEl={anchorEl}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                editHandler(true);
              }}
            >
              {'Edit'}
            </MenuItem>
            <MenuItem onClick={handleClose}>{'Add Phase'}</MenuItem>
          </Menu>
        </div>
      }
    />
  );
};

interface PassedInProps {
  isEditing: boolean;
  editHandler: (editing: boolean) => void;
}

export interface RoutineTitleCardProps {
  routineTitle: string;
  activeCardId: string;
  selectedWorkoutCategoryId: string;
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
    titleChangeHandler: (value: string) => {
      dispatch(updateRoutineTitle(value));
    },
    categoryChangeHandler: (id: string) => {
      dispatch(updateSelectedCategoryId(id));
    },
  } as unknown as RoutineTitleCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(RoutineTitleCard);
