import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import React, { ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';
import PageTitle from '../../../shared/PageTitle';
import NewExerciseDialog from './NewExerciseDialog';
import { State } from '../../../../configs/redux/store';
import { deleteExerciseType } from '../../../../services/workout-configurations/exercise-types-service';
import { ExerciseTypeVO } from '../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';
import muscleGroups, {
  MuscleGroup,
} from '../../../../configs/models/workout-configurations/MuscleGroups';

const editField = (props: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <TextField
      value={props.value}
      data-testid={'edit-url-text-field'}
      onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
        props.onChange(e.target.value)
      }
    />
  );
};

// todo: come back
// interface CategoryTypesObject {
//   [key: string]: string;
// }

const ExerciseTypesTable = (props: ExerciseTableProps): JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const data = props.exerciseTypes.map(
    (exercise: ExerciseTypeVO, index: number) => {
      index += 1;

      const foundMuscles: (MuscleGroup | undefined)[] =
        exercise.muscleGroupIds.map((id: string) =>
          muscleGroups.find((muscle: MuscleGroup) => muscle.id === id)
        );

      return {
        number: index,
        exercise: exercise.name,
        firebaseId: exercise.firebaseId,
        muscleGroup: foundMuscles[0],
        setType: exercise.setType && exercise.setType,
      };
    }
  );

  // todo: add back when getting to multiple muscle groups
  // const categoryTypes = muscleGroups.reduce(
  //   (obj: CategoryTypesObject, muscle: MuscleGroup) => {
  //     obj[muscle.id] = muscle.name;
  //     return obj;
  //   },
  //   {}
  // );

  return (
    <>
      <NewExerciseDialog
        open={open}
        closeClickHandler={closeDialog}
        selectedMuscleGroupIds={props.selectedMuscleGroupIds}
      />

      <MaterialTable
        data={data}
        data-testid={'exercise-table'}
        title={<PageTitle title={'Exercise List'} />}
        options={{
          pageSize: 6,
          draggable: false,
          pageSizeOptions: [6, 12, 18],
          actionsColumnIndex: -1,
        }}
        // todo: create custom "edit" component to select multiple muscle groups
        editable={{
          // onRowUpdate: (rowData): Promise<void> =>
          //   new Promise((resolve) => {
          //     if (rowData.categoryId) {
          //       updateExerciseType(
          //         rowData.firebaseId,
          //         rowData.exercise,
          //         rowData.categoryId,
          //         rowData.setType
          //       ).then(() => {
          //         setTimeout(() => {
          //           resolve();
          //         }, 1500);
          //       });
          //     }
          //   }),
          onRowDelete: (rowData): Promise<void> =>
            new Promise((resolve) => {
              deleteExerciseType(rowData.firebaseId).then(() => {
                setTimeout(() => {
                  resolve();
                }, 1500);
              });
            }),
        }}
        columns={[
          {
            title: '#',
            field: 'number',
            editable: 'never',
            cellStyle: {
              width: '10%',
            },
          },
          {
            title: 'Exercise',
            field: 'exercise',
            cellStyle: {
              width: '30%',
            },
            editComponent: editField,
          },
          {
            title: 'Part of Body',
            field: 'muscleGroup.bodySection',
            cellStyle: {
              width: '20%',
            },
            // lookup: categoryTypes,
          },
          {
            title: 'Muscle Group',
            field: 'muscleGroup.name',
            cellStyle: {
              width: '20%',
            },
            // lookup: categoryTypes,
          },
          {
            title: 'Set Type',
            field: 'setType',
            cellStyle: {
              width: '20%',
            },
            // todo: make this object dynamic using SetType
            lookup: {
              time: 'time',
              weights: 'weights',
              ['time-and-distance']: 'time-and-distance',
              ['time-and-reps']: 'time-and-reps',
              reps: 'reps',
            },
          },
        ]}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add New Exercise',
            isFreeAction: true,
            onClick: () => {
              openDialog();
            },
          },
        ]}
      />
    </>
  );
};

export interface ExerciseTableProps {
  exerciseTypes: ExerciseTypeVO[];
  selectedMuscleGroupIds: string[];
}

const mapStateToProps = (state: State): ExerciseTableProps => {
  return {
    selectedMuscleGroupIds: state.applicationState.selectedMuscleGroupIds,
    exerciseTypes: state.applicationState.workoutConfigurations.exerciseTypes,
  } as unknown as ExerciseTableProps;
};

const mapDispatchToProps = (): ExerciseTableProps =>
  ({} as unknown as ExerciseTableProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseTypesTable);
