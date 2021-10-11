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
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { scroller } from 'react-scroll';
import BuilderAppBar from '../BuilderAppBar';
import RoutineTitle from './components/RoutineTitle';
import { Phase, Segment } from 'workout-app-common-core';
import ClickToAddCard from './components/ClickToAddCard';
import { State } from '../../../../../configs/redux/store';
import { arrayMoveImmutable as arrayMove } from 'array-move';
import PhaseAppBar from './components/phase-app-bar/PhaseAppBar';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import RoutineInfoCardActions from './components/RoutineInfoCardActions';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ExerciseInfoCard from './components/exercise-segment/ExerciseInfoCard';
import { reorderRoutineSegments } from '../../../../../creators/routine-builder/builder';

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
    selectedRow: {
      zIndex: 1000,
    },
  })
);

const RoutineInfoCard = ({
  phases,
  reorderSegments,
  toggleSideDrawerHandler,
}: RoutineInfoCardProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  const [openCard, setOpenCard] = React.useState('');
  const [isEditing, setIsEditing] = React.useState(false);

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

  const orderAndUpdate = (dropProps: DropResult) => {
    const { removedIndex, addedIndex, payload } = dropProps;
    if (removedIndex !== null && addedIndex !== null) {
      const reorderedArray: Segment[] = arrayMove(
        payload.segments,
        removedIndex,
        addedIndex
      );
      reorderedArray.map((segment, index) => {
        segment.order = index + 1;
      });
      reorderSegments(payload.phaseId, reorderedArray);
    }
  };

  return (
    <Card raised={false} square className={classes.root}>
      <BuilderAppBar isEditing={isEditing} editClickHandler={setIsEditing} />
      <CardContent>
        <RoutineTitle isEditing={isEditing} />
        {phases.map((phase, index) => {
          return (
            <List
              key={index}
              subheader={<PhaseAppBar phase={phase} />}
              className={clsx(classes.listBackground, {
                [classes.topMargin]: phase.order > 1,
              })}
            >
              <Container
                dragClass={classes.selectedRow}
                dragHandleSelector={'.segment-drag-handle'}
                onDrop={(e: DropResult) => {
                  orderAndUpdate(e);
                }}
                getChildPayload={() => {
                  return {
                    phaseId: phase.id,
                    segments: phase.segments,
                  };
                }}
              >
                {phase.segments.map((segment) => {
                  const listId = `list-item-${segment.id}`;
                  return (
                    <Draggable key={listId}>
                      <ListItem id={listId}>
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
                    </Draggable>
                  );
                })}
              </Container>
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
  reorderSegments: (phaseId: string, segments: Segment[]) => void;
}

const mapStateToProps = (state: State): RoutineInfoCardProps => {
  return {
    phases: state.routineBuilderState.selectedRoutine.phases,
  } as unknown as RoutineInfoCardProps;
};

const mapDispatchToProps = (dispatch: Dispatch): RoutineInfoCardProps =>
  ({
    reorderSegments: (phaseId: string, segments: Segment[]) => {
      dispatch(reorderRoutineSegments(phaseId, segments));
    },
  } as unknown as RoutineInfoCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(RoutineInfoCard);
