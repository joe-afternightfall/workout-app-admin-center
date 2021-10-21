import React from 'react';
import { Typography } from '@material-ui/core';

export default function LineItemTitle({
  title,
}: LineItemTitleProps): JSX.Element {
  return (
    <Typography variant={'subtitle1'} color={'textSecondary'}>
      {title}
    </Typography>
  );
}

interface LineItemTitleProps {
  title: string;
}
