import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { ManikinBothSides } from './ManikinBothSides';

const styles: Styles<Theme, StyledComponentProps> = () => ({
  cardHeader: {
    background: '#00bcd4',
    color: '#eee',
    textAlign: 'center',
  },
});

class MuscleSelectorCard extends Component<MuscleSelectorCardProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Card>
        <CardHeader
          className={classes.cardHeader}
          title={'Muscle Group Selector'}
        />

        <CardContent>
          <ManikinBothSides />
        </CardContent>
      </Card>
    );
  }
}

export type MuscleSelectorCardProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(MuscleSelectorCard);
