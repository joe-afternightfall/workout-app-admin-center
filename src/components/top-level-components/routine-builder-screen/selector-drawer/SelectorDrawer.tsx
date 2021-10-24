import React from 'react';
import { connect } from 'react-redux';
import ExercisesList from './ExercisesList';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { State } from '../../../../configs/redux/store';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Drawer } from '@material-ui/core';
import { Dispatch } from 'redux';
import { filterExercisesForSearchValue } from '../../../../creators/routine-builder/builder';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      width: '38vw',
    },
    //todo: good example transition with easing
    // appBar: {
    //   transition: theme.transitions.create(['margin', 'width'], {
    //     easing: theme.transitions.easing.sharp,
    //     duration: theme.transitions.duration.leavingScreen,
    //   }),
    // },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: '#4486d1',
      // backgroundColor: '#1B73CA',
      '&:hover': {
        backgroundColor: '#5b94d5',
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  })
);

const SelectorDrawer = ({
  display,
  filterExerciseList,
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
          <Typography variant={'h6'} noWrap className={classes.title}>
            {exerciseTitle}
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={'Search…'}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                filterExerciseList(e.target.value);
              }}
            />
          </div>
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
  filterExerciseList: (searchValue: string) => void;
}

const mapStateToProps = (state: State): SelectorDrawerProps => {
  return {
    selectedExerciseSlotForSegment:
      state.routineBuilderState.selectedExerciseSlotForSegment,
  } as unknown as SelectorDrawerProps;
};

const mapDispatchToProps = (dispatch: Dispatch): SelectorDrawerProps =>
  ({
    filterExerciseList: (input: string) => {
      dispatch(filterExercisesForSearchValue(input));
    },
  } as unknown as SelectorDrawerProps);

export default connect(mapStateToProps, mapDispatchToProps)(SelectorDrawer);
