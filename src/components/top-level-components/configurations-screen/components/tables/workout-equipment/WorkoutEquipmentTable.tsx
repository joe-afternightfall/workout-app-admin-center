import { connect } from 'react-redux';
import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import TableActionButtons from '../TableActionButtons';
import PageTitle from '../../../../../shared/PageTitle';
import { WorkoutEquipmentVO } from 'workout-app-common-core';
import { State } from '../../../../../../configs/redux/store';
import WorkoutEquipmentDialog from './WorkoutEquipmentDialog';
import { deActivateWorkoutEquipment } from '../../../../../../services/workout-configurations/workout-equipment-service';

const WorkoutEquipmentTable = (
  props: WorkoutEquipmentTableProps
): JSX.Element => {
  const { workoutEquipment } = props;
  const [open, setOpen] = useState(false);
  const [newWorkoutEquipment, setNewWorkoutEquipment] = useState(false);
  const [selectedWorkoutEquipment, setSelectedWorkoutEquipment] =
    useState<WorkoutEquipmentVO | null>(null);

  const closeDialog = () => {
    setOpen(false);
    setNewWorkoutEquipment(!newWorkoutEquipment);
    setSelectedWorkoutEquipment(null);
  };

  const openDialog = (
    isNew: boolean,
    workoutEquipment: WorkoutEquipmentVO | null
  ) => {
    setOpen(true);
    setNewWorkoutEquipment(isNew);
    setSelectedWorkoutEquipment(workoutEquipment);
  };

  const data = workoutEquipment.map((equipment, index) => {
    index += 1;
    return {
      number: index,
      name: equipment.name,
      description: equipment.description,
      icon: '---',
      actions: (
        <TableActionButtons
          deActivateHighlight={equipment.name}
          editClickHandler={() => openDialog(false, equipment)}
          deActivateClickHandler={() => {
            props.deActivateClickHandler(equipment.firebaseId);
          }}
        />
      ),
    };
  });

  return (
    <>
      <WorkoutEquipmentDialog
        open={open}
        selectedWorkoutEquipment={selectedWorkoutEquipment}
        closeDialogHandler={closeDialog}
        newWorkoutEquipment={newWorkoutEquipment}
      />
      <MaterialTable
        data={data}
        style={{ width: '100%' }}
        data-testid={'workout-equipment-table'}
        title={<PageTitle title={'Workout Equipment'} />}
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
              width: '40%',
            },
          },
          {
            title: 'Icon',
            field: 'icon',
            editable: 'never',
            sorting: false,
            headerStyle: {
              width: '30%',
              textAlign: 'center',
            },
            cellStyle: {
              width: '30%',
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
            tooltip: 'Add New Piece of Workout Equipment',
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

interface WorkoutEquipmentTableProps {
  workoutEquipment: WorkoutEquipmentVO[];
  deActivateClickHandler: (firebaseId: string) => void;
}

const mapStateToProps = (state: State): WorkoutEquipmentTableProps => {
  return {
    workoutEquipment:
      state.applicationState.workoutConfigurations.workoutEquipment,
  } as unknown as WorkoutEquipmentTableProps;
};

const mapDispatchToProps = (dispatch: Dispatch): WorkoutEquipmentTableProps =>
  ({
    deActivateClickHandler: (firebaseId: string) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        deActivateWorkoutEquipment(firebaseId)
      );
    },
  } as unknown as WorkoutEquipmentTableProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutEquipmentTable);
