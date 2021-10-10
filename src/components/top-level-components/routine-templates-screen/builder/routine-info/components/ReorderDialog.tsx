import React from 'react';
import {
  Card,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CardContent,
  List,
  ListItem,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { arrayMoveImmutable as arrayMove } from 'array-move';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { getPhaseName, Phase } from 'workout-app-common-core';
import { State } from '../../../../../../configs/redux/store';
import { reorderRoutinePhases } from '../../../../../../creators/routine-builder/builder';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    deleteButton: {
      color: theme.palette.error.main,
    },
    content: {
      width: '100%',

      minHeight: '20vh',
    },
    selectedRow: {
      zIndex: 1000,
    },
    card: {
      '&:hover': {
        cursor: 'grab',
      },
    },
  })
);

const options = [
  {
    id: 'card-1',
    order: 1,
    title: 'Card #1',
  },
  {
    id: 'card-2',
    order: 2,
    title: 'Card #2',
  },
  {
    id: 'card-3',
    order: 3,
    title: 'Card #3',
  },
  {
    id: 'card-4',
    order: 4,
    title: 'Card #4',
  },
  {
    id: 'card-5',
    order: 5,
    title: 'Card #5',
  },
  {
    id: 'card-6',
    order: 6,
    title: 'Card #6',
  },
];

const ReorderDialog = ({ phases, reorderPhases }: ReorderDialogProps) => {
  const classes = useStyles();

  const [hoveringOverCard, setHoveringOverCard] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [elevation, setElevation] = React.useState(2);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  console.log('phases: ' + JSON.stringify(phases));

  const [dragList, setDragList] =
    React.useState<{ id: string; order: number; title: string }[]>(options);

  const orderAndUpdate = (dropProps: DropResult) => {
    const { removedIndex, addedIndex } = dropProps;
    if (removedIndex !== null && addedIndex !== null) {
      const reorderedArray = arrayMove(phases, removedIndex, addedIndex);
      reorderedArray.map((phase, index) => {
        phase.order = index + 1;
      });
      reorderPhases(reorderedArray);
    }
  };

  const handleMouseEvent = (cardId: string, elevation: number) => {
    setElevation(elevation);
    setHoveringOverCard(cardId);
  };

  return (
    <div>
      <IconButton onClick={openDialog}>
        <CompareArrowsIcon />
      </IconButton>
      <Dialog fullWidth open={open} maxWidth={'sm'} onClose={closeDialog}>
        <DialogTitle>{'Drag and drop to reorder'}</DialogTitle>
        <DialogContent>
          <List style={{ width: '100%' }}>
            <Container
              dragClass={classes.selectedRow}
              dragHandleSelector={'.drag-handle'}
              onDrop={(e: DropResult) => {
                orderAndUpdate(e);
              }}
            >
              {phases &&
                phases
                  .sort((a, b) => a.order - b.order)
                  .map((phase, index) => {
                    return (
                      <Draggable key={index}>
                        <ListItem
                          className={'drag-handle'}
                          style={{ width: '100%' }}
                        >
                          <Card
                            elevation={
                              hoveringOverCard === phase.id ? elevation : 3
                            }
                            style={{ width: '100%' }}
                            onMouseEnter={() => {
                              handleMouseEvent(phase.id, 5);
                            }}
                            onMouseLeave={() => {
                              handleMouseEvent('', -1);
                            }}
                            className={classes.card}
                            onClick={() => {
                              handleMouseEvent(phase.id, 10);
                            }}
                          >
                            {phase.phaseId && (
                              <CardContent>
                                {`${phase.order}. ${getPhaseName(
                                  phase.phaseId
                                )}`}
                              </CardContent>
                            )}
                          </Card>
                        </ListItem>
                      </Draggable>
                    );
                  })}
            </Container>
          </List>
        </DialogContent>
        <DialogActions>
          <Button color={'primary'} autoFocus onClick={closeDialog}>
            {'Done'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

interface ReorderDialogProps {
  phases: Phase[];
  reorderPhases: (phases: Phase[]) => void;
}

const mapStateToProps = (state: State): ReorderDialogProps => {
  return {
    phases: state.routineBuilderState.selectedRoutine.phases
      ? state.routineBuilderState.selectedRoutine.phases
      : [],
  } as unknown as ReorderDialogProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ReorderDialogProps =>
  ({
    reorderPhases: (phases: Phase[]) => {
      dispatch(reorderRoutinePhases(phases));
    },
  } as unknown as ReorderDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(ReorderDialog);
