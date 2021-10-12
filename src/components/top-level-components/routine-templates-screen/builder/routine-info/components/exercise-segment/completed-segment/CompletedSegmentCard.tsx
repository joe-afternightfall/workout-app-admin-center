import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  isStraightSet,
  isSuperset,
  NightfallMoreVertMenu,
  Segment,
} from 'workout-app-common-core';
import {
  Fade,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  Collapse,
} from '@material-ui/core';
import clsx from 'clsx';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { Link } from '@material-ui/icons';
import SegmentActionMenu from '../editing-segment/components/action-menu/SegmentActionMenu';

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

export default function CompletedSegmentCard({
  segment,
  isActiveCard,
  editClickHandler,
}: CompletedSegmentCardProps): JSX.Element {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [displayDragIndicator, setDisplayDragIndicator] = React.useState(false);
  let title = '';

  const superset = isSuperset(segment.trainingSetTypeId);
  const straightSet = isStraightSet(segment.trainingSetTypeId);

  if (superset) {
    title = 'Superset';
  } else if (straightSet) {
    title = 'Straight set';
  }

  return (
    <div
      onMouseOver={() => {
        setDisplayDragIndicator(true);
      }}
      onMouseLeave={() => {
        setDisplayDragIndicator(false);
      }}
      onClick={() => setExpanded(true)}
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
                      {title}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <NightfallMoreVertMenu
                  id={segment.id}
                  menuItems={[
                    {
                      title: 'Edit',
                      clickHandler: () => {
                        editClickHandler();
                      },
                    },
                  ]}
                />
              </Grid>
            </Grid>
          }
        />

        <CardContent>
          <Grid container>
            <Grid
              item
              xs={9}
              container
              alignItems={'center'}
              // style={{ height: '100%' }}
            >
              {/*todo: superset container */}
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

              {/*<Grid item>*/}
              {/*// todo: straight set container*/}
              {/*  <Typography variant={'h6'} color={'textPrimary'}>*/}
              {/*    {'1. Bent Over Rows'}*/}
              {/*  </Typography>*/}
              {/*</Grid>*/}
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

        <Collapse in={expanded} timeout={'auto'} unmountOnExit>
          <CardContent style={{ marginTop: 12 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} container>
                <Grid item xs={6} container justify={'center'}>
                  <Typography variant={'h6'} color={'textPrimary'}>
                    {'30 seconds'}
                  </Typography>
                </Grid>
                <Grid item xs={6} container justify={'center'}>
                  <Typography variant={'h6'} color={'textPrimary'}>
                    {'60 seconds'}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} container>
                <Grid item xs={6} container justify={'center'}>
                  <Typography variant={'h6'} color={'textSecondary'}>
                    {'rest between sets'}
                  </Typography>
                </Grid>
                <Grid item xs={6} container justify={'center'}>
                  <Typography variant={'h6'} color={'textSecondary'}>
                    {'rest between next segment'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

interface CompletedSegmentCardProps {
  isActiveCard: boolean;
  segment: Segment;
  editClickHandler: () => void;
}
