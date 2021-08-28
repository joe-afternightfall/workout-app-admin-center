import {
  List,
  Grid,
  Slide,
  AppBar,
  Button,
  Dialog,
  Toolbar,
  TextField,
  IconButton,
  Typography,
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { Container } from 'react-smooth-dnd';
import { arrayMoveImmutable } from 'array-move';
import ToolBuilderCard from './ToolBuilderCard';
import CloseIcon from '@material-ui/icons/Close';
import CircuitSelector from './components/CircuitSelector';
import { TransitionProps } from '@material-ui/core/transitions';
import { SetTemplate } from '../../../configs/models/CircuitTemplateDAO';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { createNewCircuitTemplate } from '../../../services/circuit-template';
import DraggableSetTemplate from './components/DraggableSetTemplate';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    selectedRow: {
      marginBottom: theme.spacing(1),
      border: `solid 1px ${theme.palette.primary.main}`,
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction={'up'} ref={ref} {...props} />;
});

export interface BuilderTemplate {
  id: string;
  circuitId: string;
  circuitNickname: string;
  exercises: SetTemplate[];
}

export default function BuilderDialog(): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [template, setTemplate] = useState<BuilderTemplate>({
    id: uuidv4(),
    circuitId: '',
    circuitNickname: '',
    exercises: [],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddExercise = (exerciseId: string) => {
    setTemplate({
      ...template,
      exercises: [
        ...template.exercises,
        {
          setTemplateId: uuidv4(),
          exerciseId: exerciseId,
          sets: 0,
          weight: 0,
          reps: 0,
        },
      ],
    });
  };

  const handleDeleteExercise = (set: SetTemplate) => {
    const foundIndex = template.exercises.indexOf(set);
    const setExercises = template.exercises;
    setExercises.splice(foundIndex, 1);
    setTemplate({
      ...template,
      exercises: setExercises,
    });
  };

  const handleSelectCircuit = (circuitId: string) => {
    setTemplate({
      ...template,
      circuitId: circuitId,
    });
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemplate({
      ...template,
      circuitNickname: e.target.value,
    });
  };

  const handleSetChange = (action: 'add' | 'subtract', id: string) => {
    const foundSet = template.exercises.find(
      (set: SetTemplate) => set.setTemplateId === id
    );

    if (foundSet) {
      if (action === 'add') {
        foundSet.sets++;
      } else {
        foundSet.sets = foundSet.sets - 1;
      }

      setTemplate({
        ...template,
        exercises: [...template.exercises],
      });
    }
  };

  const onDrop = ({
    removedIndex,
    addedIndex,
  }: {
    removedIndex: number | null;
    addedIndex: number | null;
  }) => {
    if (removedIndex !== null && addedIndex !== null) {
      setTemplate((prevState) => {
        return {
          ...prevState,
          exercises: arrayMoveImmutable(
            prevState.exercises,
            removedIndex,
            addedIndex
          ),
        };
      });
    }
  };

  const handleSetFieldChange = (
    field: 'weight' | 'reps',
    value: string,
    setId: string
  ) => {
    const foundSet = template.exercises.find(
      (set: SetTemplate) => set.setTemplateId === setId
    );

    if (foundSet) {
      foundSet[field] = Number(value);

      setTemplate({
        ...template,
        exercises: [...template.exercises],
      });
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Grid container>
          <Grid item xs={7}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <Typography variant={'h6'} className={classes.title}>
                  {'Circuit Template'}
                </Typography>
                <div>
                  <Button
                    onClick={() => {
                      createNewCircuitTemplate(template).then(() => {
                        handleClose();
                      });
                    }}
                  >
                    {'Save Template'}
                  </Button>
                  <IconButton
                    edge={'start'}
                    color={'inherit'}
                    onClick={handleClose}
                    aria-label={'close'}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar>
            <Grid container spacing={2} style={{ padding: '0 24px' }}>
              <Grid item xs={12} sm={6}>
                <CircuitSelector
                  selectedCircuitId={template.circuitId}
                  onChangeHandler={handleSelectCircuit}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  value={template.circuitNickname}
                  label={'Circuit Nickname'}
                  onChange={handleTextFieldChange}
                />
              </Grid>
              <Grid item xs={12}>
                <List>
                  <Container
                    dragClass={classes.selectedRow}
                    dragHandleSelector={'.drag-handle'}
                    onDrop={onDrop}
                  >
                    {template.exercises.map(
                      (setTemplate: SetTemplate, index: number) => {
                        index += 1;

                        return (
                          <DraggableSetTemplate
                            key={index}
                            index={index}
                            setTemplate={setTemplate}
                            deleteSetHandler={handleDeleteExercise}
                            setChangeHandler={handleSetChange}
                            fieldChangeHandler={handleSetFieldChange}
                          />
                        );
                      }
                    )}
                  </Container>
                </List>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <ToolBuilderCard
              selectedExercises={template.exercises}
              addExerciseHandler={handleAddExercise}
            />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
