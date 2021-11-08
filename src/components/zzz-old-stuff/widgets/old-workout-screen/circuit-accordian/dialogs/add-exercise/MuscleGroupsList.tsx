import clsx from 'clsx';
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import { MuscleGroup, muscleGroups } from 'workout-app-common-core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
    },
    listItem: {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
    },
    selected: {
      color: '#FFF',
      backgroundColor: theme.palette.primary.dark,
      '&$selected': {
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      },
    },
  })
);

export default function MuscleGroupsList(
  props: MuscleGroupsListProps
): JSX.Element {
  const classes = useStyles();

  return (
    <List
      className={classes.root}
      subheader={
        <ListSubheader component={'div'}>{'Exercise Categories'}</ListSubheader>
      }
    >
      {muscleGroups.map((muscle: MuscleGroup, index: number) => {
        return (
          <ListItem
            key={index}
            button
            onClick={() => {
              props.clickHandler(index);
            }}
            className={clsx(classes.listItem, {
              [classes.selected]: props.activeTab === index,
            })}
            classes={{
              selected: classes.selected,
            }}
          >
            <ListItemText primary={muscle.name} />
          </ListItem>
        );
      })}
    </List>
  );
}

interface MuscleGroupsListProps {
  clickHandler: (index: number) => void;
  activeTab: number;
}
