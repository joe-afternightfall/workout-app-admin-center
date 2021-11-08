import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { CircuitProps } from '../Circuits';
import AddIcon from '@material-ui/icons/Add';
import ListItem from '@material-ui/core/ListItem';
import { WorkoutCircuitProps } from '../../WorkoutScreen';
import {
  NightfallTooltip,
  NightfallDialogContent,
} from 'workout-app-common-core';
import { Button, Dialog, IconButton, List } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { addCircuit } from '../../../../../../creators/zzz-old-stuff/old-creators';
import { State } from '../../../../../../configs/redux/store';
import { CircuitTypeVO } from '../../../../../../configs/zzz-old-stuff/old-models/CircuitTypeVO';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      color: '#fff',
      borderRadius: 6,
      background: theme.palette.primary.main,
      '&:hover': {
        background: theme.palette.primary.light,
      },
    },
  })
);

const AddCircuitDialog = (props: AddCircuitDialogProps): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (circuit: CircuitTypeVO) => {
    props.addCircuitHandler({
      id: circuit.id,
      name: circuit.name,
      exercises: [],
    });
    handleClose();
  };

  const searchForCircuit = (id: string): boolean => {
    const found = props.circuits.find(
      (circuit: WorkoutCircuitProps) => circuit.id === id
    );

    return found !== undefined;
  };

  return (
    <>
      <NightfallTooltip
        component={
          <IconButton
            color={'primary'}
            className={classes.addButton}
            onClick={handleClickOpen}
          >
            <AddIcon />
          </IconButton>
        }
        title={'Add Circuit'}
        placement={'bottom'}
      />

      <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'xs'}>
        <NightfallDialogContent
          title={'New Circuit'}
          closeClickHandler={handleClose}
          dialogContent={
            <List>
              {props.circuitTypes.map(
                (circuit: CircuitTypeVO, index: number) => {
                  return (
                    <ListItem key={index}>
                      <Button
                        fullWidth
                        color={'primary'}
                        variant={'contained'}
                        onClick={() => {
                          handleClick(circuit);
                        }}
                        disabled={searchForCircuit(circuit.id)}
                      >
                        {circuit.name}
                      </Button>
                    </ListItem>
                  );
                }
              )}
            </List>
          }
          dialogActions={<Button onClick={handleClose}>{'Cancel'}</Button>}
        />
      </Dialog>
    </>
  );
};

interface AddCircuitDialogProps {
  addCircuitHandler: (props: WorkoutCircuitProps) => void;
  circuits: WorkoutCircuitProps[];
  circuitTypes: CircuitTypeVO[];
}

const mapStateToProps = (state: State): CircuitProps => {
  return {
    circuits: state.oldApplicationState.workout.circuits,
    circuitTypes: state.oldApplicationState.circuitTypes,
  } as unknown as CircuitProps;
};

const mapDispatchToProps = (dispatch: Dispatch): AddCircuitDialogProps =>
  ({
    addCircuitHandler: (props: WorkoutCircuitProps) => {
      dispatch(addCircuit(props));
    },
  } as unknown as AddCircuitDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(AddCircuitDialog);
