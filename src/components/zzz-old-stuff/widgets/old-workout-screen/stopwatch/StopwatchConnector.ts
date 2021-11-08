import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Stopwatch, { StopwatchProps, StopwatchState } from './Stopwatch';
import { State } from '../../../../../configs/redux/store';
import {
  resetStopwatch,
  startStopwatch,
  stopStopwatch,
  updateStopwatch,
} from '../../../../../creators/zzz-old-stuff/old-creators';

const mapStateToProps = (state: State): StopwatchProps => {
  return {
    stopwatchState: {
      running: state.oldApplicationState.stopwatch.running,
      currentTimeMs: state.oldApplicationState.stopwatch.currentTimeMs,
      currentTimeSec: state.oldApplicationState.stopwatch.currentTimeSec,
      currentTimeMin: state.oldApplicationState.stopwatch.currentTimeMin,
      watch: state.oldApplicationState.stopwatch.watch,
    },
  } as unknown as StopwatchProps;
};

const mapDispatchToProps = (dispatch: Dispatch): StopwatchProps =>
  ({
    startHandler: (watch: ReturnType<typeof setTimeout>) => {
      dispatch(startStopwatch(watch));
    },
    stopHandler: () => {
      dispatch(stopStopwatch());
    },
    resetHandler: () => {
      dispatch(resetStopwatch());
    },
    updateHandler: (state: StopwatchState) => {
      dispatch(updateStopwatch(state));
    },
  } as unknown as StopwatchProps);

export default connect(mapStateToProps, mapDispatchToProps)(Stopwatch);
