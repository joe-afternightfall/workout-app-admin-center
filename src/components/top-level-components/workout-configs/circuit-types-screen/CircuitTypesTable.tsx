import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import PageTitle from '../../../shared/PageTitle';
import { State } from '../../../../configs/redux/store';
import { CircuitTypeVO } from '../../../../configs/models/workout-configurations/circuit-type/CircuitTypeVO';
import { TextField } from '@material-ui/core';
import NewCircuitDialog from './NewCircuitDialog';
import {
  deleteCircuitType,
  updateCircuitType,
} from '../../../../services/workout-configurations/circuit-types-service';

const editField = (props: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <TextField
      value={props.value}
      data-testid={'edit-circuit-type-field'}
      onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
        props.onChange(e.target.value)
      }
    />
  );
};

const CircuitTypesTable = (props: CircuitTypesTableProps): JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const data = props.circuitTypes.map(
    (circuit: CircuitTypeVO, index: number) => {
      index += 1;

      return {
        number: index,
        circuit: circuit,
      };
    }
  );

  return (
    <>
      <NewCircuitDialog open={open} closeClickHandler={closeDialog} />

      <MaterialTable
        data={data}
        data-testid={'circuits-table'}
        title={<PageTitle title={'Workout Circuits'} />}
        options={{
          pageSize: 6,
          draggable: false,
          pageSizeOptions: [6, 12, 18],
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowUpdate: (rowData): Promise<void> =>
            new Promise((resolve) => {
              updateCircuitType(
                rowData.circuit.firebaseId,
                rowData.circuit.name
              ).then(() => {
                setTimeout(() => {
                  resolve();
                }, 1500);
              });
            }),
          onRowDelete: (rowData): Promise<void> =>
            new Promise((resolve) => {
              deleteCircuitType(rowData.circuit.firebaseId).then(() => {
                setTimeout(() => {
                  resolve();
                }, 1500);
              });
            }),
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
            title: 'Circuit Name',
            field: 'circuit.name',
            editComponent: editField,
            cellStyle: {
              width: '80%',
            },
          },
        ]}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add New Circuit',
            isFreeAction: true,
            onClick: () => {
              openDialog();
            },
          },
        ]}
      />
    </>
  );
};

export interface CircuitTypesTableProps {
  circuitTypes: CircuitTypeVO[];
}

const mapStateToProps = (state: State): CircuitTypesTableProps => {
  return {
    circuitTypes: state.applicationState.workoutConfigurations.circuitTypes,
  } as unknown as CircuitTypesTableProps;
};

const mapDispatchToProps = (): CircuitTypesTableProps =>
  ({} as unknown as CircuitTypesTableProps);

export default connect(mapStateToProps, mapDispatchToProps)(CircuitTypesTable);
