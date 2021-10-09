import clsx from 'clsx';
import React from 'react';
import {
  Card,
  List,
  Divider,
  ListItem,
  CardContent,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { scroller } from 'react-scroll';
import { Phase } from 'workout-app-common-core';
import RoutineTitle from './components/RoutineTitle';
import PhaseDropdown from './components/PhaseDropdown';
import ClickToAddCard from './components/ClickToAddCard';
import { State } from '../../../../../configs/redux/store';
import ExerciseInfoCard from './exercise-segment/ExerciseInfoCard';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      boxShadow: 'none',
      backgroundColor: theme.palette.background.paper,
    },
    animate: {
      transition: 'transform .35s ease-in-out',
    },
    animateListItem: {
      height: '75vh',
    },
    listBackground: {
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
  toggleHandler,
}: RoutineInfoCardProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  const [openCard, setOpenCard] = React.useState('');

  const scrollToSection = (id: string) => {
    if (openCard !== id) {
      setOpenCard(id);
    }

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
              subheader={
                <ListSubheader className={classes.phaseSubheader}>
                  <PhaseDropdown phase={phase} />
                </ListSubheader>
              }
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
                      className={clsx(classes.animate, {
                        [classes.animateListItem]: openCard === listId,
                      })}
                      primary={
                        <ExerciseInfoCard
                          segment={segment}
                          isActiveCard={openCard === listId}
                          scrollToHandler={() => {
                            scrollToSection(listId);
                            toggleHandler(true);
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
    </Card>
  );
};

interface PassedInProps {
  toggleHandler: (display: boolean) => void;
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
