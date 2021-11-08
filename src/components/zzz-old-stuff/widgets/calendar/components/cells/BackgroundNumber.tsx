import clsx from 'clsx';
import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    bigNumber: {
      fontWeight: 700,
      lineHeight: 1,
      color: '#1a8fff',
      opacity: 0,
      fontSize: '8em',
      position: 'absolute',
      top: '-0.2em',
      right: '-0.05em',
      transition: '0.25s ease-out',
      letterSpacing: '-0.07em',
      '&:hover': {
        opacity: 0.05,
        transition: '0.5s ease-in',
      },
    },
    selectedBigNumber: {
      opacity: 0.05,
      transition: '0.5s ease-in',
    },
  })
);

export default function BackgroundNumber(
  props: BackgroundNumberProps
): JSX.Element {
  const classes = useStyles();

  return (
    <span
      className={clsx(classes.bigNumber, {
        [classes.selectedBigNumber]: props.isSameDay,
      })}
    >
      {props.date}
    </span>
  );
}

interface BackgroundNumberProps {
  date: string;
  isSameDay: boolean;
}
