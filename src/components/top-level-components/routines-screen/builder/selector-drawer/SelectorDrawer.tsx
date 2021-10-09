import React from 'react';
import {
  Theme,
  useTheme,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ExercisesList from './ExercisesList';
import { State } from '../../../../../configs/redux/store';
import { AppBar, Toolbar, Typography, Drawer } from '@material-ui/core';

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
  selectExerciseForSegment,
}: SelectorDrawerProps & PassedInProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

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
          {selectExerciseForSegment.segmentId !== '' ? (
            <>
              <Typography variant={'h6'} noWrap>
                {selectExerciseForSegment.segmentId}
              </Typography>
              <Typography variant={'h6'} noWrap>
                {selectExerciseForSegment.order}
              </Typography>
            </>
          ) : (
            <Typography variant={'h6'} noWrap>
              {'Exercise Drawer'}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <ExercisesList />
    </Drawer>
  );
};

interface PassedInProps {
  display: boolean;
  toggleHandler: (display: boolean) => void;
}

interface SelectorDrawerProps {
  selectExerciseForSegment: {
    segmentId: string;
    order: number;
  };
}

const mapStateToProps = (state: State): SelectorDrawerProps => {
  return {
    selectExerciseForSegment:
      state.routineBuilderState.selectExerciseForSegment,
  } as unknown as SelectorDrawerProps;
};

const mapDispatchToProps = (): SelectorDrawerProps =>
  ({} as unknown as SelectorDrawerProps);

export default connect(mapStateToProps, mapDispatchToProps)(SelectorDrawer);
