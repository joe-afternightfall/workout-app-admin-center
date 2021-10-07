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
import { State } from '../../../../../configs/redux/store';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import SetIncrementer from './SetIncrementer';

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

const BaseListItem = ({
  listId,
  title,
  scrollToHandler,
  selectedCardId,
}: BaseListItemProps & PassedInProps): JSX.Element => {
  const classes = useStyles();

  const isActiveCard = selectedCardId === listId;
  const shouldDisable = React.isValidElement(title);
  console.log('shouldDisable: ' + shouldDisable);

  return (
    <ListItem
      // className={clsx(classes.animate, {
      //   [classes.animateListItem]: animate,
      // })}
      id={listId}
      key={listId}
    >
      <ListItemText
        disableTypography
        className={clsx(classes.animate, {
          [classes.animateListItem]: isActiveCard,
        })}
        primary={
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
                  <ListItem>
                    <ListItemText primary={'Exercise 1: Bent Over Rows'} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={'Exercise 2: Air Squats'} />
                  </ListItem>
                </List>
                {/*<Grid container>*/}
                {/*  <Grid item xs={12}>*/}
                {/*    <Typography>{'Exercise 1'}</Typography>*/}
                {/*  </Grid>*/}
                {/*  <SetIncrementer />*/}
                {/*</Grid>*/}
              </CardContent>
            )}
          </Card>
        }
      />
    </ListItem>
  );
};

interface PassedInProps {
  title: string | JSX.Element;
  listId: string;
  selectedCardId: string;
  scrollToHandler: () => void;
}

export interface BaseListItemProps {
  phases: Phase[];
}

const mapStateToProps = (state: State): BaseListItemProps => {
  return {
    phases: state.routineBuilderState.selectedRoutine.phases,
  } as unknown as BaseListItemProps;
};

const mapDispatchToProps = (): BaseListItemProps =>
  ({} as unknown as BaseListItemProps);

export default connect(mapStateToProps, mapDispatchToProps)(BaseListItem);
