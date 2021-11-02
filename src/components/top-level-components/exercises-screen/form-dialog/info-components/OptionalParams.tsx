import React from 'react';
import {
  GripTypeVO,
  GripWidthVO,
  WorkoutEquipmentVO,
} from 'workout-app-common-core';
import {
  Grid,
  Select,
  MenuItem,
  IconButton,
  Typography,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Close } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import { State } from '../../../../../configs/redux/store';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { selectOptionalExerciseParam } from '../../../../../creators/exercise-form/exercise-form';
import DefaultOptionTitle from './optional-params/DefaultOptionTitle';
import GripWidthSelectMenu from './optional-params/GripWidthSelectMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

const OptionalParams = (props: OptionalParamsProps): JSX.Element => {
  const classes = useStyles();
  const { params, gripTypes } = props;
  const { selectedWorkoutEquipmentIds, selectedGripTypeId } = params;

  return (
    <Grid container alignItems={'center'}>
      <Grid item xs={12}>
        <Typography color={'textSecondary'}>{'Optional Parameters'}</Typography>
      </Grid>
      <Grid item xs={12}>
        <GripWidthSelectMenu />
      </Grid>
      <Grid item xs={12}>
        {selectedGripTypeId === '' ? (
          <DefaultOptionTitle
            title={'Grip Type'}
            selectOptionHandler={() => {
              props.selectOptionalParamHandler('gripType', gripTypes[0].id);
            }}
          />
        ) : (
          <Grid container alignItems={'center'}>
            <Grid item xs={8}>
              <FormControl className={classes.formControl}>
                <InputLabel id={'grip-type-label'}>{'Grip Type'}</InputLabel>
                <Select
                  labelId={'grip-type-label'}
                  id={'grip-type-select'}
                  value={selectedGripTypeId}
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    props.selectOptionalParamHandler(
                      'gripType',
                      event.target.value as string
                    );
                  }}
                >
                  {gripTypes.map((type: GripTypeVO, index: number) => (
                    <MenuItem value={type.id} key={index}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <IconButton
                onClick={() => {
                  props.selectOptionalParamHandler('gripType', '');
                }}
              >
                <Close />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        {/*todo: adding list selection for equipment*/}
        {/*{selectedWorkoutEquipmentIds === '' ? (*/}
        {/*  <Grid container alignItems={'center'}>*/}
        {/*    <Grid item xs={8}>*/}
        {/*      <Typography>{'Equipment'}</Typography>*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs={4}>*/}
        {/*      <IconButton*/}
        {/*        onClick={() => {*/}
        {/*          selectOptionalParamHandler(*/}
        {/*            'equipment',*/}
        {/*            workoutEquipment[0].id*/}
        {/*          );*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        <AddIcon />*/}
        {/*      </IconButton>*/}
        {/*    </Grid>*/}
        {/*  </Grid>*/}
        {/*) : (*/}
        {/*  <Grid container alignItems={'center'}>*/}
        {/*    <Grid item xs={8}>*/}
        {/*      <FormControl className={classes.formControl}>*/}
        {/*        <InputLabel id={'equipment-label'}>{'Equipment'}</InputLabel>*/}
        {/*        <Select*/}
        {/*          labelId={'equipment-label'}*/}
        {/*          id={'equipment-select'}*/}
        {/*          value={equipmentId}*/}
        {/*          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {*/}
        {/*            selectOptionalParamHandler(*/}
        {/*              'equipment',*/}
        {/*              event.target.value as string*/}
        {/*            );*/}
        {/*          }}*/}
        {/*        >*/}
        {/*          {workoutEquipment.map(*/}
        {/*            (equipment: WorkoutEquipmentVO, index: number) => (*/}
        {/*              <MenuItem value={equipment.id} key={index}>*/}
        {/*                {equipment.name}*/}
        {/*              </MenuItem>*/}
        {/*            )*/}
        {/*          )}*/}
        {/*        </Select>*/}
        {/*      </FormControl>*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs={4}>*/}
        {/*      <IconButton*/}
        {/*        onClick={() => {*/}
        {/*          selectOptionalParamHandler('equipment', '');*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        <Close />*/}
        {/*      </IconButton>*/}
        {/*    </Grid>*/}
        {/*  </Grid>*/}
        {/*)}*/}
      </Grid>
    </Grid>
  );
};

interface OptionalParamsProps {
  gripTypes: GripTypeVO[];
  gripWidths: GripWidthVO[];
  workoutEquipment: WorkoutEquipmentVO[];
  params: {
    selectedGripWidthId: string;
    selectedWorkoutEquipmentIds: string;
    selectedGripTypeId: string;
  };
  selectOptionalParamHandler: (
    param: 'gripWidth' | 'gripType' | 'equipment',
    id: string
  ) => void;
}

const mapStateToProps = (state: State): OptionalParamsProps => {
  const exerciseForm = state.exerciseFormState.exerciseForm;
  return {
    gripTypes: state.applicationState.workoutConfigurations.gripTypes,
    gripWidths: state.applicationState.workoutConfigurations.gripWidths,
    workoutEquipment:
      state.applicationState.workoutConfigurations.workoutEquipment,
    params: {
      selectedGripWidthId: exerciseForm.gripWidthId,
      selectedGripTypeId: exerciseForm.gripTypeId,
      selectedWorkoutEquipmentIds: exerciseForm.workoutEquipmentIds,
    },
  } as unknown as OptionalParamsProps;
};

const mapDispatchToProps = (dispatch: Dispatch): OptionalParamsProps =>
  ({
    selectOptionalParamHandler: (
      param: 'gripWidth' | 'gripType' | 'equipment',
      optionId: string
    ) => {
      dispatch(selectOptionalExerciseParam(param, optionId));
    },
  } as unknown as OptionalParamsProps);

export default connect(mapStateToProps, mapDispatchToProps)(OptionalParams);
