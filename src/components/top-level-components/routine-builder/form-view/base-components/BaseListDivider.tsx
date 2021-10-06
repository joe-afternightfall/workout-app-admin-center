import React from 'react';
import { Divider, ListItem, ListItemText } from '@material-ui/core';

export default function BaseListDivider(): JSX.Element {
  return (
    <ListItem>
      <ListItemText
        disableTypography
        primary={<Divider variant={'middle'} />}
      />
    </ListItem>
  );
}
