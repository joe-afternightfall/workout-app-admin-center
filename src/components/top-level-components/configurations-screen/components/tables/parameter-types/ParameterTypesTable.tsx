import { connect } from 'react-redux';
import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ParameterTypeVO } from 'workout-app-common-core';
import PageTitle from '../../../../../shared/PageTitle';
import { State } from '../../../../../../configs/redux/store';
import TableActionButtons from '../TableActionButtons';
import { deActivateParameterType } from '../../../../../../services/workout-configurations/parameter-types-service';
import ParameterTypesDialog from './ParameterTypesDialog';

const ParameterTypesTable = (props: ParameterTypesTableProps): JSX.Element => {
  const { parameterTypes } = props;
  const [open, setOpen] = useState(false);
  const [newParameterType, setNewParameterType] = useState(false);
  const [selectedParameterType, setSelectedParameterType] =
    useState<ParameterTypeVO | null>(null);

  const closeDialog = () => {
    setOpen(false);
    setNewParameterType(!newParameterType);
    setSelectedParameterType(null);
  };

  const openDialog = (
    isNew: boolean,
    parameterType: ParameterTypeVO | null
  ) => {
    setOpen(true);
    setNewParameterType(isNew);
    setSelectedParameterType(parameterType);
  };

  const data = parameterTypes.map((parameterType, index) => {
    index += 1;
    return {
      number: index,
      name: parameterType.name,
      description: parameterType.description,
      actions: (
        <TableActionButtons
          deActivateHighlight={parameterType.name}
          editClickHandler={() => openDialog(false, parameterType)}
          deActivateClickHandler={() => {
            props.deActivateClickHandler(parameterType.firebaseId);
          }}
        />
      ),
    };
  });

  return (
    <>
      <ParameterTypesDialog
        open={open}
        closeDialogHandler={closeDialog}
        newParameterType={newParameterType}
        selectedParameterType={selectedParameterType}
      />
      <MaterialTable
        data={data}
        style={{ width: '100%' }}
        data-testid={'parameter-types-table'}
        title={<PageTitle title={'Parameter Types'} />}
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
            tooltip: 'Add New Parameter Type',
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

interface ParameterTypesTableProps {
  parameterTypes: ParameterTypeVO[];
  deActivateClickHandler: (firebaseId: string) => void;
}

const mapStateToProps = (state: State): ParameterTypesTableProps => {
  return {
    parameterTypes: state.applicationState.workoutConfigurations.parameterTypes,
  } as unknown as ParameterTypesTableProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ParameterTypesTableProps =>
  ({
    deActivateClickHandler: (firebaseId: string) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        deActivateParameterType(firebaseId)
      );
    },
  } as unknown as ParameterTypesTableProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParameterTypesTable);
