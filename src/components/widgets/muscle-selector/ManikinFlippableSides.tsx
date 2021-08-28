import React, { useState } from 'react';
import { IconButton, Grid, Typography } from '@material-ui/core';
import FrontSideControls from './controls/FrontSideControls';
import BackSideControls from './controls/BackSideControls';
import FrontSide from './manikin/FrontSide';
import BackSide from './manikin/BackSide';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

export default function ManikinFlippableSides(): JSX.Element {
  const [displayFront, setDisplayFront] = useState<boolean>(true);

  return (
    <Grid container item xs={12}>
      <Grid item xs={12} container justify={'space-between'}>
        <Grid item>
          <Typography>
            {displayFront ? 'Front Muscle Groups' : 'Back Muscle Groups'}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => {
              setDisplayFront(!displayFront);
            }}
          >
            <ArrowRightAltIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        {displayFront ? <FrontSideControls /> : <BackSideControls />}
      </Grid>
      <Grid item xs={8}>
        {displayFront ? <FrontSide /> : <BackSide />}
      </Grid>
    </Grid>
  );
}
