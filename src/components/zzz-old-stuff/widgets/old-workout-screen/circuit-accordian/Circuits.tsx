import React from 'react';
import {
  Grid,
  Accordion,
  Typography,
  AccordionDetails,
  AccordionActions,
  AccordionSummary,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ExerciseCircuit from './components/ExerciseCircuit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteCircuitDialog from './dialogs/DeleteCircuitDialog';
import { CircuitExercise, WorkoutCircuitProps } from '../WorkoutScreen';
import AddExerciseDialog from './dialogs/add-exercise/AddExerciseDialog';
import { ExerciseTypeVO } from '../../../../../configs/zzz-old-stuff/old-models/ExerciseTypeVO';
import {
  addExerciseSetToCircuit,
  deleteCircuit,
  deleteExerciseFromCircuit,
  deleteExerciseSetFromCircuit,
  toggleAccordion,
  toggleExerciseSetAsDone,
  updateDistanceSetField,
  UpdateDistanceSetFieldProps,
  updateTimeSetField,
  UpdateTimeSetFieldProps,
  updateWorkoutSetField,
  UpdateWorkoutSetFieldProps,
} from '../../../../../creators/zzz-old-stuff/old-creators';
import { State } from '../../../../../configs/redux/store';

const Circuits = (props: CircuitProps): JSX.Element => {
  const handleChange =
    (panel: string) =>
    (e: React.ChangeEvent<Record<string, never>>, isExpanded: boolean) => {
      props.toggleAccordionHandler(isExpanded ? panel : '');
    };

  return (
    <Grid container spacing={3}>
      {props.circuits.map((circuit: WorkoutCircuitProps, index: number) => {
        return (
          <Grid key={index} item xs={12}>
            <Accordion
              expanded={props.expanded === circuit.id}
              onChange={handleChange(circuit.id)}
            >
              <AccordionSummary
                id={`panel-${circuit.id}-header`}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>{`Circuit: ${circuit.name}`}</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Grid container spacing={2}>
                  {circuit.exercises.length === 0 ? (
                    <Grid item container justify={'center'}>
                      <Grid item>
                        <Typography>
                          {'add exercises to get started'}
                        </Typography>
                      </Grid>
                    </Grid>
                  ) : (
                    circuit.exercises.map(
                      (circuitExercise: CircuitExercise, index: number) => {
                        const foundExercise = props.exerciseTypes.find(
                          (exercise: ExerciseTypeVO) =>
                            exercise.id === circuitExercise.exerciseId
                        );
                        if (foundExercise) {
                          return (
                            <ExerciseCircuit
                              key={index}
                              circuitId={circuit.id}
                              exercise={foundExercise}
                              sets={circuitExercise.sets}
                              deleteExerciseHandler={
                                props.deleteExerciseHandler
                              }
                              addSetToExerciseHandler={
                                props.addSetToExerciseHandler
                              }
                              deleteSetFromExerciseHandler={
                                props.deleteSetFromExerciseHandler
                              }
                              toggleExerciseSetHandler={
                                props.toggleExerciseSetHandler
                              }
                              updateWorkoutSetFieldHandler={
                                props.updateWorkoutSetFieldHandler
                              }
                              updateTimeSetFieldHandler={
                                props.updateTimeSetFieldHandler
                              }
                              updateDistanceSetFieldHandler={
                                props.updateDistanceSetFieldHandler
                              }
                            />
                          );
                        }
                      }
                    )
                  )}
                </Grid>
              </AccordionDetails>

              <AccordionActions>
                <DeleteCircuitDialog
                  circuit={circuit}
                  deleteClickHandler={props.deleteClickHandler}
                />

                <AddExerciseDialog circuitId={circuit.id} />
              </AccordionActions>
            </Accordion>
          </Grid>
        );
      })}
    </Grid>
  );
};

export interface CircuitProps {
  expanded: string;
  circuits: WorkoutCircuitProps[];
  exerciseTypes: ExerciseTypeVO[];
  deleteClickHandler: (circuitId: string) => void;
  deleteExerciseHandler: (circuitId: string, exerciseId: string) => void;
  addSetToExerciseHandler: (circuitId: string, exerciseId: string) => void;
  deleteSetFromExerciseHandler: (
    setId: string,
    circuitId: string,
    exerciseId: string
  ) => void;
  toggleExerciseSetHandler: (
    setId: string,
    circuitId: string,
    exerciseId: string
  ) => void;
  updateWorkoutSetFieldHandler: (props: UpdateWorkoutSetFieldProps) => void;
  toggleAccordionHandler: (panel: string) => void;
  updateTimeSetFieldHandler: (props: UpdateTimeSetFieldProps) => void;
  updateDistanceSetFieldHandler: (props: UpdateDistanceSetFieldProps) => void;
}

const mapStateToProps = (state: State): CircuitProps => {
  return {
    exerciseTypes: state.oldApplicationState.exerciseTypes,
    circuits: state.oldApplicationState.workout.circuits,
    expanded: state.oldApplicationState.expandedAccordion,
  } as unknown as CircuitProps;
};

const mapDispatchToProps = (dispatch: Dispatch): CircuitProps =>
  ({
    deleteClickHandler: (id: string) => {
      dispatch(deleteCircuit(id));
    },
    deleteExerciseHandler: (circuitId: string, exerciseId: string) => {
      dispatch(deleteExerciseFromCircuit(circuitId, exerciseId));
    },
    addSetToExerciseHandler: (circuitId: string, exerciseId: string) => {
      dispatch(addExerciseSetToCircuit(circuitId, exerciseId));
    },
    deleteSetFromExerciseHandler: (
      setId: string,
      circuitId: string,
      exerciseId: string
    ) => {
      dispatch(deleteExerciseSetFromCircuit(setId, circuitId, exerciseId));
    },
    toggleExerciseSetHandler: (
      setId: string,
      circuitId: string,
      exerciseId: string
    ) => {
      dispatch(toggleExerciseSetAsDone(setId, circuitId, exerciseId));
    },
    updateWorkoutSetFieldHandler: (props: UpdateWorkoutSetFieldProps) => {
      dispatch(updateWorkoutSetField(props));
    },
    updateTimeSetFieldHandler: (props: UpdateTimeSetFieldProps) => {
      dispatch(updateTimeSetField(props));
    },
    updateDistanceSetFieldHandler: (props: UpdateDistanceSetFieldProps) => {
      dispatch(updateDistanceSetField(props));
    },
    toggleAccordionHandler: (panel: string) => {
      dispatch(toggleAccordion(panel));
    },
  } as unknown as CircuitProps);

export default connect(mapStateToProps, mapDispatchToProps)(Circuits);
