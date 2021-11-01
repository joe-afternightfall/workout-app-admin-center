import { connect } from 'react-redux';
import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import PageTitle from '../../../../../shared/PageTitle';
import { State } from '../../../../../../configs/redux/store';
import TableActionButtons from '../TableActionButtons';
import { GripWidthVO, ManikinMuscleGroupVO } from 'workout-app-common-core';
import { deActivateGripWidth } from '../../../../../../services/workout-configurations/grip-widths-service';
import ManikinMuscleGroupDialog from './ManikinMuscleGroupDialog';
import { deActivateManikinMuscleGroup } from '../../../../../../services/workout-configurations/manikin-muscle-groups-service';

const ManikinMuscleGroupsTable = (
  props: ManikinMuscleGroupsTableProps
): JSX.Element => {
  const { manikinMuscleGroups } = props;
  const [open, setOpen] = useState(false);
  const [newManikinGroup, setNewManikinGroup] = useState(false);
  const [selectedManikinMuscleGroup, setSelectedManikinMuscleGroup] =
    useState<ManikinMuscleGroupVO | null>(null);

  const openDialog = (
    newManikinGroup: boolean,
    manikinGroup: ManikinMuscleGroupVO | null
  ) => {
    setOpen(true);
    setNewManikinGroup(newManikinGroup);
    setSelectedManikinMuscleGroup(manikinGroup);
  };

  const closeDialog = () => {
    setOpen(false);
    setNewManikinGroup(!newManikinGroup);
    setSelectedManikinMuscleGroup(null);
  };

  const data = manikinMuscleGroups.map((muscleGroup, index) => {
    index += 1;
    return {
      number: index,
      name: muscleGroup.name,
      actions: (
        <TableActionButtons
          deActivateHighlight={muscleGroup.name}
          editClickHandler={() => openDialog(false, muscleGroup)}
          deActivateClickHandler={() => {
            props.deActivateClickHandler(muscleGroup.firebaseId);
          }}
        />
      ),
    };
  });

  return (
    <>
      <ManikinMuscleGroupDialog
        open={open}
        newManikinMuscleGroup={newManikinGroup}
        closeDialogHandler={closeDialog}
        selectedManikinMuscleGroup={selectedManikinMuscleGroup}
      />
      <MaterialTable
        data={data}
        style={{ width: '100%' }}
        data-testid={'manikin-muscle-group-table'}
        title={<PageTitle title={'Manikin Muscle Groups'} />}
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
              width: '70%',
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
            tooltip: 'Add New Manikin Muscle Group',
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

interface ManikinMuscleGroupsTableProps {
  manikinMuscleGroups: ManikinMuscleGroupVO[];
  deActivateClickHandler: (firebaseId: string) => void;
}

const mapStateToProps = (state: State): ManikinMuscleGroupsTableProps => {
  return {
    manikinMuscleGroups:
      state.applicationState.workoutConfigurations.manikinMuscleGroups,
  } as unknown as ManikinMuscleGroupsTableProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch
): ManikinMuscleGroupsTableProps =>
  ({
    deActivateClickHandler: (firebaseId: string) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        deActivateManikinMuscleGroup(firebaseId)
      );
    },
  } as unknown as ManikinMuscleGroupsTableProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManikinMuscleGroupsTable);
