import React from 'react';
import {
  Card,
  Grid,
  Divider,
  TextField,
  CardContent,
  CardActions,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ParameterType, parameterTypes } from 'workout-app-common-core';
import { State } from '../../../../configs/redux/store';
import MuscleSelector from './info-components/MuscleSelector';
import OptionalParams from './info-components/OptionalParams';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AlternateRadioGroup from './info-components/AlternateRadioGroup';
import ParamTypeButtonGroup from './info-components/ParamTypeButtonGroup';
import {
  selectAlternateSidesOption,
  selectExerciseMuscleId,
  selectExerciseParamType,
  selectOptionalExerciseParam,
  updateExerciseName,
} from '../../../../creators/exercise-form/exercise-form';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
  })
);

const ExerciseInfoContent = (props: ExerciseInfoContentProps): JSX.Element => {
  const {
    gripTypeId,
    equipmentId,
    gripWidthId,
    exerciseName,
    shouldAlternate,
    selectedMuscleId,
    selectedParamType,
  } = props;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                value={exerciseName}
                id={'exercise-name'}
                variant={'outlined'}
                label={'Exercise Name'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  props.nameChangeHandler(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <MuscleSelector
                selectedMuscleId={selectedMuscleId}
                changeHandler={props.selectMuscleIdHandler}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <ParamTypeButtonGroup
              changeHandler={props.selectParamTypeHandler}
              selectedParamType={selectedParamType}
            />
          </Grid>

          <Grid item xs={12} container style={{ marginTop: 24 }}>
            <Grid item xs={6}>
              <AlternateRadioGroup
                selectedOption={shouldAlternate}
                changeHandler={props.selectAlternateSidesHandler}
              />
            </Grid>
            <Grid item xs={6}>
              <OptionalParams
                params={{
                  gripWidthId: gripWidthId,
                  equipmentId: equipmentId,
                  gripTypeId: gripTypeId,
                }}
                selectOptionalParam={props.selectOptionalParamHandler}
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container>
          <Grid item xs={12}>
            <Divider variant={'middle'} />
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

interface ExerciseInfoContentProps {
  newExerciseForm: boolean;
  shouldAlternate: boolean;
  exerciseName: string;
  selectedMuscleId: string;
  gripTypeId: string;
  equipmentId: string;
  gripWidthId: string;
  selectedParamType: ParameterType | null;
  nameChangeHandler: (value: string) => void;
  selectMuscleIdHandler: (value: string) => void;
  selectAlternateSidesHandler: (value: boolean) => void;
  selectParamTypeHandler: (paramType: ParameterType) => void;
  selectOptionalParamHandler: (
    param: 'gripWidth' | 'gripType' | 'equipment',
    optionId: string
  ) => void;
}

const mapStateToProps = (state: State): ExerciseInfoContentProps => {
  const exerciseForm = state.exerciseFormState.exerciseForm;
  // todo: add util method to common core
  const foundParamType = parameterTypes.find(
    (type) => type.id === exerciseForm.parameterTypeId
  );
  return {
    newExerciseForm: state.exerciseFormState.newExerciseForm,
    shouldAlternate: exerciseForm && exerciseForm.alternateSides,
    exerciseName: exerciseForm && exerciseForm.name,
    gripWidthId: exerciseForm.gripWidthId,
    gripTypeId: exerciseForm.gripTypeId,
    equipmentId: exerciseForm.equipmentId,
    selectedMuscleId:
      exerciseForm &&
      exerciseForm.muscleGroupIds &&
      exerciseForm.muscleGroupIds[0],
    selectedParamType: foundParamType && foundParamType,
  } as unknown as ExerciseInfoContentProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ExerciseInfoContentProps =>
  ({
    nameChangeHandler: (value: string) => {
      dispatch(updateExerciseName(value));
    },
    selectMuscleIdHandler: (value: string) => {
      dispatch(selectExerciseMuscleId(value));
    },
    selectAlternateSidesHandler: (value: boolean) => {
      dispatch(selectAlternateSidesOption(value));
    },
    selectParamTypeHandler: (paramType: ParameterType) => {
      dispatch(selectExerciseParamType(paramType));
    },
    selectOptionalParamHandler: (
      param: 'gripWidth' | 'gripType' | 'equipment',
      optionId: string
    ) => {
      dispatch(selectOptionalExerciseParam(param, optionId));
    },
  } as unknown as ExerciseInfoContentProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExerciseInfoContent);
