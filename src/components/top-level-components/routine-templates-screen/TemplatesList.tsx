import React from 'react';
import {
  Card,
  List,
  Grid,
  ListItem,
  CardHeader,
  ListItemText,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../../configs/redux/store';
import { routerActions } from 'connected-react-router';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ROUTINE_BUILDER_SCREEN_PATH } from '../../../configs/constants/app';
import { RoutineTemplateVO, workoutCategories } from 'workout-app-common-core';
import { viewSelectedRoutine } from '../../../creators/routine-builder/builder';

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
  selectRoutineHandler,
}: TemplatesListProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
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
                          selectRoutineHandler(template);
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
  selectRoutineHandler: (routine: RoutineTemplateVO) => void;
}

const mapStateToProps = (state: State): TemplatesListProps => {
  return {
    routineTemplates:
      state.applicationState.workoutConfigurations.routineTemplates,
  } as unknown as TemplatesListProps;
};

const mapDispatchToProps = (dispatch: Dispatch): TemplatesListProps =>
  ({
    selectRoutineHandler: (routine: RoutineTemplateVO) => {
      dispatch(viewSelectedRoutine(routine));
      dispatch(routerActions.push(ROUTINE_BUILDER_SCREEN_PATH));
    },
  } as unknown as TemplatesListProps);

export default connect(mapStateToProps, mapDispatchToProps)(TemplatesList);
