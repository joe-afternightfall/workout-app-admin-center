import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { capitalizeSetType } from '../../../../../utils/formatter';
import { SetType } from 'workout-app-common-core/core/src/models/workout-configurations/exercise-type/ExerciseTypeDAO';

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      width: '100%',
    },
  })
);

// todo: change select menu to "tabs" where only one can be selected
export default function SetTypesMenu(props: SetTypesMenuProps): JSX.Element {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={'set-types-label'}>{'Set Type'}</InputLabel>
      <Select
        labelId={'set-types-label'}
        id={'set-types-menu'}
        value={props.value}
        onChange={props.onChangeHandler}
      >
        {Object.values(SetType).map((type: string, index: number) => {
          const typeName = capitalizeSetType(type);
          return (
            <MenuItem key={index} value={type}>
              {typeName}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export interface SetTypesMenuProps {
  value: string;
  onChangeHandler: (e: React.ChangeEvent<{ value: unknown }>) => void;
}
