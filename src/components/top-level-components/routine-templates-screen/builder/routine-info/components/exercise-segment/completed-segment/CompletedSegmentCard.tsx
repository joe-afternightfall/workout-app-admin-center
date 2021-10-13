import React from 'react';
import {
  Grid,
  Card,
  Divider,
  Collapse,
  Typography,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
} from '@material-ui/core';
import {
  Segment,
  isSuperset,
  isStraightSet,
  NightfallMoreVertMenu,
} from 'workout-app-common-core';
import { Link, ArrowRightAlt as Arrow, ExpandMore } from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: theme.palette.text.secondary,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  })
);

export default function CompletedSegmentCard({
  segment,
  editClickHandler,
}: CompletedSegmentCardProps): JSX.Element {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let title = '';
  let icon: JSX.Element;

  const superset = isSuperset(segment.trainingSetTypeId);
  const straightSet = isStraightSet(segment.trainingSetTypeId);

  if (superset) {
    title = 'Superset';
    icon = <Link className={classes.icon} fontSize={'large'} />;
  } else if (straightSet) {
    title = 'Straight set';
    icon = <Arrow className={classes.icon} fontSize={'large'} />;
  } else {
    icon = <React.Fragment />;
  }

  return (
    <>
      <CardHeader
        disableTypography
        title={
          <Grid container alignItems={'center'} justify={'space-between'}>
            <Grid item>
              <Grid container alignItems={'center'} spacing={2}>
                <Grid item>{icon}</Grid>
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
            {superset && (
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant={'h6'} color={'textPrimary'}>
                    {`1. ${
                      segment.exercises[0] && segment.exercises[0].exerciseId
                    }`}
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
                      {icon}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant={'h6'} color={'textPrimary'}>
                    {`2. ${
                      segment.exercises[1] && segment.exercises[1].exerciseId
                    }`}
                  </Typography>
                </Grid>
              </Grid>
            )}
            {straightSet && (
              <Grid>
                <Typography variant={'h6'} color={'textPrimary'}>
                  {`1. ${
                    segment.exercises[0] && segment.exercises[0].exerciseId
                  }`}
                </Typography>
              </Grid>
            )}
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
                    backgroundColor: '#673AB7',
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
                        {`${
                          segment.exercises[0] &&
                          segment.exercises[0].sets.length
                        } Sets`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
        >
          <ExpandMore />
        </IconButton>
      </CardActions>

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
    </>
  );
}

interface CompletedSegmentCardProps {
  segment: Segment;
  editClickHandler: () => void;
}
