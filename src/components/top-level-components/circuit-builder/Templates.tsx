import React, { useState } from 'react';
import { connect } from 'react-redux';
import { State } from '../../../configs/redux/store';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { SetTemplate } from 'workout-app-common-core/core/index';
import { CircuitTemplateVO, ExerciseTypeVO } from 'workout-app-common-core';

const Templates = (props: TemplatesProps): JSX.Element => {
  const [openPanel, setOpenPanel] = useState('');
  const handleChange =
    (panel: string) =>
    (e: React.ChangeEvent<Record<string, never>>, isExpanded: boolean) => {
      setOpenPanel(isExpanded ? panel : '');
    };

  return (
    <Grid container spacing={3}>
      {props.templates.map((template: CircuitTemplateVO, index: number) => {
        return (
          <Grid key={index} item xs={12}>
            <Accordion
              expanded={openPanel === template.id}
              onChange={handleChange(template.id)}
            >
              <AccordionSummary
                id={`panel-${template.id}-header`}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>{`Circuit: ${template.circuitNickname}`}</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Grid key={index} item xs={12} container>
                  {template.exercises.map((set: SetTemplate, index: number) => {
                    const foundExercise = props.exerciseTypes.find(
                      (exercise: ExerciseTypeVO) =>
                        exercise.id === set.exerciseId
                    );
                    return (
                      <Grid key={index} item xs={12} container>
                        <Grid item xs={3}>
                          <Typography>
                            {foundExercise && foundExercise.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography>{set.weight}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography>{set.reps}</Typography>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </AccordionDetails>

              <AccordionActions>
                <Button>{'Delete Template'}</Button>
                <Button>{'Edit Template'}</Button>
              </AccordionActions>
            </Accordion>
          </Grid>
        );
      })}
    </Grid>
  );
};

export interface TemplatesProps {
  templates: CircuitTemplateVO[];
  exerciseTypes: ExerciseTypeVO[];
}

const mapStateToProps = (state: State): TemplatesProps => {
  return {
    templates: state.applicationState.circuitTemplates,
    exerciseTypes: state.applicationState.workoutConfigurations.exerciseTypes,
  } as unknown as TemplatesProps;
};

const mapDispatchToProps = (): TemplatesProps =>
  ({} as unknown as TemplatesProps);

export default connect(mapStateToProps, mapDispatchToProps)(Templates);
