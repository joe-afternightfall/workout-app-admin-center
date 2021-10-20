import React from 'react';
import BaseListItem from './BaseListItem';

export default function StandardListItem({
  isDurationType,
  id,
  title,
}: StandardListItemProps): JSX.Element {
  return (
    <BaseListItem
      title={title}
      workoutExerciseId={id}
      isDuration={isDurationType}
      itemType={'standard'}
    />
  );
}

interface StandardListItemProps {
  isDurationType: boolean | undefined;
  id: string;
  title: string;
}
