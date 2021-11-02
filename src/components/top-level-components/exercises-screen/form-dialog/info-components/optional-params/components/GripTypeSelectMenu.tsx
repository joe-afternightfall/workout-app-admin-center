import React from 'react';
import {
  Grid,
  Select,
  MenuItem,
  IconButton,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Close } from '@material-ui/icons';
import { GripTypeVO } from 'workout-app-common-core';
import DefaultOptionTitle from './DefaultOptionTitle';
import { State } from '../../../../../../../configs/redux/store';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { selectOptionalExerciseParam } from '../../../../../../../creators/exercise-form/exercise-form';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

const GripTypeSelectMenu = (props: GripTypeSelectMenuProps): JSX.Element => {
  const classes = useStyles();
  const { gripTypes, selectedGripTypeId } = props;

  return (
    <Grid item xs={12}>
      {selectedGripTypeId === '' ? (
        <DefaultOptionTitle
          title={'Grip Type'}
          selectOptionHandler={() => {
            props.selectGripTypeHandler(gripTypes[0].id);
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
                  props.selectGripTypeHandler(event.target.value as string);
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
                props.selectGripTypeHandler('');
              }}
            >
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

interface GripTypeSelectMenuProps {
  gripTypes: GripTypeVO[];
  selectedGripTypeId: string;
  selectGripTypeHandler: (id: string) => void;
}

const mapStateToProps = (state: State): GripTypeSelectMenuProps => {
  return {
    selectedGripTypeId: state.exerciseFormState.exerciseForm.gripTypeId,
    gripTypes: state.applicationState.workoutConfigurations.gripTypes,
  } as unknown as GripTypeSelectMenuProps;
};

const mapDispatchToProps = (dispatch: Dispatch): GripTypeSelectMenuProps =>
  ({
    selectGripTypeHandler: (optionId: string) => {
      dispatch(selectOptionalExerciseParam('gripType', optionId));
    },
  } as unknown as GripTypeSelectMenuProps);

export default connect(mapStateToProps, mapDispatchToProps)(GripTypeSelectMenu);
