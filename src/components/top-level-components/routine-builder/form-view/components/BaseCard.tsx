import clsx from 'clsx';
import React from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    activeBorder: {
      borderLeft: '5px solid #4285f4',
    },
  })
);

export default function BaseCard({
  isActive,
  baseTitleText,
  baseSubheader,
  cardId,
  actionButton,
  cardContent,
  selectCardHandler,
  activeTitleComponent,
}: BaseCardProps): JSX.Element {
  const classes = useStyles();

  return (
    <Card
      onClick={() => {
        selectCardHandler(cardId);
      }}
      raised={isActive}
      className={classes.root}
    >
      <CardHeader
        disableTypography={isActive}
        title={isActive ? activeTitleComponent : baseTitleText}
        subheader={isActive ? undefined : baseSubheader}
        className={clsx({
          [classes.activeBorder]: isActive,
        })}
        action={actionButton}
      />
      {cardContent && <CardContent>{cardContent}</CardContent>}
    </Card>
  );
}

export interface BaseCardProps {
  isActive: boolean;
  activeTitleComponent: JSX.Element;
  baseTitleText: string;
  cardId: string;
  selectCardHandler: (id: string) => void;
  baseSubheader?: string;
  actionButton?: JSX.Element;
  cardContent?: JSX.Element;
}
