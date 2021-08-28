import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100%',
      backgroundColor: '#4051B1',
      color: '#fff',
      borderRadius: 4,
      padding: '0 8px',
    },
    disabled: {
      color: '#B9B9B9',
    },
  })
);

export default function SetIncrementer(
  props: SetIncrementerProps
): JSX.Element {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      alignItems={'center'}
      justify={'space-between'}
    >
      <Grid item>
        <RemoveIcon
          className={clsx({
            [classes.disabled]: props.setNumber === 0,
          })}
          onClick={() => {
            if (props.setNumber !== 0) {
              props.changeHandler('subtract', props.setTemplateId);
            }
          }}
        />
      </Grid>
      <Grid item>
        <Typography>{props.setNumber}</Typography>
      </Grid>
      <Grid item>
        <AddIcon
          onClick={() => {
            props.changeHandler('add', props.setTemplateId);
          }}
        />
      </Grid>
    </Grid>
  );
}

export interface SetIncrementerProps {
  setNumber: number;
  setTemplateId: string;
  changeHandler: (action: 'add' | 'subtract', id: string) => void;
}
