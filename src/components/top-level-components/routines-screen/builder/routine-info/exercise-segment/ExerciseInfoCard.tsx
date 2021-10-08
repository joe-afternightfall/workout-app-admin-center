import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  List,
  Divider,
  ListItem,
  CardHeader,
  CardContent,
  ListSubheader,
} from '@material-ui/core';
import { Phase, Segment } from 'workout-app-common-core';
import { State } from '../../../../../../configs/redux/store';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import SetIncrementer from './components/SetIncrementer';
import RestBetweenOptions from './components/RestBetweenOptions';
import SetTypeDropdown from './components/SetTypeHeader';
import { Dispatch } from 'redux';
import {
  deleteExerciseFromSegment,
  selectExerciseForSegment,
} from '../../../../../../creators/routine-builder/builder';
import ExerciseListItem from './components/ExerciseListItem';

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

const ExerciseInfoCard = ({
  listId,
  title,
  segment,
  scrollToHandler,
  selectedCardId,
}: ExerciseInfoCardProps & PassedInProps): JSX.Element => {
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
};

interface PassedInProps {
  title: string | JSX.Element;
  listId: string;
  segment: Segment;
  selectedCardId: string;
  scrollToHandler: () => void;
}

export interface ExerciseInfoCardProps {
  phases: Phase[];
  selectExerciseHandler: (order: number) => void;
  selectExerciseForSegment: {
    order: number;
    segmentId: string;
  };
  deleteExerciseFromSegmentHandler: (exerciseId: string) => void;
}

const mapStateToProps = (state: State): ExerciseInfoCardProps => {
  return {
    phases: state.routineBuilderState.selectedRoutine.phases,
    selectExerciseForSegment:
      state.routineBuilderState.selectExerciseForSegment,
  } as unknown as ExerciseInfoCardProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): ExerciseInfoCardProps =>
  ({
    selectExerciseHandler: (order: number) => {
      dispatch(selectExerciseForSegment(ownProps.segment.id, order));
    },
    deleteExerciseFromSegmentHandler: (exerciseId: string) => {
      dispatch(deleteExerciseFromSegment(ownProps.segment.id, exerciseId));
    },
  } as unknown as ExerciseInfoCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseInfoCard);
