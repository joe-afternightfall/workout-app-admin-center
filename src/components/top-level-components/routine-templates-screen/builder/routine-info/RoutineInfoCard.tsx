import clsx from 'clsx';
import React from 'react';
import {
  Card,
  List,
  Divider,
  ListItem,
  CardContent,
  ListItemText,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { scroller } from 'react-scroll';
import { Phase } from 'workout-app-common-core';
import RoutineTitle from './components/RoutineTitle';
import ClickToAddCard from './components/ClickToAddCard';
import { State } from '../../../../../configs/redux/store';
import ExerciseInfoCard from './components/exercise-segment/ExerciseInfoCard';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import RoutineInfoCardActions from './components/RoutineInfoCardActions';
import PhaseAppBar from './components/phase-app-bar/PhaseAppBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      boxShadow: 'none',
      backgroundColor: theme.palette.background.paper,
    },
    listBackground: {
      borderRadius: 6,
      backgroundColor: '#ECECEC',
    },
    phaseSubheader: {
      width: '50%',
      paddingTop: 16,
    },
    topMargin: {
      marginTop: 16,
    },
  })
);

const RoutineInfoCard = ({
  phases,
  toggleSideDrawerHandler,
}: RoutineInfoCardProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  const [openCard, setOpenCard] = React.useState('');

  const scrollToHandler = (id: string) => {
    if (openCard !== id) {
      setOpenCard(id);
    }
    scrollTo(id);
  };

  const doneHandler = (phaseListId: string) => {
    setOpenCard('');
    scrollTo(phaseListId);
  };

  const scrollTo = (id: string) => {
    scroller.scrollTo(id, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <Card raised={false} square className={classes.root}>
      <RoutineTitle />
      <CardContent>
        {phases.map((phase, index) => {
          return (
            <List
              key={index}
              subheader={<PhaseAppBar phase={phase} />}
              className={clsx(classes.listBackground, {
                [classes.topMargin]: phase.order > 1,
              })}
            >
              {phase.segments.map((segment) => {
                const listId = `list-item-${segment.id}`;
                return (
                  <ListItem id={listId} key={listId}>
                    <Divider />
                    <ListItemText
                      disableTypography
                      primary={
                        <ExerciseInfoCard
                          segment={segment}
                          isActiveCard={openCard === listId}
                          scrollToHandler={() => {
                            scrollToHandler(listId);
                            toggleSideDrawerHandler(true);
                          }}
                          doneHandler={() => {
                            doneHandler(phase.id);
                          }}
                        />
                      }
                    />
                  </ListItem>
                );
              })}
              <ListItem key={'click-to-add-card'}>
                <ListItemText
                  disableTypography
                  primary={<ClickToAddCard phaseId={phase.id} />}
                />
              </ListItem>
            </List>
          );
        })}
      </CardContent>
      <RoutineInfoCardActions />
    </Card>
  );
};

interface PassedInProps {
  toggleSideDrawerHandler: (display: boolean) => void;
}

interface RoutineInfoCardProps {
  phases: Phase[];
}

const mapStateToProps = (state: State): RoutineInfoCardProps => {
  return {
    phases: state.routineBuilderState.selectedRoutine.phases,
  } as unknown as RoutineInfoCardProps;
};

export default connect(mapStateToProps)(RoutineInfoCard);
