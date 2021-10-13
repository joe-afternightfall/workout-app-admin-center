import clsx from 'clsx';
import React from 'react';
import CompletedSets from './components/CompletedSets';
import CompletedExercises from './components/CompletedExercises';
import CompletedCardHeader from './components/CompletedCardHeader';
import CompletedRestBetween from './components/CompletedRestBetween';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Segment, isSuperset, isStraightSet } from 'workout-app-common-core';
import { Link, ExpandMore, ArrowRightAlt as Arrow } from '@material-ui/icons';
import { Grid, IconButton, CardContent, CardActions } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: theme.palette.text.secondary,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  })
);

export default function CompletedSegmentCard({
  segment,
  displayIcons,
  editClickHandler,
}: CompletedSegmentCardProps): JSX.Element {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let title = '';
  let icon: JSX.Element;
  let setType: 'super' | 'straight' | null = null;

  const superset = isSuperset(segment.trainingSetTypeId);
  const straightSet = isStraightSet(segment.trainingSetTypeId);

  if (superset) {
    title = 'Superset';
    setType = 'super';
    icon = <Link className={classes.icon} fontSize={'large'} />;
  } else if (straightSet) {
    setType = 'straight';
    title = 'Straight set';
    icon = <Arrow className={classes.icon} fontSize={'large'} />;
  } else {
    icon = <React.Fragment />;
  }

  return (
    <>
      <CompletedCardHeader
        title={title}
        icon={icon}
        display={displayIcons}
        editClickHandler={editClickHandler}
      />

      <CardContent>
        <Grid container>
          <Grid item xs={9} container alignItems={'center'}>
            <CompletedExercises
              segment={segment}
              icon={icon}
              setType={setType}
            />
          </Grid>
          <Grid item xs={3}>
            <CompletedSets segment={segment} />
          </Grid>
        </Grid>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
        >
          <ExpandMore />
        </IconButton>
      </CardActions>

      <CompletedRestBetween
        expanded={expanded}
        restBetweenSets={segment.secondsRestBetweenSets}
        restBetweenNextSegment={segment.secondsRestBetweenNextSegment}
      />
    </>
  );
}

interface CompletedSegmentCardProps {
  segment: Segment;
  displayIcons: boolean;
  editClickHandler: () => void;
}
