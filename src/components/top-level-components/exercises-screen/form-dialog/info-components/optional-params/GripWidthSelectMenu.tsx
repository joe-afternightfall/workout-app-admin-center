import React from 'react';
import { GripWidthVO } from 'workout-app-common-core';
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
import DefaultOptionTitle from './DefaultOptionTitle';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { selectOptionalExerciseParam } from '../../../../../../creators/exercise-form/exercise-form';
import { State } from '../../../../../../configs/redux/store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

const GripWidthSelectMenu = (props: GripWidthSelectMenuProps): JSX.Element => {
  const classes = useStyles();
  const { selectedGripWidthId, gripWidths } = props;

  return (
    <Grid item xs={12}>
      {selectedGripWidthId === '' ? (
        <DefaultOptionTitle
          title={'Grip Width'}
          selectOptionHandler={() => {
            props.selectGripWidthHandler(gripWidths[0].id);
          }}
        />
      ) : (
        <Grid container alignItems={'center'}>
          <Grid item xs={8}>
            <FormControl className={classes.formControl}>
              <InputLabel id={'grip-width-label'}>{'Grip Width'}</InputLabel>
              <Select
                labelId={'grip-width-label'}
                id={'grip-width-select'}
                value={selectedGripWidthId}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  props.selectGripWidthHandler(event.target.value as string);
                }}
              >
                {gripWidths.map((width: GripWidthVO, index: number) => (
                  <MenuItem value={width.id} key={index}>
                    {width.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              onClick={() => {
                props.selectGripWidthHandler('');
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

interface GripWidthSelectMenuProps {
  selectedGripWidthId: string;
  gripWidths: GripWidthVO[];
  selectGripWidthHandler: (id: string) => void;
}

const mapStateToProps = (state: State): GripWidthSelectMenuProps => {
  const exerciseForm = state.exerciseFormState.exerciseForm;
  return {
    selectedGripWidthId: exerciseForm.gripWidthId,
    gripWidths: state.applicationState.workoutConfigurations.gripWidths,
  } as unknown as GripWidthSelectMenuProps;
};

const mapDispatchToProps = (dispatch: Dispatch): GripWidthSelectMenuProps =>
  ({
    selectGripWidthHandler: (optionId: string) => {
      dispatch(selectOptionalExerciseParam('gripWidth', optionId));
    },
  } as unknown as GripWidthSelectMenuProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GripWidthSelectMenu);
