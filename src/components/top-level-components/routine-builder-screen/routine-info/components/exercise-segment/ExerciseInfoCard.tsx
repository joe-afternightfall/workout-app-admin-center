import clsx from 'clsx';
import React from 'react';
import { Segment } from 'workout-app-common-core';
import { Card, Grid, Fade } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CompletedSegmentCard from './completed-segment/CompletedSegmentCard';
import EditingSegmentContainer from './editing-segment/EditingSegmentContainer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardRoot: {
      // minHeight: '42vh',
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
  })
);

export default function ExerciseInfoCard({
  segment,
  editHandler,
  isActiveCard,
  isEditingCard,
  cardClickedHandler,
  doneEditingHandler,
}: ExerciseInfoCardProps): JSX.Element {
  const classes = useStyles();
  const [displayIcons, setDisplayIcons] = React.useState(false);

  const shouldDisplay = displayIcons || isActiveCard;

  return (
    <div
      onMouseOver={() => {
        setDisplayIcons(true);
      }}
      onMouseLeave={() => {
        setDisplayIcons(false);
      }}
    >
      <Grid
        item
        xs={12}
        container
        justify={'center'}
        className={clsx('segment-drag-handle', classes.indicatorContainer)}
      >
        <Fade in={shouldDisplay}>
          <DragIndicatorIcon
            className={clsx(classes.dragIndicator)}
            fontSize={'small'}
          />
        </Fade>
      </Grid>
      <Card
        onClick={cardClickedHandler}
        className={clsx(classes.cardRoot, {
          [classes.activeCard]: isActiveCard,
        })}
      >
        {isEditingCard ? (
          <EditingSegmentContainer
            segment={segment}
            doneHandler={doneEditingHandler}
          />
        ) : (
          <CompletedSegmentCard
            segment={segment}
            editClickHandler={editHandler}
            displayIcons={shouldDisplay}
          />
        )}
      </Card>
    </div>
  );
}

interface ExerciseInfoCardProps {
  segment: Segment;
  cardClickedHandler: () => void;
  doneEditingHandler: () => void;
  editHandler: () => void;
  isActiveCard: boolean;
  isEditingCard: boolean;
}
