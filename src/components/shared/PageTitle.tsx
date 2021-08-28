import React from 'react';
import Typography from '@material-ui/core/Typography';
import { AppTheme } from '../../configs/theme/light-theme';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    title: {
      color: theme.palette.colors.active.highlight,
    },
  })
);

export default function PageTitle(props: PageTitleProps): JSX.Element {
  const classes = useStyles();

  // todo: change font size variant depending on theme breakpoints
  return (
    <Typography
      noWrap
      variant={'h4'}
      data-testid={'page-title'}
      className={classes.title}
    >
      {props.title}
    </Typography>
  );
}

export interface PageTitleProps {
  title: string;
}
