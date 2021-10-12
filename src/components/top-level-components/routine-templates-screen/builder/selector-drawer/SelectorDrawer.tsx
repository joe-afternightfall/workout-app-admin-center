import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ExercisesList from './ExercisesList';
import { State } from '../../../../../configs/redux/store';
import { AppBar, Toolbar, Typography, Drawer, Fade } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      width: '38vw',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  })
);

const SelectorDrawer = ({
  display,
  selectedExerciseSlotForSegment,
}: SelectorDrawerProps & PassedInProps) => {
  const classes = useStyles();

  const segmentIdEmpty = selectedExerciseSlotForSegment.segmentId === '';
  const exerciseTitle = segmentIdEmpty
    ? 'Exercise Drawer'
    : `Exercise for slot #${selectedExerciseSlotForSegment.order}`;

  return (
    <Drawer
      open={display}
      anchor={'right'}
      variant={'persistent'}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <AppBar position={'relative'}>
        <Toolbar>
          <Typography variant={'h6'} noWrap>
            {exerciseTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      {!segmentIdEmpty && <ExercisesList />}
    </Drawer>
  );
};

interface PassedInProps {
  display: boolean;
}

interface SelectorDrawerProps {
  selectedExerciseSlotForSegment: {
    segmentId: string;
    order: number;
  };
}

const mapStateToProps = (state: State): SelectorDrawerProps => {
  return {
    selectedExerciseSlotForSegment:
      state.routineBuilderState.selectedExerciseSlotForSegment,
  } as unknown as SelectorDrawerProps;
};

const mapDispatchToProps = (): SelectorDrawerProps =>
  ({} as unknown as SelectorDrawerProps);

export default connect(mapStateToProps, mapDispatchToProps)(SelectorDrawer);
