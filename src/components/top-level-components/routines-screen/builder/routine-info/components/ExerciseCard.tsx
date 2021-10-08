import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
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
import RestBetweenOptions from './RestBetweenOptions';
import SetTypeDropdown from './SetTypeDropdown';

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

const ExerciseCard = ({
  listId,
  title,
  segment,
  scrollToHandler,
  selectedCardId,
}: ExerciseCardProps & PassedInProps): JSX.Element => {
  const classes = useStyles();

  const isActiveCard = selectedCardId === listId;
  const shouldDisable = React.isValidElement(title);
  console.log('shouldDisable: ' + shouldDisable);

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
            {isStraightSet(segment.trainingSetTypeId) && (
              <ListItem button>
                <ListItemText
                  primary={
                    segment.exercises[0]
                      ? segment.exercises[0].exerciseId
                      : 'Click to add exercise'
                  }
                />
              </ListItem>
            )}

            {isSuperset(segment.trainingSetTypeId) && (
              <>
                <ListItem button>
                  <ListItemText
                    primary={
                      segment.exercises[0]
                        ? segment.exercises[0].exerciseId
                        : 'Click to add exercise 1'
                    }
                  />
                </ListItem>

                <ListItem button>
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
                    <RestBetweenOptions />
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

export interface ExerciseCardProps {
  phases: Phase[];
}

const mapStateToProps = (state: State): ExerciseCardProps => {
  return {
    phases: state.routineBuilderState.selectedRoutine.phases,
  } as unknown as ExerciseCardProps;
};

const mapDispatchToProps = (): ExerciseCardProps =>
  ({} as unknown as ExerciseCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseCard);
