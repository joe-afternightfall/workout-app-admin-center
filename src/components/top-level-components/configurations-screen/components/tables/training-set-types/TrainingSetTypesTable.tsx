import { connect } from 'react-redux';
import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import TableActionButtons from '../TableActionButtons';
import PageTitle from '../../../../../shared/PageTitle';
import { TrainingSetTypeVO } from 'workout-app-common-core';
import TrainingSetTypesDialog from './TrainingSetTypesDialog';
import { State } from '../../../../../../configs/redux/store';
import { deActivateTrainingSetType } from '../../../../../../services/workout-configurations/training-set-types-service';

const TrainingSetTypesTable = (
  props: TrainingSetTypesTableProps
): JSX.Element => {
  const { trainingSetTypes } = props;
  const [open, setOpen] = useState(false);
  const [newTrainingSetType, setNewTrainingSetType] = useState(false);
  const [selectedTrainingSetType, setSelectedTrainingSetType] =
    useState<TrainingSetTypeVO | null>(null);

  const closeDialog = () => {
    setOpen(false);
    setNewTrainingSetType(!newTrainingSetType);
    setSelectedTrainingSetType(null);
  };

  const openDialog = (
    isNew: boolean,
    trainingSetType: TrainingSetTypeVO | null
  ) => {
    setOpen(true);
    setNewTrainingSetType(isNew);
    setSelectedTrainingSetType(trainingSetType);
  };

  const data = trainingSetTypes.map((trainingSetType, index) => {
    index += 1;
    return {
      number: index,
      name: trainingSetType.name,
      description: trainingSetType.description,
      icon: '---',
      actions: (
        <TableActionButtons
          deActivateHighlight={trainingSetType.name}
          editClickHandler={() => openDialog(false, trainingSetType)}
          deActivateClickHandler={() => {
            props.deActivateClickHandler(trainingSetType.firebaseId);
          }}
        />
      ),
    };
  });

  return (
    <>
      <TrainingSetTypesDialog
        open={open}
        selectedTrainingSetType={selectedTrainingSetType}
        closeDialogHandler={closeDialog}
        newTrainingSetType={newTrainingSetType}
      />
      <MaterialTable
        data={data}
        style={{ width: '100%' }}
        data-testid={'training-set-types-table'}
        title={<PageTitle title={'Training Set Types'} />}
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
            tooltip: 'Add New Training Set Type',
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

interface TrainingSetTypesTableProps {
  trainingSetTypes: TrainingSetTypeVO[];
  deActivateClickHandler: (firebaseId: string) => void;
}

const mapStateToProps = (state: State): TrainingSetTypesTableProps => {
  return {
    trainingSetTypes:
      state.applicationState.workoutConfigurations.trainingSetTypes,
  } as unknown as TrainingSetTypesTableProps;
};

const mapDispatchToProps = (dispatch: Dispatch): TrainingSetTypesTableProps =>
  ({
    deActivateClickHandler: (firebaseId: string) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        deActivateTrainingSetType(firebaseId)
      );
    },
  } as unknown as TrainingSetTypesTableProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingSetTypesTable);
