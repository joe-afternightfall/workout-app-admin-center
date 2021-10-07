import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { Phase } from 'workout-app-common-core';
import { State } from '../../../../../../configs/redux/store';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import SetIncrementer from '../../components/SetIncrementer';
import RestBetweenOptions from './RestBetweenOptions';

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
          <List>
            {/*todo: 1. Exercises*/}
            {/*todo: 2. Workout Category */}
            {/*todo: 3. Number of sets*/}
            {/*todo: 4. Rest between*/}
            <ListItem>
              <ListItemText primary={'Exercise 1: Bent Over Rows'} />
            </ListItem>
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
