import React from 'react';
import {
  List,
  Card,
  Grid,
  Divider,
  ListItem,
  Typography,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  Fade,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { WorkoutTimer } from 'workout-app-common-core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import EditingSegmentContainer from '../../../top-level-components/routine-builder-screen/routine-info/components/exercise-segment/editing-segment/EditingSegmentContainer';
import CompletedSegmentCard from '../../../top-level-components/routine-builder-screen/routine-info/components/exercise-segment/completed-segment/CompletedSegmentCard';

const useStyles = makeStyles(() =>
  createStyles({
    contentWrapper: {
      minHeight: '30vh',
      height: '100%',
      textAlign: 'center',
      paddingBottom: 16,
    },
    dialogTitle: {
      padding: '16px 0',
    },
    dragIndicator: {
      transform: 'rotate(90deg)',
    },
    indicatorContainer: {
      '&:hover': {
        cursor: 'move',
      },
      opacity: 0.5,
      // marginBottom: -24,
      minHeight: 20,
      width: '100%',
    },
  })
);

export default function TimerListItemCard({
  timer,
}: TimerListItemCardProps): JSX.Element {
  const classes = useStyles();
  const [displayDragHandler, setDisplayDragHandler] = React.useState(false);

  return (
    <div
      onMouseOver={() => {
        setDisplayDragHandler(true);
      }}
      onMouseLeave={() => {
        setDisplayDragHandler(false);
      }}
    >
      {/*<Grid*/}
      {/*  item*/}
      {/*  xs={12}*/}
      {/*  container*/}
      {/*  justify={'center'}*/}
      {/*  className={clsx(*/}
      {/*    'timer-list-item-drag-handle',*/}
      {/*    classes.indicatorContainer*/}
      {/*  )}*/}
      {/*>*/}
      {/*  <Fade in={displayDragHandler}>*/}
      {/*    <DragIndicatorIcon*/}
      {/*      className={clsx(classes.dragIndicator)}*/}
      {/*      fontSize={'small'}*/}
      {/*    />*/}
      {/*  </Fade>*/}
      {/*</Grid>*/}
      <Card style={{ paddingTop: 4 }}>
        <ListItem>
          <ListItemIcon>
            <Typography>{`${timer.order}.`}</Typography>
          </ListItemIcon>
          <ListItemText
            primary={`${timer.seconds} seconds`}
            secondary={timer.stepperTitle}
          />
          <ListItemSecondaryAction>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Card>
    </div>
  );
}

interface TimerListItemCardProps {
  timer: WorkoutTimer;
}
