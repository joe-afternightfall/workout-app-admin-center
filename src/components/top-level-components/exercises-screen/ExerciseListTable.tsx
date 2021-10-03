import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { State } from '../../../configs/redux/store';
import { ExerciseVO } from 'workout-app-common-core';
import muscleGroups, {
  MuscleGroup,
} from '../../../configs/models/workout-configurations/MuscleGroups';
import MaterialTable from 'material-table';
import PageTitle from '../../shared/PageTitle';
import { Button, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const ExerciseListTable = ({
  exercises,
  actionClickHandler,
}: ExerciseListTableProps & PassedInProps): JSX.Element => {
  const classes = useStyles();

  const dummyData = [
    {
      number: 1,
      name: 'First Exercise',
      firebaseId: 'asdf',
      muscle: 'Blah',
      actions: (
        <Grid container>
          <Grid item xs={6}>
            <Button
              onClick={() => {
                alert('edit clicked for first exercise');
              }}
            >
              {'edit'}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => {
                alert('delete clicked for first exercise');
              }}
            >
              {'delete'}
            </Button>
          </Grid>
        </Grid>
      ),
    },
    {
      number: 2,
      name: 'Second Exercise',
      firebaseId: 'asdflkjasdflkj',
      muscle: 'Blah #2',
      actions: (
        <Grid container>
          <Grid item xs={6}>
            <Button
              onClick={() => {
                alert('edit clicked for second exercise');
              }}
            >
              {'edit'}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => {
                alert('delete clicked for second exercise');
              }}
            >
              {'delete'}
            </Button>
          </Grid>
        </Grid>
      ),
    },
  ];

  const data = exercises.map((exercise: ExerciseVO, index: number) => {
    index += 1;
    const foundMuscles: (MuscleGroup | undefined)[] =
      exercise.muscleGroupIds.map((id: string) =>
        muscleGroups.find((muscle: MuscleGroup) => muscle.id === id)
      );

    return {
      number: index,
      name: exercise.name,
      firebaseId: exercise.firebaseId,
      muscle: foundMuscles[0] && foundMuscles[0].name,
      actions: (
        <Grid container>
          <Grid item xs={6}>
            <Button
              onClick={() => {
                alert('edit clicked for ' + exercise.name);
              }}
            >
              {'edit'}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => {
                alert('delete clicked for ' + exercise.name);
              }}
            >
              {'delete'}
            </Button>
          </Grid>
        </Grid>
      ),
    };
  });
  return (
    <MaterialTable
      data={dummyData}
      data-testid={'exercise-list-table'}
      title={<PageTitle title={'Exercises'} />}
      options={{
        pageSize: 6,
        draggable: false,
        pageSizeOptions: [6, 12, 18],
        actionsColumnIndex: -1,
      }}
      columns={[
        {
          title: '#',
          field: 'number',
          editable: 'never',
          cellStyle: {
            width: '10%',
          },
          sorting: false,
        },
        {
          title: 'Exercise',
          field: 'name',
          cellStyle: {
            width: '30%',
          },
        },
        {
          title: 'Muscle Group',
          field: 'muscle',
          cellStyle: {
            width: '20%',
          },
        },
        {
          title: 'Actions',
          field: 'actions',
          headerStyle: {
            textAlign: 'center',
          },
          cellStyle: {
            width: '40%',
            textAlign: 'center',
          },
          sorting: false,
        },
      ]}
      actions={[
        {
          icon: 'add',
          tooltip: 'Add New Exercise',
          isFreeAction: true,
          onClick: () => {
            actionClickHandler(true);
          },
        },
      ]}
    />
  );
};

interface PassedInProps {
  actionClickHandler: (newExercise: boolean) => void;
}

interface ExerciseListTableProps {
  exercises: ExerciseVO[];
}

const mapStateToProps = (state: State): ExerciseListTableProps => {
  return {
    exercises: state.applicationState.workoutConfigurations.exercises,
  } as unknown as ExerciseListTableProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ExerciseListTableProps =>
  ({} as unknown as ExerciseListTableProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseListTable);
