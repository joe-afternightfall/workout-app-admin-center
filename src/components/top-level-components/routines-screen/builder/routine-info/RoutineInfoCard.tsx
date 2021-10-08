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
  ListItemText,
  ListSubheader,
  Typography,
} from '@material-ui/core';
import { State } from '../../../../../configs/redux/store';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { scroller } from 'react-scroll';
import ExerciseCard from './components/ExerciseCard';
import { Phase, RoutineTemplateVO } from 'workout-app-common-core';
import ClickToAddCard from './components/ClickToAddCard';
import ActionMenu from './components/ActionMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      // maxWidth: 360,
      boxShadow: 'none',
      backgroundColor: theme.palette.background.paper,
    },
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

const RoutineInfoCard = ({
  phases,
  routineTitle,
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
      <CardHeader
        title={routineTitle ? routineTitle : 'New Routine'}
        subheader={'workout category'}
        action={<ActionMenu />}
      />
      <CardContent
        id={'routine-info-list'}
        // style={{ height: '80vh', overflowY: 'scroll' }}
      >
        {phases.map((phase, index) => {
          return (
            <List
              key={index}
              subheader={<ListSubheader>{'Phase'}</ListSubheader>}
            >
              {phase.segments.map((segment) => {
                const listId = `list-item-${segment.order}`;
                return (
                  <ListItem id={listId} key={listId}>
                    <Divider />
                    <ListItemText
                      disableTypography
                      className={clsx(classes.animate, {
                        [classes.animateListItem]: openCard === listId,
                      })}
                      primary={
                        <ExerciseCard
                          title={'Exercise Card ' + segment.order}
                          segment={segment}
                          selectedCardId={openCard}
                          listId={listId}
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
  routineTitle: string;
  phases: Phase[];
}

const mapStateToProps = (state: State): RoutineInfoCardProps => {
  return {
    routineTitle: state.routineBuilderState.selectedRoutine.name,
    phases: state.routineBuilderState.selectedRoutine.phases,
  } as unknown as RoutineInfoCardProps;
};

const mapDispatchToProps = (): RoutineInfoCardProps =>
  ({} as unknown as RoutineInfoCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(RoutineInfoCard);
