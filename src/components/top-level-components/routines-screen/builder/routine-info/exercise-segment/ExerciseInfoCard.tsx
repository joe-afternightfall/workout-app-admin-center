import React from 'react';
import clsx from 'clsx';
import {
  Card,
  List,
  Grid,
  Button,
  Divider,
  ListItem,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
} from '@material-ui/core';
import { Segment } from 'workout-app-common-core';
import SetIncrementer from './components/SetIncrementer';
import SetTypeDropdown from './components/SetTypeHeader';
import ExerciseListItem from './components/ExerciseListItem';
import RestBetweenOptions from './components/RestBetweenOptions';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ExerciseActionMenu from './components/action-menu/ExerciseActionMenu';

const useStyles = makeStyles(() =>
  createStyles({
    animate: {
      transition: 'transform .35s ease-in-out',
    },
    grow: {
      // transform: 'scale(1.5)',
      height: '100%',
    },
  })
);

export default function ExerciseInfoCard({
  segment,
  isActiveCard,
  scrollToHandler,
}: ExerciseInfoCardProps): JSX.Element {
  const classes = useStyles();
  let displayActionMenu = false;

  if (isActiveCard && segment.exercises.length > 0) {
    displayActionMenu = true;
  } else if (isActiveCard && segment.trainingSetTypeId !== '') {
    displayActionMenu = true;
  }

  const emptySetType = segment.trainingSetTypeId === '';
  const title = `Segment #${segment.order}`;
  return (
    <Card
      onClick={scrollToHandler}
      className={clsx(classes.animate, {
        [classes.grow]: isActiveCard,
      })}
    >
      <CardHeader
        disableTypography={emptySetType}
        title={
          emptySetType ? (
            <Typography variant={'h5'} color={'textSecondary'}>
              {title}
            </Typography>
          ) : (
            title
          )
        }
        subheader={<SetTypeDropdown segment={segment} />}
        action={
          displayActionMenu && <ExerciseActionMenu segmentId={segment.id} />
        }
      />
      <CardContent>
        <List>
          <Divider variant={'middle'} />
          {emptySetType && (
            <ListItem style={{ marginTop: 12 }}>
              <Grid container justify={'center'}>
                <Typography variant={'h6'} color={'textSecondary'}>
                  {'select a set type to continue'}
                </Typography>
              </Grid>
            </ListItem>
          )}

          {isActiveCard && !emptySetType && (
            <>
              <ExerciseListItem segment={segment} />

              <Divider variant={'middle'} />

              <ListItem>
                <SetIncrementer segment={segment} />
              </ListItem>
              <ListItem>
                <RestBetweenOptions
                  segmentId={segment.id}
                  restBetweenNextSegmentValue={
                    segment.secondsRestBetweenNextSegment
                  }
                  restBetweenSetValue={segment.secondsRestBetweenSets}
                />
              </ListItem>
            </>
          )}
        </List>
        <Divider variant={'middle'} />
      </CardContent>
      {isActiveCard && !emptySetType && (
        <CardActions>
          <Grid container alignItems={'center'} justify={'flex-end'}>
            <Grid item>
              <Button color={'primary'}>{'Save'}</Button>
            </Grid>
          </Grid>
        </CardActions>
      )}
    </Card>
  );
}

interface ExerciseInfoCardProps {
  segment: Segment;
  scrollToHandler: () => void;
  isActiveCard: boolean;
}
