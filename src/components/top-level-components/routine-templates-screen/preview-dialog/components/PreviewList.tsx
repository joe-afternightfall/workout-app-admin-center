import React from 'react';
import {
  Phase,
  Segment,
  getPhaseName,
  sortPhaseSegments,
  RoutineTemplateVO,
} from 'workout-app-common-core';
import PreviewListItem from './PreviewListItem';
import { Grid, List, ListSubheader } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

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

export default function PreviewList(props: PreviewListProps): JSX.Element {
  const { routineTemplate } = props;
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
                    {`Phase #${phase.order} ${getPhaseName(phase.phaseId)}`}
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
}

interface PreviewListProps {
  routineTemplate: RoutineTemplateVO | undefined;
}
