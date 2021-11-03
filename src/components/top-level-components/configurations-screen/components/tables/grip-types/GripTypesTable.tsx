import { connect } from 'react-redux';
import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import GripTypeDialog from './GripTypeDialog';
import { GripTypeVO } from 'workout-app-common-core';
import TableActionButtons from '../TableActionButtons';
import PageTitle from '../../../../../shared/PageTitle';
import { State } from '../../../../../../configs/redux/store';
import { deActivateGripType } from '../../../../../../services/workout-configurations/grip-types-service';

const GripTypesTable = (props: GripTypesTableProps) => {
  const { gripTypes } = props;
  const [open, setOpen] = useState(false);
  const [newGripType, setNewGripType] = useState(false);
  const [selectedGripType, setSelectedGripType] = useState<GripTypeVO | null>(
    null
  );

  const openDialog = (isNew: boolean, gripType: GripTypeVO | null) => {
    setOpen(true);
    setNewGripType(isNew);
    setSelectedGripType(gripType);
  };

  const closeDialog = () => {
    setOpen(false);
    setNewGripType(!newGripType);
    setSelectedGripType(null);
  };

  const data = gripTypes.map((gripType: GripTypeVO, index: number) => {
    index += 1;
    return {
      number: index,
      name: gripType.name,
      icon: '---',
      actions: (
        <TableActionButtons
          deActivateHighlight={gripType.name}
          editClickHandler={() => openDialog(false, gripType)}
          deActivateClickHandler={() =>
            props.deActivateClickHandler(gripType.firebaseId)
          }
        />
      ),
    };
  });

  return (
    <>
      <GripTypeDialog
        open={open}
        newGripType={newGripType}
        selectedGripType={selectedGripType}
        closeDialogHandler={closeDialog}
      />
      <MaterialTable
        data={data}
        style={{ width: '100%' }}
        data-testid={'grip-types-table'}
        title={<PageTitle title={'Grip Types'} />}
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
            tooltip: 'Add New Grip Type',
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

interface GripTypesTableProps {
  gripTypes: GripTypeVO[];
  deActivateClickHandler: (firebaseId: string) => void;
}

const mapStateToProps = (state: State): GripTypesTableProps => {
  return {
    gripTypes: state.applicationState.workoutConfigurations.gripTypes,
  } as unknown as GripTypesTableProps;
};

const mapDispatchToProps = (dispatch: Dispatch): GripTypesTableProps =>
  ({
    deActivateClickHandler: (firebaseId: string) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        deActivateGripType(firebaseId)
      );
    },
  } as unknown as GripTypesTableProps);

export default connect(mapStateToProps, mapDispatchToProps)(GripTypesTable);
