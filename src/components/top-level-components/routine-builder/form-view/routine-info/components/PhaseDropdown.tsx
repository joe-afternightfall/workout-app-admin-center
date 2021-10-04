import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Phase, phases } from 'workout-app-common-core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { selectPhase } from '../../../../../../creators/routine-builder/builder';

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 200,
    },
  })
);

const PhaseDropdown = ({
  changeHandler,
  phase,
}: PhaseDropdownProps & PassedInProps): JSX.Element => {
  const classes = useStyles();

  const id = `phase-select`;
  const labelId = `${id}-label`;

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={labelId}>{'Phase'}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={phase.phaseId}
        onChange={(
          e: React.ChangeEvent<{
            name?: string | undefined;
            value: unknown;
          }>
        ) => {
          changeHandler(phase.id, e.target.value as string);
        }}
      >
        {phases.map((phaseVO, index) => (
          <MenuItem key={index} value={phaseVO.id}>
            {phaseVO.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

interface PassedInProps {
  phase: Phase;
}

interface PhaseDropdownProps {
  changeHandler: (workoutPhaseId: string, phaseId: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): PhaseDropdownProps =>
  ({
    changeHandler: (workoutPhaseId: string, phaseId: string) => {
      dispatch(selectPhase(workoutPhaseId, phaseId));
    },
  } as unknown as PhaseDropdownProps);

export default connect(null, mapDispatchToProps)(PhaseDropdown);
