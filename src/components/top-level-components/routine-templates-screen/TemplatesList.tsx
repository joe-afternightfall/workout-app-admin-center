import {
  Card,
  List,
  Grid,
  ListItem,
  CardHeader,
  ListItemText,
} from '@material-ui/core';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { State } from '../../../configs/redux/store';
import PreviewRoutineDialog from './PreviewRoutineDialog';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { RoutineTemplateVO, workoutCategories } from 'workout-app-common-core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      minHeight: '40vh',
    },
  })
);

const TemplatesList = ({
  routineTemplates,
}: TemplatesListProps): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState<
    RoutineTemplateVO | undefined
  >(undefined);

  const openDialog = (routine: RoutineTemplateVO) => {
    setOpen(true);
    setSelectedRoutine(routine);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Grid container spacing={2}>
      <PreviewRoutineDialog
        open={open}
        routineTemplate={selectedRoutine}
        closeHandler={closeDialog}
      />

      {workoutCategories.map((category, index) => {
        return (
          <Grid item xs={4} key={index}>
            <Card className={classes.root}>
              <CardHeader title={category.name} />
              <List>
                {routineTemplates.map((template) => {
                  if (template.workoutCategoryId === category.id) {
                    return (
                      <ListItem
                        button
                        onClick={() => {
                          openDialog(template);
                        }}
                      >
                        <ListItemText primary={template.name} />
                      </ListItem>
                    );
                  }
                })}
              </List>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

interface TemplatesListProps {
  routineTemplates: RoutineTemplateVO[];
}

const mapStateToProps = (state: State): TemplatesListProps => {
  return {
    routineTemplates:
      state.applicationState.workoutConfigurations.routineTemplates,
  } as unknown as TemplatesListProps;
};

export default connect(mapStateToProps)(TemplatesList);
