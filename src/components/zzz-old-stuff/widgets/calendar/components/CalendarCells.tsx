import {
  format,
  addDays,
  parseISO,
  isSameDay,
  endOfWeek,
  endOfMonth,
  startOfWeek,
  isSameMonth,
  startOfMonth,
} from 'date-fns';
import clsx from 'clsx';
import React from 'react';
import Tag from './cells/Tag';
import { Grid } from '@material-ui/core';
import CornerNumber from './cells/CornerNumber';
import BackgroundNumber from './cells/BackgroundNumber';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { WorkoutVO } from '../../../../../configs/zzz-old-stuff/old-models/WorkoutVO';

const useStyles = makeStyles(() =>
  createStyles({
    row: {
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%',
      borderBottom: '1px solid #EEE',
      '&:last-child': {
        borderBottom: 'none',
      },
    },
    cell: {
      flexGrow: 0,
      flexBasis: 'calc(100% / 7)',
      width: 'calc(100% / 7)',
      position: 'relative',
      height: '5em',
      borderRight: '1px solid #eee',
      overflow: 'hidden',
      cursor: 'pointer',
      background: '#fff',
      '&:hover': {
        background: '#F9F9F9',
      },
    },
    disabled: {
      color: '#ccc',
      pointerEvents: 'none',
    },
    selected: {
      border: '1px solid',
    },
  })
);

export default function CalendarCells(props: CalendarCellsProps): JSX.Element {
  const classes = useStyles();

  const monthStart = startOfMonth(props.currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = 'd';
  const rows = [];

  let days = [];
  let day = startDate;
  let formattedDate = '';
  let rowKey = 0;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      days.push(
        <div
          key={i}
          className={clsx(classes.cell, {
            [classes.disabled]: !isSameMonth(day, monthStart),
            [classes.selected]: isSameDay(day, props.selectedDate),
          })}
          onClick={() => {
            props.dateClickHandler(parseISO(cloneDay.toISOString()));
            props.userWorkouts &&
              props.userWorkouts.map((workout: WorkoutVO) => {
                if (isSameDay(cloneDay, new Date(workout.date))) {
                  props.openDialogHandler(workout);
                }
              });
          }}
        >
          <CornerNumber date={formattedDate} />
          <BackgroundNumber
            date={formattedDate}
            isSameDay={isSameDay(day, props.selectedDate)}
          />
          {props.userWorkouts &&
            props.userWorkouts.map((workout: WorkoutVO) => {
              if (isSameDay(cloneDay, new Date(workout.date))) {
                return <Tag workout={workout} />;
              }
            })}
        </div>
      );
      day = addDays(day, 1);
      rowKey++;
    }
    rows.push(
      <div key={rowKey} className={classes.row}>
        {days}
      </div>
    );
    days = [];
  }

  return <Grid>{rows}</Grid>;
}

interface CalendarCellsProps {
  currentMonth: Date;
  selectedDate: Date;
  userWorkouts: WorkoutVO[];
  dateClickHandler: (day: Date) => void;
  openDialogHandler: (workout: WorkoutVO) => void;
}
