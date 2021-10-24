import React from 'react';
import {
  Fade,
  Grid,
  CardHeader,
  Typography,
  IconButton,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';

export default function CompletedCardHeader({
  title,
  icon,
  display,
  editClickHandler,
}: CompletedCardHeaderProps): JSX.Element {
  return (
    <CardHeader
      disableTypography
      title={
        <Grid container alignItems={'center'} justify={'space-between'}>
          <Grid item>
            <Grid container alignItems={'center'} spacing={2}>
              <Grid item>{icon}</Grid>
              <Grid item>
                <Typography variant={'h6'} color={'textSecondary'}>
                  {title}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Fade in={display}>
              <IconButton onClick={editClickHandler}>
                <Edit />
              </IconButton>
            </Fade>
          </Grid>
        </Grid>
      }
    />
  );
}

interface CompletedCardHeaderProps {
  title: string;
  icon: JSX.Element;
  display: boolean;
  editClickHandler: () => void;
}
