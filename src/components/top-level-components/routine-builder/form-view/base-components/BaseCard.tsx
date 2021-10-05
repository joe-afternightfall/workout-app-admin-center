import clsx from 'clsx';
import React from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setActiveCard } from '../../../../../creators/routine-builder/builder';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    activeBorder: {
      borderLeft: '5px solid #4285f4',
    },
  })
);

const BaseCard = ({
  isActive,
  baseTitleText,
  baseSubheader,
  cardId,
  actionButton,
  cardContent,
  selectCardHandler,
  activeTitleComponent,
}: BaseCardProps & PassedInProps): JSX.Element => {
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
};

interface PassedInProps {
  isActive: boolean;
  activeTitleComponent: JSX.Element;
  baseTitleText: string;
  cardId: string;
  baseSubheader?: string;
  actionButton?: JSX.Element;
  cardContent?: JSX.Element;
}

export interface BaseCardProps {
  selectCardHandler: (id: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): BaseCardProps =>
  ({
    selectCardHandler: (id: string) => {
      dispatch(setActiveCard(id));
    },
  } as unknown as BaseCardProps);

export default connect(null, mapDispatchToProps)(BaseCard);
