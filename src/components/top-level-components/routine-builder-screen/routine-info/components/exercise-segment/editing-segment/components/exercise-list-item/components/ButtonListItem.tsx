import React from 'react';
import BaseListItem from './BaseListItem';

export default function ButtonListItem({
  title,
  clickHandler,
}: ButtonListItemProps): JSX.Element {
  return (
    <BaseListItem
      itemType={'button'}
      title={title}
      clickHandler={clickHandler}
    />
  );
}

interface ButtonListItemProps {
  title: string;
  clickHandler: () => void;
}
