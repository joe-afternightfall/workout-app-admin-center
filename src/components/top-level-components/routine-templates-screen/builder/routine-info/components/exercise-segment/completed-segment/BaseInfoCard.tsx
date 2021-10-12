import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { isStraightSet, isSuperset, Segment } from 'workout-app-common-core';
import {
  Fade,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
} from '@material-ui/core';
import clsx from 'clsx';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { Link } from '@material-ui/icons';
import SegmentActionMenu from '../components/action-menu/SegmentActionMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardRoot: {
      minHeight: '42vh',
      transition: 'transform .35s ease-in-out',
    },
    activeCard: {
      height: '100%',
      borderLeft: `6px solid ${theme.palette.primary.main}`,
    },
    dragIndicator: {
      transform: 'rotate(90deg)',
    },
    indicatorContainer: {
      '&:hover': {
        cursor: 'move',
      },
      opacity: 0.5,
      marginBottom: -24,
      minHeight: 20,
      width: '100%',
    },
    linkIcon: {
      color: theme.palette.text.secondary,
    },
  })
);

export default function BaseInfoCard({
  segment,
  isActiveCard,
}: BaseInfoCardProps): JSX.Element {
  const classes = useStyles();
  const [displayDragIndicator, setDisplayDragIndicator] = React.useState(false);
  const title = '';

  // if (isSuperset(segment.trainingSetTypeId)) {
  //   title = 'Superset';
  // } else if (isStraightSet(segment.trainingSetTypeId)) {
  //   title = 'Straight set';
  // }

  return (
    <div
      onMouseOver={() => {
        setDisplayDragIndicator(true);
      }}
      onMouseLeave={() => {
        setDisplayDragIndicator(false);
      }}
    >
      <Grid
        item
        xs={12}
        container
        justify={'center'}
        className={clsx('segment-drag-handle', classes.indicatorContainer)}
      >
        <Fade in={displayDragIndicator || isActiveCard}>
          <DragIndicatorIcon
            className={clsx(classes.dragIndicator)}
            fontSize={'small'}
          />
        </Fade>
      </Grid>
      <Card>
        <CardHeader
          disableTypography
          title={
            <Grid container alignItems={'center'} justify={'space-between'}>
              <Grid item>
                <Grid container alignItems={'center'} spacing={2}>
                  <Grid item>
                    <Link />
                  </Grid>
                  <Grid item>
                    <Typography variant={'h6'} color={'textSecondary'}>
                      {'Superset'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <SegmentActionMenu segmentId={'lkj'} />
              </Grid>
            </Grid>
          }
        />

        <CardContent>
          <Grid container>
            <Grid item xs={9}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant={'h6'} color={'textPrimary'}>
                    {'1. Bent Over Rows'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    container
                    spacing={2}
                    alignItems={'center'}
                    style={{ height: '100%' }}
                  >
                    <Grid item xs={8}>
                      <Divider variant={'fullWidth'} />
                    </Grid>
                    <Grid item xs={2}>
                      <Link fontSize={'large'} className={classes.linkIcon} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant={'h6'} color={'textPrimary'}>
                    {'2. Skull Crushers'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid
                container
                alignItems={'center'}
                justify={'flex-end'}
                style={{ height: '100%' }}
              >
                <Grid item xs={12}>
                  <Card
                    style={{
                      backgroundColor: '#651fff',
                      textAlign: 'center',
                      color: '#fff',
                    }}
                  >
                    <Grid
                      container
                      alignItems={'center'}
                      justify={'center'}
                      style={{ minHeight: '6vh' }}
                    >
                      <Grid item>
                        <Typography
                          variant={'h6'}
                          // color={'textSecondary'}
                          // style={{ marginTop: 12, marginBottom: 12 }}
                        >
                          {'3 Sets'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

interface BaseInfoCardProps {
  isActiveCard?: boolean;
  segment?: Segment;
}
