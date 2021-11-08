import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    number: {
      position: 'absolute',
      fontSize: '82.5%',
      lineHeight: 1,
      top: '0.75em',
      right: '0.75em',
      fontWeight: 700,
    },
  })
);

export default function CornerNumber(props: CornerNumberProps): JSX.Element {
  const classes = useStyles();

  return <span className={classes.number}>{props.date}</span>;
}

interface CornerNumberProps {
  date: string;
}
