import React from 'react';
import {
  List,
  Grid,
  Button,
  ListItem,
  ListItemText,
  ListSubheader,
  SwipeableDrawer,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { State } from '../../../../configs/redux/store';
import muscleGroups, {
  MuscleGroup,
} from '../../../../configs/models/workout-configurations/MuscleGroups';
import { SetTemplate } from '../../../../configs/models/CircuitTemplateDAO';
import { ExerciseTypeVO } from '../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';

const BottomExerciseDialog = (
  props: BottomExerciseDialogProps & PassedInProps
): JSX.Element => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpen(open);
    };

  const groupIds = () => {
    return props.selectedMuscleGroupIds.map((id) => {
      const foundMuscle = muscleGroups.find(
        (group: MuscleGroup) => group.id === id
      );

      const exerciseTypeVOS = props.exerciseTypes.filter(
        (type: ExerciseTypeVO) => {
          if (foundMuscle) {
            return type.muscleGroupIds.find(
              (id: string) => id === foundMuscle.id
            );
          }
        }
      );

      if (foundMuscle) {
        return {
          muscleName: foundMuscle.name,
          bodySection: foundMuscle.bodySection,
          exercises: exerciseTypeVOS,
        };
      }
    });
  };

  return (
    <React.Fragment key={'bottom'}>
      <Button
        disabled={props.selectedMuscleGroupIds.length === 0}
        onClick={toggleDrawer(true)}
      >
        {'View Exercises'}
      </Button>
      <SwipeableDrawer
        anchor={'bottom'}
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Grid container spacing={2} style={{ height: '60vh' }}>
          {groupIds().map((group, index: number) => {
            // todo: come back to subheader and try implementing app bar across dialog
            return (
              <Grid key={index} item xs={3}>
                <List
                  subheader={
                    <ListSubheader
                      component={'div'}
                      id={'nested-list-subheader'}
                    >
                      {group && group.muscleName}
                    </ListSubheader>
                  }
                >
                  {group &&
                    group.exercises.map((exercise: ExerciseTypeVO) => {
                      const foundExercise = props.selectedExercises.find(
                        (set: SetTemplate) => set.exerciseId === exercise.id
                      );
                      return (
                        <ListItem
                          button
                          disabled={foundExercise ? true : false}
                          key={exercise.id}
                          onClick={() => {
                            props.addExerciseHandler(exercise.id);
                          }}
                        >
                          <ListItemText primary={exercise.name} />
                        </ListItem>
                      );
                    })}
                </List>
              </Grid>
            );
          })}
        </Grid>
      </SwipeableDrawer>
    </React.Fragment>
  );
};

export interface BottomExerciseDialogProps {
  exerciseTypes: ExerciseTypeVO[];
  selectedMuscleGroupIds: string[];
}

interface PassedInProps {
  selectedExercises: SetTemplate[];
  addExerciseHandler: (exercise: string) => void;
}

const mapStateToProps = (state: State): BottomExerciseDialogProps => {
  return {
    selectedMuscleGroupIds: state.applicationState.selectedMuscleGroupIds,
    exerciseTypes: state.applicationState.workoutConfigurations.exerciseTypes,
  } as unknown as BottomExerciseDialogProps;
};

const mapDispatchToProps = (): BottomExerciseDialogProps =>
  ({} as unknown as BottomExerciseDialogProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomExerciseDialog);
