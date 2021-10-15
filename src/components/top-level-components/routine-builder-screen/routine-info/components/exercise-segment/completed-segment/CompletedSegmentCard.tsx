import clsx from 'clsx';
import React from 'react';
import {
  ExpandMore,
  Link as LinkIcon,
  ArrowRightAlt as Arrow,
} from '@material-ui/icons';
import {
  Grid,
  Link,
  IconButton,
  CardContent,
  CardActions,
  Typography,
} from '@material-ui/core';
import CompletedSets from './components/CompletedSets';
import CompletedExercises from './components/CompletedExercises';
import CompletedCardHeader from './components/CompletedCardHeader';
import CompletedRestBetween from './components/CompletedRestBetween';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Segment, determineTrainingSetType } from 'workout-app-common-core';

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
    defaultMessage: {
      margin: 'auto',
      textAlign: 'center',
      color: theme.palette.info.dark,
    },
    defaultMessageContent: {
      marginTop: 24,
    },
    editLink: {
      '&:hover': {
        cursor: 'pointer',
      },
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
  let icon: JSX.Element = <React.Fragment />;

  const trainingSetType = determineTrainingSetType(segment.trainingSetTypeId);
  if (trainingSetType === 'superset') {
    title = 'Superset';
    icon = <LinkIcon className={classes.icon} fontSize={'large'} />;
  } else if (trainingSetType === 'straight-set') {
    title = 'Straight set';
    icon = <Arrow className={classes.icon} fontSize={'large'} />;
  }

  return (
    <>
      {segment.trainingSetTypeId !== '' ? (
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
                  linkIconSize={'large'}
                  setType={trainingSetType}
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
      ) : (
        <CardContent className={classes.defaultMessageContent}>
          <Typography className={classes.defaultMessage}>
            <Link className={classes.editLink} onClick={editClickHandler}>
              {'click to fill out info'}
            </Link>
          </Typography>
        </CardContent>
      )}
    </>
  );
}

interface CompletedSegmentCardProps {
  segment: Segment;
  displayIcons: boolean;
  editClickHandler: () => void;
}
