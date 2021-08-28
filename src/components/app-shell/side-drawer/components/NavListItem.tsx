import clsx from 'clsx';
import React from 'react';
import { PageProps } from '../../../../configs/constants/routes';
import { AppTheme } from '../../../../configs/theme/light-theme';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    activeIcon: {
      // color: theme.palette.colors.active.highlight,
      color: '#1C2571',
      // background: theme.palette.colors.active.hover,
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
      {props.displayText ? (
        <ListItemText
          data-testid={`list-item-${props.pageInfo.testId}`}
          primary={props.pageInfo.drawerTitle}
        />
      ) : undefined}
    </ListItem>
  );
}

export interface NavListItemProps {
  pageInfo: PageProps;
  clickHandler: () => void;
  displayText: boolean;
  currentLocation: string;
}
