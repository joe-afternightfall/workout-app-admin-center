import React from 'react';
import { Fade, Tooltip } from '@material-ui/core';

export default function AppTooltip(props: AppTooltipProps): JSX.Element {
  return (
    <Tooltip
      arrow
      interactive
      enterDelay={500}
      leaveDelay={200}
      placement={props.placement}
      title={props.title}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 600 }}
    >
      {props.element}
    </Tooltip>
  );
}

export interface AppTooltipProps {
  element: JSX.Element;
  title: string;
  placement:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
}
