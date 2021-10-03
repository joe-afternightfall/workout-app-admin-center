import React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ParamTypeButtonGroup from './components/ParamTypeButtonGroup';
import { ExerciseVO, ParameterType } from 'workout-app-common-core';
import MuscleSelector from './components/MuscleSelector';
import AlternateCheckboxes from './components/AlternateCheckboxes';
import AlternateRadioGroup from './components/AlternateRadioGroup';
import OptionalParams from './components/OptionalParams';
import { saveNewExercise } from '../../../../../services/workout-configurations/exercises';
import { State } from '../../../../../configs/redux/store';
import { ThunkDispatch } from 'redux-thunk';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
  })
);

export interface InfoProps {
  name: string;
  // todo: implement description param
  // description: string;
  equipmentId: string;
  muscleGroupIds: string[];
  // iconId: string;
  gripTypeId: string;
  gripWidthId: string;
  parameterTypeId: string;
  alternateSides: boolean;
}

const ExerciseInfoCard = ({
  saveClickHandler,
}: ExerciseInfoCardProps & PassedInProps): JSX.Element => {
  const classes = useStyles();

  const [paramType, setParamType] = React.useState<ParameterType | null>(null);
  const [muscleId, setMuscleId] = React.useState<string | undefined>(undefined);
  const [gripWidthId, setGripWidthId] = React.useState('');
  const [equipmentId, setEquipmentId] = React.useState('');
  const [gripTypeId, setGripTypeId] = React.useState('');
  const [name, setName] = React.useState('');
  const [shouldAlternate, setShouldAlternate] = React.useState<boolean | null>(
    null
  );

  const selectParamType = (
    event: React.MouseEvent<HTMLElement>,
    paramType: ParameterType | null
  ) => {
    setParamType(paramType);
  };

  const selectAlternateSidesOption = (value: boolean) => {
    setShouldAlternate(value);
  };

  const selectMuscleId = (value: string) => {
    setMuscleId(value);
  };

  const selectOptionalParam = (
    param: 'gripWidth' | 'gripType' | 'equipment',
    id: string
  ) => {
    switch (param) {
      case 'equipment':
        setEquipmentId(id);
        break;
      case 'gripType':
        setGripTypeId(id);
        break;
      case 'gripWidth':
        setGripWidthId(id);
        break;
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const saveExerciseInfo = () => {
    if (muscleId && paramType && shouldAlternate !== null) {
      saveClickHandler({
        name: name,
        equipmentId: equipmentId,
        muscleGroupIds: [muscleId],
        gripTypeId: gripTypeId,
        gripWidthId: gripWidthId,
        parameterTypeId: paramType.id,
        alternateSides: shouldAlternate,
      });
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                value={name}
                id="exercise-name"
                variant={'outlined'}
                label={'Exercise Name'}
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={4}>
              <MuscleSelector
                selectedMuscleId={muscleId}
                changeHandler={selectMuscleId}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <ParamTypeButtonGroup
              changeHandler={selectParamType}
              selectedParamType={paramType}
            />
          </Grid>

          <Grid item xs={12} container style={{ marginTop: 24 }}>
            <Grid item xs={6}>
              <AlternateRadioGroup
                selectedOption={shouldAlternate}
                changeHandler={selectAlternateSidesOption}
              />
            </Grid>
            <Grid item xs={6}>
              <OptionalParams
                params={{
                  gripWidthId: gripWidthId,
                  equipmentId: equipmentId,
                  gripTypeId: gripTypeId,
                }}
                selectOptionalParam={selectOptionalParam}
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
          <Grid item container justify={'flex-end'}>
            <Button
              // variant="contained"
              color={'primary'}
              // size="large"
              // className={classes.button}
              startIcon={<SaveIcon />}
              onClick={saveExerciseInfo}
            >
              {'Save'}
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

interface PassedInProps {
  newExercise: boolean;
  successCallback: () => void;
}
export interface ExerciseInfoCardProps {
  saveClickHandler: (exerciseInfo: InfoProps) => void;
}

const mapStateToProps = (state: any): ExerciseInfoCardProps => {
  return {} as unknown as ExerciseInfoCardProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): ExerciseInfoCardProps =>
  ({
    saveClickHandler: (exerciseInfo: InfoProps) => {
      if (ownProps.newExercise) {
        (dispatch as ThunkDispatch<State, void, AnyAction>)(
          saveNewExercise(exerciseInfo, ownProps.successCallback)
        );
      }
    },
  } as unknown as ExerciseInfoCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseInfoCard);
