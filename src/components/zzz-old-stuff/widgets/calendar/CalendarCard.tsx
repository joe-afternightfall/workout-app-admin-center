import React from 'react';
import { connect } from 'react-redux';
import { Card } from '@material-ui/core';
import CalendarCells from './components/CalendarCells';
import { addMonths, format, subMonths } from 'date-fns';
import { State } from '../../../../configs/redux/store';
import CalendarHeader from './components/CalendarHeader';
import CalendarControls from './components/CalendarControls';
import PastWorkoutDialog from './components/PastWorkoutDialog';
import { WorkoutVO } from '../../../../configs/zzz-old-stuff/old-models/WorkoutVO';
import { ExerciseTypeVO } from '../../../../configs/zzz-old-stuff/old-models/ExerciseTypeVO';

const CalendarCard = (props: CalendarCardProps): JSX.Element => {
  const dateFormat = 'MMMM yyyy';
  const today = new Date();
  const [currentMonth, setCurrentMonth] = React.useState(today);
  const [selectedDate, setSelectedDate] = React.useState(today);
  const [open, setOpenDialog] = React.useState(false);
  const [workout, setWorkout] = React.useState<WorkoutVO>();

  const openDialog = (workout: WorkoutVO): void => {
    setWorkout(workout);
    setOpenDialog(true);
  };

  const closeDialog = (): void => {
    setOpenDialog(false);
  };

  const onDateClick = (day: Date): void => {
    setSelectedDate(day);
  };

  const nextMonth = (): void => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = (): void => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <Card>
      <PastWorkoutDialog
        closeClickHandler={closeDialog}
        open={open}
        workout={workout}
        exerciseTypes={props.exerciseTypes}
      />
      <CalendarControls
        currentMonth={format(currentMonth, dateFormat)}
        prevMonthClickHandler={prevMonth}
        nextMonthClickHandler={nextMonth}
      />
      <CalendarHeader currentMonth={currentMonth} />
      <CalendarCells
        selectedDate={selectedDate}
        dateClickHandler={onDateClick}
        currentMonth={currentMonth}
        userWorkouts={props.userWorkouts}
        openDialogHandler={openDialog}
      />
    </Card>
  );
};

interface CalendarCardProps {
  userWorkouts: WorkoutVO[];
  exerciseTypes: ExerciseTypeVO[];
}

const mapStateToProps = (state: State): CalendarCardProps => {
  return {
    userWorkouts: state.oldApplicationState.userWorkouts,
    exerciseTypes: state.oldApplicationState.exerciseTypes,
  } as unknown as CalendarCardProps;
};

const mapDispatchToProps = (): CalendarCardProps =>
  ({} as unknown as CalendarCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(CalendarCard);
