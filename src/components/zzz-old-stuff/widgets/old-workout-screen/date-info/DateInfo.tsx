import React from 'react';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { updateWorkoutDate } from '../../../../../creators/zzz-old-stuff/old-creators';
import { State } from '../../../../../configs/redux/store';

const DateInfo = (props: DateInfoProps): JSX.Element => {
  const handleDateChange = (date: Date | null) => {
    if (date) {
      props.dateChangeHandler(date);
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant={'inline'}
        format={'MM/dd/yyyy'}
        margin={'normal'}
        label={'Workout Date'}
        value={props.workoutDate}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>
  );
};

interface DateInfoProps {
  workoutDate: Date;
  dateChangeHandler: (date: Date) => void;
}

const mapStateToProps = (state: State): DateInfoProps => {
  return {
    workoutDate: state.oldApplicationState.workout.date,
  } as unknown as DateInfoProps;
};

const mapDispatchToProps = (dispatch: Dispatch): DateInfoProps =>
  ({
    dateChangeHandler: (date: Date) => {
      dispatch(updateWorkoutDate(date));
    },
  } as unknown as DateInfoProps);

export default connect(mapStateToProps, mapDispatchToProps)(DateInfo);
