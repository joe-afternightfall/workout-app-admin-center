import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 200,
    },
    fullWidth: {
      width: '100%',
    },
  })
);

export default function BaseSelectDropdown({
  id,
  data,
  label,
  value,
  fullWidth,
  changeHandler,
}: BaseSelectDropdownProps): JSX.Element {
  const classes = useStyles();

  const selectId = `${id}-select`;
  const labelId = `${id}-label`;

  return (
    <FormControl
      className={fullWidth ? classes.fullWidth : classes.formControl}
    >
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <Select
        labelId={labelId}
        id={selectId}
        value={value}
        onChange={(
          e: React.ChangeEvent<{
            name?: string | undefined;
            value: unknown;
          }>
        ) => {
          changeHandler(e.target.value as string);
        }}
      >
        {data.map((info, index: number) => {
          return (
            <MenuItem key={index} value={info.id}>
              {info.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export interface BaseSelectDropdownProps {
  id: string;
  value: string | undefined;
  label?: string;
  fullWidth?: boolean;
  changeHandler: (value: string) => void;
  data: {
    id: string;
    name: string;
  }[];
}
