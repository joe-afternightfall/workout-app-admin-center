import React, { ChangeEvent } from 'react';
import {
  Card,
  Grid,
  ListItem,
  TextField,
  Typography,
  IconButton,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { Draggable } from 'react-smooth-dnd';
import SetIncrementer from './SetIncrementer';
import { State } from '../../../../configs/redux/store';
import DeleteIcon from '@material-ui/icons/HighlightOff';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import { SetTemplate } from '../../../../configs/models/CircuitTemplateDAO';
import { ExerciseTypeVO } from '../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';

const DraggableSetTemplate = (
  props: SetTemplateProps & PassedInProps
): JSX.Element => {
  const { index, setTemplate, exerciseTypes } = props;

  const foundExercise = exerciseTypes.find(
    (exercise: ExerciseTypeVO) => exercise.id === setTemplate.exerciseId
  );

  return (
    <Draggable key={setTemplate.setTemplateId}>
      <Card>
        <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Grid container>
            <Grid item xs={11}>
              <ListItemText
                primary={
                  <Grid container xs={12} style={{ marginTop: 8 }}>
                    <Grid item xs={12} container spacing={2}>
                      <Grid item sm={5} container alignItems={'center'}>
                        <Grid item>
                          <Typography>
                            {`${index}. ${foundExercise && foundExercise.name}`}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <IconButton
                            onClick={() => {
                              props.deleteSetHandler(setTemplate);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <Grid item sm={3}>
                        <SetIncrementer
                          setNumber={setTemplate.sets}
                          setTemplateId={setTemplate.setTemplateId}
                          changeHandler={props.setChangeHandler}
                        />
                      </Grid>
                      <Grid item sm={2}>
                        <TextField
                          variant={'outlined'}
                          name={'weight'}
                          value={setTemplate.weight}
                          inputProps={{
                            style: {
                              textAlign: 'center',
                            },
                          }}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            props.fieldChangeHandler(
                              'weight',
                              e.target.value,
                              setTemplate.setTemplateId
                            );
                          }}
                        />
                      </Grid>
                      <Grid item sm={2}>
                        <TextField
                          variant={'outlined'}
                          name={'reps'}
                          value={setTemplate.reps}
                          inputProps={{
                            style: {
                              textAlign: 'center',
                            },
                          }}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            props.fieldChangeHandler(
                              'reps',
                              e.target.value,
                              setTemplate.setTemplateId
                            );
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      container
                      style={{ textAlign: 'center' }}
                      spacing={2}
                    >
                      <Grid item sm={5} />
                      <Grid item sm={3}>
                        <Typography>{'Sets'}</Typography>
                      </Grid>
                      <Grid item sm={2}>
                        <Typography>{'Weight'}</Typography>
                      </Grid>
                      <Grid item sm={2}>
                        <Typography>{'Reps'}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                }
              />
            </Grid>
            <Grid
              item
              xs={1}
              container
              alignItems={'center'}
              justify={'center'}
            >
              <Grid item>
                <ListItemIcon className={'drag-handle'}>
                  <IconButton>
                    <DragHandleIcon />
                  </IconButton>
                </ListItemIcon>
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
      </Card>
    </Draggable>
  );
};

interface PassedInProps {
  index: number;
  setTemplate: SetTemplate;
  deleteSetHandler: (set: SetTemplate) => void;
  setChangeHandler: (action: 'add' | 'subtract', id: string) => void;
  fieldChangeHandler: (
    field: 'weight' | 'reps',
    value: string,
    setId: string
  ) => void;
}

export interface SetTemplateProps {
  exerciseTypes: ExerciseTypeVO[];
}

const mapStateToProps = (state: State): SetTemplateProps => {
  return {
    exerciseTypes: state.applicationState.workoutConfigurations.exerciseTypes,
  } as unknown as SetTemplateProps;
};

const mapDispatchToProps = (): SetTemplateProps =>
  ({} as unknown as SetTemplateProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraggableSetTemplate);
