import clsx from 'clsx';
import React from 'react';
import { ListItem, ListItemIcon } from '@material-ui/core';
import { NightfallTooltip } from 'workout-app-common-core';
import { AppTheme } from '../../../../configs/theme/light-theme';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { PageProps } from '../../../../configs/constants/app-navigation-routes';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    activeIcon: {
      color: theme.palette.colors.active.highlight,
    },
    listItem: {
      '&:hover': {
        background: theme.palette.colors.active.hover,
      },
    },
  })
);

export function NavListItem(props: NavListItemProps): JSX.Element {
  const classes = useStyles();

  const isActive = props.currentLocation === props.pageInfo.path;

  return (
    <NightfallTooltip
      component={
        <ListItem
          button
          onClick={props.clickHandler}
          className={clsx(classes.listItem, {
            [classes.activeIcon]: isActive,
          })}
          data-testid={props.pageInfo.testId}
        >
          <ListItemIcon
            className={clsx({
              [classes.activeIcon]: isActive,
            })}
          >
            {React.createElement(props.pageInfo.icon)}
          </ListItemIcon>
        </ListItem>
      }
      title={props.pageInfo.drawerTitle}
      placement={'right'}
    />
  );
}

export interface NavListItemProps {
  pageInfo: PageProps;
  clickHandler: () => void;
  currentLocation: string;
}
