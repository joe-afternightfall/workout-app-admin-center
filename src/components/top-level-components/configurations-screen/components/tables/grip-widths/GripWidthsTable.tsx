import { connect } from 'react-redux';
import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { GripWidthVO } from 'workout-app-common-core';
import PageTitle from '../../../../../shared/PageTitle';
import { State } from '../../../../../../configs/redux/store';
import TableActionButtons from '../TableActionButtons';
import GripWidthDialog from './GripWidthDialog';
import { deActivateGripWidth } from '../../../../../../services/workout-configurations/grip-widths-service';

const GripWidthsTable = (props: GripWidthsTableProps) => {
  const { gripWidths } = props;
  const [open, setOpen] = useState(false);
  const [newGripWidth, setNewGripWidth] = useState(false);
  const [selectedGripWidth, setSelectedGripWidth] =
    useState<GripWidthVO | null>(null);

  const openDialog = (
    newGripWidth: boolean,
    selectedGripWidth: GripWidthVO | null
  ) => {
    setOpen(true);
    setNewGripWidth(newGripWidth);
    setSelectedGripWidth(selectedGripWidth);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const data = gripWidths.map((gripWidth: GripWidthVO, index: number) => {
    index += 1;
    return {
      number: index,
      name: gripWidth.name,
      icon: '---',
      actions: (
        <TableActionButtons
          deActivateHighlight={gripWidth.name}
          editClickHandler={() => openDialog(false, gripWidth)}
          deActivateClickHandler={() =>
            props.deActivateClickHandler(gripWidth.firebaseId)
          }
        />
      ),
    };
  });

  return (
    <>
      <GripWidthDialog
        open={open}
        newGripWidth={newGripWidth}
        closeDialogHandler={closeDialog}
        selectedGripWidth={selectedGripWidth}
      />
      <MaterialTable
        data={data}
        style={{ width: '100%' }}
        data-testid={'grip-widths-table'}
        title={<PageTitle title={'Grip Widths'} />}
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
            tooltip: 'Add New Grip Width',
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

interface GripWidthsTableProps {
  gripWidths: GripWidthVO[];
  deActivateClickHandler: (firebaseId: string) => void;
}

const mapStateToProps = (state: State): GripWidthsTableProps => {
  return {
    gripWidths: state.applicationState.workoutConfigurations.gripWidths,
  } as unknown as GripWidthsTableProps;
};

const mapDispatchToProps = (dispatch: Dispatch): GripWidthsTableProps =>
  ({
    deActivateClickHandler: (firebaseId: string) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        deActivateGripWidth(firebaseId)
      );
    },
  } as unknown as GripWidthsTableProps);

export default connect(mapStateToProps, mapDispatchToProps)(GripWidthsTable);
