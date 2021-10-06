import React from 'react';
import { connect } from 'react-redux';
import ActionMenu from './components/ActionMenu';
import BaseCard from '../base-components/BaseCard';
import EditingTitle from './components/EditingTitle';
import { State } from '../../../../../configs/redux/store';
import { workoutCategories } from 'workout-app-common-core';

const RoutineTitleCard = ({
  editHandler,
  editingCardId,
  routineTitle,
  activeCardId,
  selectedWorkoutCategoryId,
}: RoutineTitleCardProps & PassedInProps): JSX.Element => {
  let subheader = 'Category';
  const cardId = 'routine-title-card';
  const isActive = activeCardId === cardId;
  const isEditing = editingCardId === cardId;

  workoutCategories.find((category) => {
    if (category.id === selectedWorkoutCategoryId) {
      subheader = `category: ${category.name}`;
    }
  });

  return (
    <BaseCard
      cardId={cardId}
      titleText={routineTitle ? routineTitle : 'Untitled Routine'}
      isSelectedCard={isActive}
      isEditing={isEditing}
      doneClickHandler={() => {
        editHandler('');
      }}
      editingTitleComponent={<EditingTitle />}
      subheader={isEditing ? undefined : subheader}
      actionButton={
        <ActionMenu
          editHandler={() => {
            editHandler(cardId);
          }}
        />
      }
    />
  );
};

interface PassedInProps {
  editingCardId: string;
  editHandler: (cardId: string) => void;
}

export interface RoutineTitleCardProps {
  routineTitle: string;
  activeCardId: string;
  selectedWorkoutCategoryId: string;
}

const mapStateToProps = (state: State): RoutineTitleCardProps => {
  const builderState = state.routineBuilderState;
  return {
    activeCardId: builderState.activeCardId,
    routineTitle: builderState.selectedRoutine.name,
    selectedWorkoutCategoryId: builderState.selectedRoutine.workoutCategoryId,
  } as unknown as RoutineTitleCardProps;
};

const mapDispatchToProps = (): RoutineTitleCardProps =>
  ({} as unknown as RoutineTitleCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(RoutineTitleCard);
