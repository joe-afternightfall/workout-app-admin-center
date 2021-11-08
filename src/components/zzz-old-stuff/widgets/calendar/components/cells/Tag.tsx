import Dot from './Dot';
import React from 'react';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { WorkoutVO } from '../../../../../../configs/zzz-old-stuff/old-models/WorkoutVO';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'absolute',
      bottom: 8,
    },
    tagRoot: {
      // fontSize: 12,
      // background: '#F7F9FB',
      // background: '#86F250',
      // background: '#473BBE',

      background: '#21a168',

      // background: '#00facd',
      // background: '#FFD800',
      // padding: '2px 5px',
      // fontWeight: 600,
      // lineHeight: 1.4,
      // borderRadius: 2,
      // color: 'hsl(210, 5%, 40%)',
      width: '100%',
      height: 12,
    },
  })
);

export default function Tag(props: TagProps): JSX.Element {
  const classes = useStyles();

  return (
    <Grid
      item
      xs={12}
      container
      justify={'center'}
      alignItems={'center'}
      className={classes.root}
    >
      <Grid item xs={8} className={classes.tagRoot}>
        <Grid
          style={{ height: '100%' }}
          container
          justify={'center'}
          alignItems={'center'}
        >
          {props.workout.circuits.map((circuit, index: number) => {
            return <Dot key={index} />;
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

interface TagProps {
  workout: WorkoutVO;
}
