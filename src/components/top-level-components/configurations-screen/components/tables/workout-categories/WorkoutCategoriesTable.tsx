import { connect } from 'react-redux';
import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { WorkoutCategoryVO } from 'workout-app-common-core';
import PageTitle from '../../../../../shared/PageTitle';
import { State } from '../../../../../../configs/redux/store';
import TableActionButtons from '../TableActionButtons';
import WorkoutCategoriesDialog from './WorkoutCategoriesDialog';
import { deActivateWorkoutCategory } from '../../../../../../services/workout-configurations/workout-categories-service';

const WorkoutCategoriesTable = (
  props: WorkoutCategoriesTableProps
): JSX.Element => {
  const { workoutCategories } = props;
  const [open, setOpen] = useState(false);
  const [newWorkoutCategory, setNewWorkoutCategory] = useState(false);
  const [selectedWorkoutCategory, setSelectedWorkoutCategory] =
    useState<WorkoutCategoryVO | null>(null);

  const closeDialog = () => {
    setOpen(false);
    setNewWorkoutCategory(!newWorkoutCategory);
    setSelectedWorkoutCategory(null);
  };

  const openDialog = (
    isNew: boolean,
    workoutCategory: WorkoutCategoryVO | null
  ) => {
    setOpen(true);
    setNewWorkoutCategory(isNew);
    setSelectedWorkoutCategory(workoutCategory);
  };

  const data = workoutCategories.map((workoutCategory, index) => {
    index += 1;
    return {
      number: index,
      name: workoutCategory.name,
      color: workoutCategory.color,
      numberOfGroups: workoutCategory.manikinMuscleGroupIds.length,
      actions: (
        <TableActionButtons
          deActivateHighlight={workoutCategory.name}
          editClickHandler={() => openDialog(false, workoutCategory)}
          deActivateClickHandler={() => {
            props.deActivateClickHandler(workoutCategory.firebaseId);
          }}
        />
      ),
    };
  });

  return (
    <>
      <WorkoutCategoriesDialog
        open={open}
        newWorkoutCategory={newWorkoutCategory}
        closeDialogHandler={closeDialog}
        selectedWorkoutCategory={selectedWorkoutCategory}
      />
      <MaterialTable
        data={data}
        style={{ width: '100%' }}
        data-testid={'workout-categories-table'}
        title={<PageTitle title={'Workout Categories'} />}
        options={{
          pageSize: 8,
          draggable: false,
          pageSizeOptions: [8, 12, 16, 24],
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
          },
          {
            title: 'Name',
            field: 'name',
            editable: 'never',
            cellStyle: {
              width: '30%',
            },
          },
          {
            title: 'Color',
            field: 'color',
            editable: 'never',
            sorting: false,
            headerStyle: {
              width: '20%',
              textAlign: 'center',
            },
            cellStyle: {
              width: '20%',
              textAlign: 'center',
            },
          },
          {
            title: 'Muscle Groups',
            field: 'numberOfGroups',
            editable: 'never',
            sorting: false,
            headerStyle: {
              width: '20%',
              textAlign: 'center',
            },
            cellStyle: {
              width: '20%',
              textAlign: 'center',
            },
          },
          {
            title: 'Actions',
            field: 'actions',
            editable: 'never',
            sorting: false,
            headerStyle: {
              width: '20%',
              textAlign: 'center',
            },
            cellStyle: {
              width: '20%',
              textAlign: 'center',
            },
          },
        ]}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add New Workout Category',
            isFreeAction: true,
            onClick: () => {
              openDialog(true, null);
            },
          },
        ]}
      />
    </>
  );
};

interface WorkoutCategoriesTableProps {
  workoutCategories: WorkoutCategoryVO[];
  deActivateClickHandler: (firebaseId: string) => void;
}

const mapStateToProps = (state: State): WorkoutCategoriesTableProps => {
  return {
    workoutCategories:
      state.applicationState.workoutConfigurations.workoutCategories,
  } as unknown as WorkoutCategoriesTableProps;
};

const mapDispatchToProps = (dispatch: Dispatch): WorkoutCategoriesTableProps =>
  ({
    deActivateClickHandler: (firebaseId: string) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        deActivateWorkoutCategory(firebaseId)
      );
    },
  } as unknown as WorkoutCategoriesTableProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutCategoriesTable);
