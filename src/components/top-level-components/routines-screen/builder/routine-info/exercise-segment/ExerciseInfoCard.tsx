import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Typography,
} from '@material-ui/core';
import {
  isStraightSet,
  isSuperset,
  Phase,
  Segment,
} from 'workout-app-common-core';
import { State } from '../../../../../../configs/redux/store';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import SetIncrementer from '../../components/SetIncrementer';
import RestBetweenOptions from './components/RestBetweenOptions';
import SetTypeDropdown from './components/SetTypeDropdown';
import { Dispatch } from 'redux';
import {
  deleteExerciseFromSegment,
  selectExerciseForSegment,
} from '../../../../../../creators/routine-builder/builder';
import Blinker from '../../../../Blinker';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(() =>
  createStyles({
    animate: {
      transition: 'transform .35s ease-in-out',
    },
    grow: {
      // transform: 'scale(1.5)',
      height: '100%',
    },
    animateListItem: {
      height: '75vh',
    },
  })
);

const ExerciseInfoCard = ({
  listId,
  title,
  segment,
  scrollToHandler,
  selectedCardId,
  selectExerciseHandler,
  selectExerciseForSegment,
  deleteExerciseFromSegmentHandler,
}: ExerciseInfoCardProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  const isActiveCard = selectedCardId === listId;
  const shouldDisable = React.isValidElement(title);
  const hasExercise = segment.exercises[0];

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
            {/*todo: 1. Exercises*/}
            {/*todo: 3. Number of sets*/}
            {/*todo: 4. Rest between*/}
            {isStraightSet(segment.trainingSetTypeId) &&
              (selectExerciseForSegment.segmentId === segment.id &&
              selectExerciseForSegment.order === 1 ? (
                <Blinker
                  shouldBlink={true}
                  component={
                    <ListItem>
                      <ListItemText primary={'Select Exercise'} />
                    </ListItem>
                  }
                />
              ) : segment.exercises[0] && segment.exercises[0].exerciseId ? (
                <ListItem>
                  <ListItemText primary={segment.exercises[0].exerciseId} />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => {
                        deleteExerciseFromSegmentHandler(
                          segment.exercises[0].exerciseId
                        );
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ) : (
                <ListItem
                  button
                  onClick={() => {
                    selectExerciseHandler(1);
                  }}
                >
                  <ListItemText
                    primary={
                      segment.exercises[0]
                        ? segment.exercises[0].exerciseId
                        : 'Click to add exercise 1'
                    }
                  />
                </ListItem>
              ))}

            {isSuperset(segment.trainingSetTypeId) && (
              <>
                <ListItem
                  button
                  onClick={() => {
                    selectExerciseHandler(1);
                  }}
                >
                  <ListItemText
                    primary={
                      segment.exercises[0]
                        ? segment.exercises[0].exerciseId
                        : 'Click to add exercise 1'
                    }
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    selectExerciseHandler(2);
                  }}
                >
                  <ListItemText
                    primary={
                      segment.exercises[1]
                        ? segment.exercises[1].exerciseId
                        : 'Click to add exercise 2'
                    }
                  />
                </ListItem>
              </>
            )}
            <Divider variant={'middle'} />
            <ListItem disableGutters>
              <Grid container>
                <Grid item xs={12} container>
                  <Grid item xs={6}>
                    <SetIncrementer />
                  </Grid>
                  <Grid item xs={6}>
                    <RestBetweenOptions
                      restBetweenNextSegmentValue={
                        segment.secondsRestBetweenNextSegment
                      }
                      restBetweenSetValue={segment.secondsRestBetweenSets}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6} container justify={'center'}>
                    <Typography color={'textSecondary'}>
                      {'number of sets'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} container justify={'center'}>
                    <Typography color={'textSecondary'}>
                      {'rest between'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
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
