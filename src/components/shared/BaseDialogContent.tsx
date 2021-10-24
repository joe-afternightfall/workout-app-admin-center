import React from 'react';
import BaseDialogTitle from './BaseDialogTitle';
import { DialogActions, DialogContent } from '@material-ui/core';

export default function BaseDialogContent(
  props: BaseDialogContentProps
): JSX.Element {
  const { dialogContent, title, closeClickHandler, dialogActions } = props;

  return (
    <>
      <BaseDialogTitle title={title} closeClickHandler={closeClickHandler} />

      <DialogContent dividers>{dialogContent}</DialogContent>

      <DialogActions>{dialogActions}</DialogActions>
    </>
  );
}

interface BaseDialogContentProps {
  title: string;
  dialogContent: JSX.Element;
  dialogActions: JSX.Element;
  closeClickHandler: () => void;
}
