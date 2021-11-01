import { connect } from 'react-redux';
import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import PageTitle from '../../../../../shared/PageTitle';
import TableActionButtons from '../TableActionButtons';
import { MuscleTargetTypeVO } from 'workout-app-common-core';
import { State } from '../../../../../../configs/redux/store';
import MuscleTargetTypesDialog from './MuscleTargetTypesDialog';
import { deActivateMuscleTargetType } from '../../../../../../services/workout-configurations/muscle-target-types-service';

const MuscleTargetTypesTable = (
  props: MuscleTargetTypesTableProps
): JSX.Element => {
  const { muscleTargetTypes } = props;
  const [open, setOpen] = useState(false);
  const [newMuscleTargetType, setNewMuscleTargetType] = useState(false);
  const [selectedMuscleTargetType, setSelectedMuscleTargetType] =
    useState<MuscleTargetTypeVO | null>(null);

  const openDialog = (
    isNew: boolean,
    muscleTargetType: MuscleTargetTypeVO | null
  ) => {
    setOpen(true);
    setNewMuscleTargetType(isNew);
    setSelectedMuscleTargetType(muscleTargetType);
  };

  const closeDialog = () => {
    setOpen(false);
    setNewMuscleTargetType(!newMuscleTargetType);
    setSelectedMuscleTargetType(null);
  };

  const data = muscleTargetTypes.map((muscleTargetType, index) => {
    index += 1;
    return {
      number: index,
      name: muscleTargetType.name,
      description: muscleTargetType.description,
      actions: (
        <TableActionButtons
          deActivateHighlight={muscleTargetType.name}
          editClickHandler={() => openDialog(false, muscleTargetType)}
          deActivateClickHandler={() => {
            props.deActivateClickHandler(muscleTargetType.firebaseId);
          }}
        />
      ),
    };
  });

  return (
    <>
      <MuscleTargetTypesDialog
        open={open}
        newMuscleTargetType={newMuscleTargetType}
        closeDialogHandler={closeDialog}
        selectedMuscleTargetType={selectedMuscleTargetType}
      />
      <MaterialTable
        data={data}
        style={{ width: '100%' }}
        data-testid={'muscle-target-type-table'}
        title={<PageTitle title={'Muscle Target Types'} />}
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
            tooltip: 'Add New Muscle Target Type',
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

interface MuscleTargetTypesTableProps {
  muscleTargetTypes: MuscleTargetTypeVO[];
  deActivateClickHandler: (firebaseId: string) => void;
}

const mapStateToProps = (state: State): MuscleTargetTypesTableProps => {
  return {
    muscleTargetTypes:
      state.applicationState.workoutConfigurations.muscleTargetTypes,
  } as unknown as MuscleTargetTypesTableProps;
};

const mapDispatchToProps = (dispatch: Dispatch): MuscleTargetTypesTableProps =>
  ({
    deActivateClickHandler: (firebaseId: string) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        deActivateMuscleTargetType(firebaseId)
      );
    },
  } as unknown as MuscleTargetTypesTableProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MuscleTargetTypesTable);
