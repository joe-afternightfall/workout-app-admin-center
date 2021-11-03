import { connect } from 'react-redux';
import React, { useState } from 'react';
import PhasesDialog from './PhasesDialog';
import MaterialTable from 'material-table';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { PhaseVO } from 'workout-app-common-core';
import TableActionButtons from '../TableActionButtons';
import PageTitle from '../../../../../shared/PageTitle';
import { State } from '../../../../../../configs/redux/store';
import { deActivatePhase } from '../../../../../../services/workout-configurations/phases-service';

const PhasesTable = (props: PhasesTableProps): JSX.Element => {
  const { phases } = props;
  const [open, setOpen] = useState(false);
  const [newPhase, setNewPhase] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<PhaseVO | null>(null);

  const closeDialog = () => {
    setOpen(false);
    setNewPhase(!newPhase);
    setSelectedPhase(null);
  };

  const openDialog = (isNew: boolean, phase: PhaseVO | null) => {
    setOpen(true);
    setNewPhase(isNew);
    setSelectedPhase(phase);
  };

  const data = phases.map((phase, index) => {
    index += 1;
    return {
      number: index,
      name: phase.name,
      description: phase.description,
      actions: (
        <TableActionButtons
          deActivateHighlight={phase.name}
          editClickHandler={() => openDialog(false, phase)}
          deActivateClickHandler={() => {
            props.deActivateClickHandler(phase.firebaseId);
          }}
        />
      ),
    };
  });

  return (
    <>
      <PhasesDialog
        open={open}
        selectedPhase={selectedPhase}
        closeDialogHandler={closeDialog}
        newPhase={newPhase}
      />
      <MaterialTable
        data={data}
        style={{ width: '100%' }}
        data-testid={'phases-table'}
        title={<PageTitle title={'Phases'} />}
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
            tooltip: 'Add New Phase',
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

interface PhasesTableProps {
  phases: PhaseVO[];
  deActivateClickHandler: (firebaseId: string) => void;
}

const mapStateToProps = (state: State): PhasesTableProps => {
  return {
    phases: state.applicationState.workoutConfigurations.phases,
  } as unknown as PhasesTableProps;
};

const mapDispatchToProps = (dispatch: Dispatch): PhasesTableProps =>
  ({
    deActivateClickHandler: (firebaseId: string) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        deActivatePhase(firebaseId)
      );
    },
  } as unknown as PhasesTableProps);

export default connect(mapStateToProps, mapDispatchToProps)(PhasesTable);
