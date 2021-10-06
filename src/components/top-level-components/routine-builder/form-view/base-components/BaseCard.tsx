import clsx from 'clsx';
import React from 'react';
import { Card, CardContent, CardHeader, IconButton } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setActiveCard } from '../../../../../creators/routine-builder/builder';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    activeBorder: {
      borderLeft: '5px solid #4285f4',
    },
  })
);

const BaseCard = ({
  isSelectedCard,
  isEditing,
  subheader,
  titleText,
  cardId,
  doneClickHandler,
  actionButton,
  cardContent,
  selectCardHandler,
  editingTitleComponent,
}: BaseCardProps & PassedInProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Card
      onClick={() => {
        selectCardHandler(cardId);
      }}
      raised={isSelectedCard}
      className={classes.root}
    >
      <CardHeader
        disableTypography={isEditing}
        title={isEditing ? editingTitleComponent : titleText}
        subheader={isEditing ? undefined : subheader}
        className={clsx({
          [classes.activeBorder]: isSelectedCard,
        })}
        action={
          isEditing ? (
            <IconButton color={'inherit'} onClick={doneClickHandler}>
              <DoneIcon />
            </IconButton>
          ) : (
            isSelectedCard && actionButton
          )
        }
      />
      {cardContent && <CardContent>{cardContent}</CardContent>}
    </Card>
  );
};

interface PassedInProps {
  cardId: string;
  titleText: string;
  isSelectedCard: boolean;
  editingTitleComponent: JSX.Element;
  subheader?: string;
  actionButton?: JSX.Element;
  cardContent?: JSX.Element;
  isEditing: boolean;
  doneClickHandler: () => void;
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
