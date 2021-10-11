import React from 'react';
import clsx from 'clsx';
import {
  Card,
  List,
  Divider,
  ListItem,
  CardHeader,
  CardContent,
  Typography,
  Grid,
} from '@material-ui/core';
import ExerciseInfoCardActions from './ExerciseInfoCardActions';
import SetIncrementer from './components/inputs/SetIncrementer';
import SetTypeDropdown from './components/inputs/SetTypeHeader';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import RestBetweenOptions from './components/inputs/RestBetweenOptions';
import ListItemMessage from './components/base-components/ListItemMessage';
import SegmentActionMenu from './components/action-menu/SegmentActionMenu';
import { isStraightSet, isSuperset, Segment } from 'workout-app-common-core';
import ExerciseListItem from './components/exercise-list-item/ExerciseListItem';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

const useStyles = makeStyles(() =>
  createStyles({
    animate: {
      transition: 'transform .35s ease-in-out',
    },
    activeCard: {
      height: '100%',
      borderLeft: '6px solid #4285f4',
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
      minHeight: '3vh',
      width: '100%',
    },
  })
);

export default function ExerciseInfoCard({
  segment,
  doneHandler,
  isActiveCard,
  scrollToHandler,
}: ExerciseInfoCardProps): JSX.Element {
  const classes = useStyles();
  let displayActionMenu = false;
  let displayInputs = false;

  if (isActiveCard && segment.exercises.length > 0) {
    displayActionMenu = true;
  } else if (isActiveCard && segment.trainingSetTypeId !== '') {
    displayActionMenu = true;
  }

  const emptySetType = segment.trainingSetTypeId === '';
  const title = `Segment #${segment.order}`;

  if (isSuperset(segment.trainingSetTypeId)) {
    if (
      segment.exercises[0] &&
      segment.exercises[0].exerciseId !== '' &&
      segment.exercises[1] &&
      segment.exercises[1].exerciseId !== ''
    ) {
      displayInputs = true;
    }
  } else if (isStraightSet(segment.trainingSetTypeId)) {
    if (segment.exercises[0] && segment.exercises[0].exerciseId !== '') {
      displayInputs = true;
    }
  }

  return (
    <React.Fragment>
      <Grid
        item
        xs={12}
        container
        justify={'center'}
        className={clsx('segment-drag-handle', classes.indicatorContainer)}
      >
        <DragIndicatorIcon
          className={clsx(classes.dragIndicator)}
          fontSize={'small'}
        />
      </Grid>
      <Card
        onClick={scrollToHandler}
        className={clsx(classes.animate, {
          [classes.activeCard]: isActiveCard,
        })}
      >
        <CardHeader
          disableTypography={emptySetType}
          title={
            <Typography variant={'h6'} color={'textSecondary'}>
              {title}
            </Typography>
          }
          subheader={<SetTypeDropdown segment={segment} />}
          action={
            displayActionMenu && <SegmentActionMenu segmentId={segment.id} />
          }
        />
        <CardContent>
          <List>
            <Divider variant={'middle'} style={{ marginBottom: 12 }} />
            {emptySetType && (
              <ListItemMessage message={'select a set type to continue'} />
            )}

            {isActiveCard && !emptySetType && (
              <>
                <ExerciseListItem segment={segment} />

                {displayInputs ? (
                  <>
                    <Divider variant={'middle'} />
                    <ListItem style={{ marginTop: 16, marginBottom: 16 }}>
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
                ) : (
                  <>
                    <Divider variant={'middle'} style={{ marginTop: 12 }} />
                    <ListItemMessage message={'select exercises to continue'} />
                  </>
                )}
              </>
            )}
          </List>
        </CardContent>
        {isActiveCard && !emptySetType && (
          <ExerciseInfoCardActions
            segment={segment}
            doneHandler={doneHandler}
          />
        )}
      </Card>
    </React.Fragment>
  );
}

interface ExerciseInfoCardProps {
  segment: Segment;
  scrollToHandler: () => void;
  doneHandler: () => void;
  isActiveCard: boolean;
}
