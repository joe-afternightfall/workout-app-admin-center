import React from 'react';
import {
  Card,
  Avatar,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Segment, determineTrainingSetType } from 'workout-app-common-core';
import CompletedExercises from '../../../routine-builder-screen/routine-info/components/exercise-segment/completed-segment/components/CompletedExercises';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: '9vh',
    },
    fullHeight: {
      height: '100%',
    },
    setsContainer: {
      height: '100%',
    },
  })
);

export default function PreviewListItem(
  props: PreviewListItemProps
): JSX.Element {
  const { segment } = props;
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.root}>
      <Card className={classes.fullHeight}>
        <ListItem className={classes.fullHeight}>
          <ListItemIcon>
            <Avatar>{segment.order}</Avatar>
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Grid container>
                <Grid item xs={9} container alignItems={'center'}>
                  <CompletedExercises
                    hideNumbers
                    segment={segment}
                    linkIconSize={'small'}
                    setType={determineTrainingSetType(
                      segment.trainingSetTypeId
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Grid
                    // todo: try combining with line 106
                    container
                    justify={'center'}
                    alignItems={'center'}
                    className={classes.setsContainer}
                  >
                    <Grid item>
                      <Typography variant={'h6'}>
                        {`x ${segment.exercises[0].sets.length}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            }
          />
        </ListItem>
      </Card>
    </Grid>
  );
}

interface PreviewListItemProps {
  segment: Segment;
}
