import React from 'react';
import MaterialTable from 'material-table';
import PageTitle from '../../../../../shared/PageTitle';
import { State } from '../../../../../../configs/redux/store';
import { Dispatch } from 'redux';
import { ExerciseVO, GripTypeVO } from 'workout-app-common-core';
import {
  openEditingExerciseFormDialog,
  openNewExerciseFormDialog,
} from '../../../../../../creators/exercise-form/exercise-form';
import { connect } from 'react-redux';
import { useState } from 'react';
import {
  ExpandMore,
  Link as LinkIcon,
  ArrowRightAlt as Arrow,
} from '@material-ui/icons';
import GripTypeDialog from './GripTypeDialog';
import TableActionButtons from '../TableActionButtons';

const GripTypesTable = (props: GripTypesTableProps) => {
  const { gripTypes } = props;
  const [open, setOpen] = useState(false);
  const [newGripType, setNewGripType] = useState(false);
  const [selectedGripType, setSelectedGripType] = useState<GripTypeVO | null>(
    null
  );

  const openDialog = (
    newGripType: boolean,
    selectedGripType: GripTypeVO | null
  ) => {
    setOpen(true);
    setNewGripType(newGripType);
    setSelectedGripType(selectedGripType);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const data = gripTypes.map((gripType: GripTypeVO, index: number) => {
    index += 1;
    return {
      number: index,
      name: gripType.name,
      icon: <LinkIcon />,
      actions: (
        <TableActionButtons
          deActivateHighlight={gripType.name}
          editClickHandler={() => openDialog(false, gripType)}
          deActivateClickHandler={() => alert('de-activate clicked')}
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
}

const mapStateToProps = (state: State): GripTypesTableProps => {
  return {
    gripTypes: state.applicationState.workoutConfigurations.gripTypes,
  } as unknown as GripTypesTableProps;
};

const mapDispatchToProps = (dispatch: Dispatch): GripTypesTableProps =>
  ({
    updateHandler: () => {
      dispatch(openNewExerciseFormDialog());
    },
  } as unknown as GripTypesTableProps);

export default connect(mapStateToProps, mapDispatchToProps)(GripTypesTable);
