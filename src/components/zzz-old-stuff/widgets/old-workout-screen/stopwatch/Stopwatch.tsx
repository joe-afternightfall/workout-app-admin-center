import React from 'react';
import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles';
import PauseIcon from '@material-ui/icons/Pause';
import { Button, Grid } from '@material-ui/core';
import StopwatchDisplay from './StopwatchDisplay';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const styles: Styles<Theme, StyledComponentProps> = () => ({
  button: {
    width: '75%',
  },
});

class Stopwatch extends React.Component<StopwatchProps> {
  start = (): void => {
    if (!this.props.stopwatchState.running) {
      this.props.startHandler(setInterval(() => this.pace(), 10));
    }
  };

  stop = (): void => {
    this.props.stopHandler();
  };

  pace = (): void => {
    this.props.updateHandler({
      ...this.props.stopwatchState,
      currentTimeMs: this.props.stopwatchState.currentTimeMs + 10,
    });
    if (this.props.stopwatchState.currentTimeMs >= 1000) {
      this.props.updateHandler({
        ...this.props.stopwatchState,
        currentTimeSec: this.props.stopwatchState.currentTimeSec + 1,
        currentTimeMs: 0,
      });
    }
    if (this.props.stopwatchState.currentTimeSec >= 60) {
      this.props.updateHandler({
        ...this.props.stopwatchState,
        currentTimeMin: this.props.stopwatchState.currentTimeMin + 1,
        currentTimeSec: 0,
      });
    }
  };

  render(): JSX.Element {
    const { classes, stopwatchState } = this.props;

    return (
      <Grid style={{ textAlign: 'right' }} container alignItems={'center'}>
        <Grid item xs={4}>
          <StopwatchDisplay
            variant={'h6'}
            displayText={false}
            minutes={stopwatchState.currentTimeMin}
            seconds={stopwatchState.currentTimeSec}
          />
        </Grid>

        <Grid item xs={4}>
          <Button
            variant={'contained'}
            color={stopwatchState.running ? 'secondary' : 'primary'}
            className={classes.button}
            startIcon={
              stopwatchState.running ? <PauseIcon /> : <PlayArrowIcon />
            }
            onClick={stopwatchState.running ? this.stop : this.start}
          >
            {stopwatchState.running ? 'Pause' : 'Start'}
          </Button>
        </Grid>

        <Grid item xs={4}>
          <Button
            className={classes.button}
            variant={'contained'}
            onClick={this.props.resetHandler}
          >
            {'Reset'}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export interface StopwatchState {
  running: boolean;
  currentTimeMs: number;
  currentTimeSec: number;
  currentTimeMin: number;
  watch: ReturnType<typeof setTimeout> | void;
}

export interface StopwatchProps extends WithStyles<typeof styles> {
  stopwatchState: StopwatchState;
  startHandler: (watch: ReturnType<typeof setTimeout>) => void;
  stopHandler: () => void;
  resetHandler: () => void;
  updateHandler: (state: StopwatchState) => void;
}

export default withStyles(styles, { withTheme: true })(Stopwatch);
