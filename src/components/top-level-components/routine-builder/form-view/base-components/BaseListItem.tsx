import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/AssignmentTurnedIn';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

export default function BaseListItem({
  title,
  component,
  isEditing,
  hideEditButton,
  editClickHandler,
}: BaseListItemProps): JSX.Element {
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemText
        primary={title}
        // disableTypography
        // primary={
        //   <Grid container alignItems={'center'}>
        //     <Grid item xs={6} sm={8}>
        //       <Typography variant={'body2'} color={'textSecondary'}>
        //         {title}
        //       </Typography>
        //     </Grid>
        //     <Grid item xs={6} sm={4}>
        //       {component}
        //     </Grid>
        //   </Grid>
        // }
      />
      <ListItemSecondaryAction>
        {/*<IconButton edge={'end'}>*/}
        {/*  <CommentIcon />*/}
        {/*</IconButton>*/}
        {hideEditButton ? (
          component
        ) : isEditing ? (
          <Grid container alignItems={'center'}>
            <Grid item xs={10}>
              {component}
            </Grid>
            <Grid item xs={2}>
              <IconButton
                onClick={() => {
                  editClickHandler && editClickHandler(false);
                }}
              >
                <DoneIcon />
              </IconButton>
            </Grid>
          </Grid>
        ) : (
          <IconButton
            onClick={() => {
              editClickHandler && editClickHandler(true);
            }}
          >
            <EditIcon />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export interface BaseListItemProps {
  title: string | undefined;
  component: JSX.Element;
  hideEditButton?: boolean;
  isEditing?: boolean;
  editClickHandler?: (isEditing: boolean) => void;
}
