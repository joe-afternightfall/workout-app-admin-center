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
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { arrayMoveImmutable as arrayMove } from 'array-move';

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

const ReorderDialog = () => {
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

  const [dragList, setDragList] =
    React.useState<{ id: string; order: number; title: string }[]>(options);

  const orderAndUpdate = (dropProps: DropResult) => {
    const { removedIndex, addedIndex } = dropProps;
    if (removedIndex !== null && addedIndex !== null) {
      const reorderedArray = arrayMove(dragList, removedIndex, addedIndex);
      reorderedArray.map((option, index) => {
        option.order = index + 1;
      });

      setDragList(reorderedArray);
    }
  };

  const handleMouseEvent = (cardId: string, elevation: number) => {
    setElevation(elevation);
    setHoveringOverCard(cardId);
  };

  return (
    <div>
      <IconButton onClick={openDialog}>
        <AddIcon />
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
              {dragList
                .sort((a, b) => a.order - b.order)
                .map((option, index) => {
                  return (
                    <Draggable key={index}>
                      <ListItem
                        className={'drag-handle'}
                        style={{ width: '100%' }}
                      >
                        <Card
                          elevation={
                            hoveringOverCard === option.id ? elevation : 3
                          }
                          style={{ width: '100%' }}
                          onMouseEnter={() => {
                            handleMouseEvent(option.id, 5);
                          }}
                          onMouseLeave={() => {
                            handleMouseEvent('', -1);
                          }}
                          className={classes.card}
                          onClick={() => {
                            handleMouseEvent(option.id, 10);
                          }}
                        >
                          <CardContent>{option.title}</CardContent>
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
  actionHandler: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): ReorderDialogProps =>
  ({} as unknown as ReorderDialogProps);

export default connect(null, mapDispatchToProps)(ReorderDialog);
