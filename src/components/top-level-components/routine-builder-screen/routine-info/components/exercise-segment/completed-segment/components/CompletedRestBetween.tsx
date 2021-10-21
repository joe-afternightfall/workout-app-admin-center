import React from 'react';
import { Grid, Typography, CardContent, Collapse } from '@material-ui/core';

export default function CompletedRestBetween({
  expanded,
  restBetweenSets,
  restBetweenNextSegment,
}: CompletedRestBetweenProps): JSX.Element {
  return (
    <Collapse in={expanded} timeout={'auto'} unmountOnExit>
      <CardContent style={{ marginTop: 12 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} container>
            <Grid item xs={6} container justify={'center'}>
              <Typography variant={'h6'} color={'textPrimary'}>
                {`${restBetweenSets} seconds`}
              </Typography>
            </Grid>
            <Grid item xs={6} container justify={'center'}>
              <Typography variant={'h6'} color={'textPrimary'}>
                {`${restBetweenNextSegment} seconds`}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} container>
            <Grid
              item
              xs={6}
              container
              justify={'center'}
              style={{ textAlign: 'center' }}
            >
              <Typography variant={'h6'} color={'textSecondary'}>
                {'rest between sets'}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              container
              justify={'center'}
              style={{ textAlign: 'center' }}
            >
              <Typography variant={'h6'} color={'textSecondary'}>
                {'rest between next segment'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Collapse>
  );
}

interface CompletedRestBetweenProps {
  expanded: boolean;
  restBetweenSets: number;
  restBetweenNextSegment: number;
}
