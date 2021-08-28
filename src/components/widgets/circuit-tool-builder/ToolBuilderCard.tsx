import {
  Tab,
  Tabs,
  Card,
  Grid,
  AppBar,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from '../../shared/SwipeableViewTabPanel';
import BottomExerciseDialog from './components/BottomExerciseDialog';
import ManikinFlippableSides from '../muscle-selector/ManikinFlippableSides';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { SetTemplate } from '../../../configs/models/CircuitTemplateDAO';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100vh',
      width: '100%',
    },
    viewRoot: {
      height: '100%',
      borderRadius: 8,
      backgroundColor: '#F6F6F6',
    },
  })
);

export default function ToolBuilderCard(
  props: ToolBuilderCardProps
): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();

  const [viewIndex, setViewIndex] = useState(0);

  const handleViewChange = (index: number) => {
    setViewIndex(index);
  };

  const handleChange = (
    e: React.ChangeEvent<Record<string, never>>,
    newValue: number
  ) => {
    setViewIndex(newValue);
  };

  return (
    <Card raised={false}>
      <CardHeader
        style={{ padding: 0 }}
        title={
          <AppBar position={'static'} color={'default'}>
            <Tabs
              value={viewIndex}
              onChange={handleChange}
              indicatorColor={'primary'}
              textColor={'primary'}
              variant={'fullWidth'}
              aria-label="full width tabs example"
            >
              <Tab label={'Muscle Groups'} value={0} />
              <Tab label={'Exercise List'} value={1} />
            </Tabs>
          </AppBar>
        }
      />
      <CardContent style={{ padding: 0 }}>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={viewIndex}
          onChangeIndex={handleViewChange}
          className={classes.viewRoot}
        >
          <TabPanel value={viewIndex} index={0}>
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <BottomExerciseDialog
                  selectedExercises={props.selectedExercises}
                  addExerciseHandler={props.addExerciseHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <ManikinFlippableSides />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={viewIndex} index={1}>
            <Typography>{'Exercise List'}</Typography>
          </TabPanel>
        </SwipeableViews>
      </CardContent>
    </Card>
  );
}

export interface ToolBuilderCardProps {
  selectedExercises: SetTemplate[];
  addExerciseHandler: (exerciseId: string) => void;
}
