import React from 'react';
import clsx from 'clsx';
import {
  Card,
  List,
  Divider,
  ListItem,
  CardHeader,
  CardContent,
  ListSubheader,
} from '@material-ui/core';
import { Segment } from 'workout-app-common-core';
import SetIncrementer from './components/SetIncrementer';
import SetTypeDropdown from './components/SetTypeHeader';
import ExerciseListItem from './components/ExerciseListItem';
import RestBetweenOptions from './components/RestBetweenOptions';
import { createStyles, makeStyles } from '@material-ui/core/styles';

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
  listId,
  title,
  segment,
  scrollToHandler,
  selectedCardId,
}: ExerciseInfoCardProps): JSX.Element {
  const classes = useStyles();
  const isActiveCard = selectedCardId === listId;
  const shouldDisable = React.isValidElement(title);

  return (
    <Card
      onClick={scrollToHandler}
      className={clsx(classes.animate, {
        [classes.grow]: isActiveCard,
      })}
    >
      <CardHeader disableTypography={shouldDisable} title={title} />
      {isActiveCard && (
        <CardContent>
          <List
            subheader={
              <ListSubheader>
                <SetTypeDropdown segment={segment} />
              </ListSubheader>
            }
          >
            <Divider variant={'middle'} />

            <ExerciseListItem segment={segment} />

            <Divider variant={'middle'} />

            <ListItem>
              <SetIncrementer />
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
          </List>
        </CardContent>
      )}
    </Card>
  );
}

interface ExerciseInfoCardProps {
  title: string | JSX.Element;
  listId: string;
  segment: Segment;
  selectedCardId: string;
  scrollToHandler: () => void;
}
