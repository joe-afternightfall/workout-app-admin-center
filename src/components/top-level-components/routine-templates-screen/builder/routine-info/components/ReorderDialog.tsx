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
  CardActionArea,
  List,
  ListItem,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

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
  })
);

const ReorderDialog = () => {
  const classes = useStyles();
  // arrayMove(foundPhase.segments, action.fromIndex, action.toIndex).map(
  //   (segment, index) => {
  //     segment.order = index + 1;
  //   }
  // );

  // const orderAndUpdate = (phase: Phase, dropProps: DropResult) => {
  //   const { removedIndex, addedIndex } = dropProps;
  //   if (removedIndex !== null && addedIndex !== null) {
  //   }
  // };

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

  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <AddIcon />
      </IconButton>
      <Dialog
        fullWidth
        open={open}
        maxWidth={'sm'}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <List style={{ width: '400px' }}>
            <Container
              dragClass={classes.selectedRow}
              dragHandleSelector={'.drag-handle'}
              onDrop={(e: DropResult) => {
                console.log('e.payload: ' + JSON.stringify(e.payload));
                console.log('e.payload: ' + JSON.stringify(e.removedIndex));
                console.log('e.payload: ' + JSON.stringify(e.addedIndex));
                // orderAndUpdate(phase, e);
              }}
            >
              {options.map((option, index) => {
                return (
                  <Draggable key={index}>
                    <ListItem
                      className={'drag-handle'}
                      style={{ width: '400px' }}
                    >
                      <Card style={{ width: '400px' }}>
                        <CardContent>
                          <CardActionArea>{'draggable card'}</CardActionArea>
                        </CardContent>
                      </Card>
                    </ListItem>
                  </Draggable>
                );
              })}
            </Container>
          </List>
        </DialogContent>
        <DialogActions>
          <Button className={classes.deleteButton}></Button>
          <Button color={'primary'} autoFocus>
            {'Go Back'}
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
