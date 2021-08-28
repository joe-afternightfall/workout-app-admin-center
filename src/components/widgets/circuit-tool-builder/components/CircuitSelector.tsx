import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { CircuitTypeVO } from '../../../../configs/models/workout-configurations/circuit-type/CircuitTypeVO';
import { State } from '../../../../configs/redux/store';

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      width: '100%',
    },
  })
);

const CircuitSelector = (
  props: CircuitSelectorProps & PassedInProps
): JSX.Element => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={'circuit-selector-label'}>{'Circuit'}</InputLabel>
      <Select
        labelId={'circuit-selector-label'}
        id={'circuit-selector-menu'}
        value={props.selectedCircuitId}
        onChange={(e: ChangeEvent<{ value: unknown }>) => {
          props.onChangeHandler(e.target.value as string);
        }}
      >
        {props.circuits.map((circuit: CircuitTypeVO, index: number) => {
          return (
            <MenuItem key={index} value={circuit.id}>
              {circuit.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export interface CircuitSelectorProps {
  circuits: CircuitTypeVO[];
}

interface PassedInProps {
  selectedCircuitId: string;
  onChangeHandler: (circuitId: string) => void;
}

const mapStateToProps = (state: State): CircuitSelectorProps => {
  return {
    circuits: state.applicationState.workoutConfigurations.circuitTypes,
  } as unknown as CircuitSelectorProps;
};

export default connect(mapStateToProps)(CircuitSelector);
