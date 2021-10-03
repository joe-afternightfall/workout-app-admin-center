import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import ExerciseListTable from './ExerciseListTable';
import SwipeableViews from 'react-swipeable-views';
import FormView from './form-view/FormView';
import { ExerciseVO } from 'workout-app-common-core';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

interface LocalState {
  activeTab: number;
  newExercise: boolean;
  exercise: ExerciseVO | undefined;
}

class ExercisesScreen extends Component<ExercisesScreenProps, LocalState> {
  state = {
    activeTab: 0,
    newExercise: false,
    exercise: undefined,
  };

  render(): JSX.Element {
    const { classes } = this.props;

    const handleChange = (tab: number, newExercise: boolean) => {
      this.setState({
        activeTab: tab,
        newExercise: newExercise,
      });
    };

    const handleEditClick = (exercise: ExerciseVO) => {
      this.setState({
        activeTab: 1,
        newExercise: false,
        exercise: exercise,
      });
    };

    const backToListHandler = () => {
      this.setState({
        activeTab: 0,
        newExercise: false,
      });
    };

    return (
      <Grid container>
        <Grid item xs={12}>
          <SwipeableViews
            index={this.state.activeTab}
            // onChangeIndex={handleChange}
            containerStyle={{
              transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s',
            }}
          >
            <ExerciseListTable
              actionClickHandler={(newExercise: boolean) => {
                handleChange(1, newExercise);
              }}
              editClickHandler={handleEditClick}
            />
            <FormView
              newExercise={this.state.newExercise}
              successCallback={backToListHandler}
              exercise={this.state.exercise}
            />
          </SwipeableViews>
        </Grid>
      </Grid>
    );
  }
}

export interface ExercisesScreenProps extends WithStyles<typeof styles> {
  DELETE_ME?: undefined;
}

export default withStyles(styles, { withTheme: true })(ExercisesScreen);
