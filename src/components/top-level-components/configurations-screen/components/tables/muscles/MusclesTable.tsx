import { connect } from 'react-redux';
import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getManikinMuscleGroupName, MuscleVO } from 'workout-app-common-core';
import TableActionButtons from '../TableActionButtons';
import PageTitle from '../../../../../shared/PageTitle';
import { State } from '../../../../../../configs/redux/store';
import { deActivateMuscle } from '../../../../../../services/workout-configurations/muscles-service';
import MusclesDialog from './MusclesDialog';

const MusclesTable = (props: MusclesTableProps): JSX.Element => {
  const { muscles } = props;
  const [open, setOpen] = useState(false);
  const [newMuscle, setNewMuscle] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleVO | null>(null);

  const closeDialog = () => {
    setOpen(false);
    setNewMuscle(!newMuscle);
    setSelectedMuscle(null);
  };

  const openDialog = (newMuscle: boolean, muscle: MuscleVO | null) => {
    setOpen(true);
    setNewMuscle(newMuscle);
    setSelectedMuscle(muscle);
  };

  const data = muscles.map((muscle, index) => {
    index += 1;
    return {
      number: index,
      name: muscle.name,
      manikinMuscleGroupName: getManikinMuscleGroupName(
        muscle.manikinMuscleGroupId,
        true
      ),
      actions: (
        <TableActionButtons
          deActivateHighlight={muscle.name}
          editClickHandler={() => openDialog(false, muscle)}
          deActivateClickHandler={() => {
            props.deActivateClickHandler(muscle.firebaseId);
          }}
        />
      ),
    };
  });

  return (
    <>
      <MusclesDialog
        open={open}
        newMuscle={newMuscle}
        closeDialogHandler={closeDialog}
        selectedMuscle={selectedMuscle}
      />
      <MaterialTable
        data={data}
        style={{ width: '100%' }}
        data-testid={'muscles-table'}
        title={<PageTitle title={'Muscles'} />}
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
            title: 'Manikin Muscle Group',
            field: 'manikinMuscleGroupName',
            editable: 'never',
            cellStyle: {
              width: '30%',
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
            tooltip: 'Add New Muscle',
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

interface MusclesTableProps {
  muscles: MuscleVO[];
  deActivateClickHandler: (firebaseId: string) => void;
}

const mapStateToProps = (state: State): MusclesTableProps => {
  return {
    muscles: state.applicationState.workoutConfigurations.muscles,
  } as unknown as MusclesTableProps;
};

const mapDispatchToProps = (dispatch: Dispatch): MusclesTableProps =>
  ({
    deActivateClickHandler: (firebaseId: string) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        deActivateMuscle(firebaseId)
      );
    },
  } as unknown as MusclesTableProps);

export default connect(mapStateToProps, mapDispatchToProps)(MusclesTable);
