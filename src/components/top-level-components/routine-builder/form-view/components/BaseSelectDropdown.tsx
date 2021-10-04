import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 200,
    },
  })
);

export default function BaseSelectDropdown({
  data,
  label,
  value,
  changeHandler,
}: BaseSelectDropdownProps): JSX.Element {
  const classes = useStyles();

  const id = `${label}-select`;
  const labelId = `${id}-label`;

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
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
  value: string | undefined;
  label: string;
  changeHandler: (value: string) => void;
  data: {
    id: string;
    name: string;
  }[];
}
