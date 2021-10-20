import React from 'react';
import BaseListItem from './BaseListItem';

export default function BlinkerListItem({
  title,
}: BlinkerListItemProps): JSX.Element {
  return <BaseListItem title={title} itemType={'blinker'} shouldBlink={true} />;
}

interface BlinkerListItemProps {
  title: string;
}
