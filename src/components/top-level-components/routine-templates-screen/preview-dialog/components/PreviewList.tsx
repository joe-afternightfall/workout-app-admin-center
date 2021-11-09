import React from 'react';
import {
  Phase,
  Segment,
  sortPhaseSegments,
  RoutineTemplateVO,
  PhaseVO,
  getPhaseName,
} from 'workout-app-common-core';
import PreviewListItem from './PreviewListItem';
import { Grid, List, ListSubheader } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { State } from '../../../../../configs/redux/store';
import { connect } from 'react-redux';

const useStyles = makeStyles(() =>
  createStyles({
    content: {
      minHeight: '20vh',
      marginTop: 4,
    },
    listWrapper: {
      width: '100%',
      paddingLeft: 24,
      paddingRight: 24,
      paddingBottom: '6vh',
      borderRadius: 6,
      backgroundColor: '#ECECEC',
    },
  })
);

const PreviewList = (props: PreviewListProps & PassedInProps): JSX.Element => {
  const { routineTemplate, phases } = props;
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={2}
      justify={'center'}
      alignItems={'center'}
      className={classes.content}
    >
      {routineTemplate &&
        routineTemplate.phases.map((phase: Phase, index: number) => {
          return (
            <Grid item xs={12} key={index}>
              <List
                component={'nav'}
                className={classes.listWrapper}
                subheader={
                  <ListSubheader component={'div'} disableSticky>
                    {`Phase #${phase.order} ${getPhaseName(
                      phases,
                      phase.phaseId
                    )}`}
                  </ListSubheader>
                }
              >
                <Grid container spacing={2}>
                  {sortPhaseSegments(phase.segments).map(
                    (segment: Segment, index) => (
                      <PreviewListItem segment={segment} key={index} />
                    )
                  )}
                </Grid>
              </List>
            </Grid>
          );
        })}
    </Grid>
  );
};

interface PassedInProps {
  routineTemplate: RoutineTemplateVO | undefined;
}

interface PreviewListProps {
  phases: PhaseVO[];
}

const mapStateToProps = (state: State): PreviewListProps => {
  return {
    phases: state.applicationState.workoutConfigurations.phases,
  } as unknown as PreviewListProps;
};

export default connect(mapStateToProps)(PreviewList);
