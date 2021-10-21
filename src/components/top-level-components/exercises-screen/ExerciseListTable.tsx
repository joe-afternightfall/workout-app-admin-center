import React from 'react';
import { Dispatch } from 'redux';
import {
  ExerciseVO,
  MuscleGroup,
  muscleGroups,
  getParameterTypeName,
} from 'workout-app-common-core';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import PageTitle from '../../shared/PageTitle';
import { Button, Grid } from '@material-ui/core';
import { State } from '../../../configs/redux/store';
import {
  openNewExerciseFormDialog,
  openEditingExerciseFormDialog,
} from '../../../creators/exercise-form/exercise-form';
import DeleteExerciseDialog from './DeleteExerciseDialog';

const ExerciseListTable = (props: ExerciseListTableProps): JSX.Element => {
  const { exercises } = props;

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
      paramName: getParameterTypeName(exercise.parameterTypeId),
      actions: (
        <Grid container>
          <Grid item xs={6}>
            <Button
              onClick={() => {
                props.openEditDialogHandler(exercise);
              }}
            >
              {'Edit'}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <DeleteExerciseDialog exercise={exercise} />
          </Grid>
        </Grid>
      ),
    };
  });
  return (
    <MaterialTable
      data={data}
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
          title: 'Param Type',
          field: 'paramName',
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
            width: '20%',
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
          onClick: props.openNewDialogHandler,
        },
      ]}
    />
  );
};

interface ExerciseListTableProps {
  exercises: ExerciseVO[];
  openNewDialogHandler: () => void;
  openEditDialogHandler: (exercise: ExerciseVO) => void;
}

const mapStateToProps = (state: State): ExerciseListTableProps => {
  return {
    exercises: state.applicationState.workoutConfigurations.exercises,
  } as unknown as ExerciseListTableProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ExerciseListTableProps =>
  ({
    openEditDialogHandler: (exercise: ExerciseVO) => {
      dispatch(openEditingExerciseFormDialog(exercise));
    },
    openNewDialogHandler: () => {
      dispatch(openNewExerciseFormDialog());
    },
  } as unknown as ExerciseListTableProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseListTable);
