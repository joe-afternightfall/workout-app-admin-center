import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import {
  Grid,
  Card,
  CardHeader,
  IconButton,
  Typography,
  CardContent,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class RoutineBuilderScreen extends Component<RoutineBuilderScreenProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Grid xs={12} item container>
        <Grid item xs={5} container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                disableTypography
                title={<Typography>{'Phase Title'}</Typography>}
                action={
                  <IconButton aria-label={'phase-settings'}>
                    <MoreVertIcon />
                  </IconButton>
                }
              />
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardHeader
                disableTypography
                title={<Typography>{'Set Type'}</Typography>}
                action={
                  <IconButton aria-label={'phase-settings'}>
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Card>
                  <CardHeader
                    disableTypography
                    title={<Typography>{'Exercise #1'}</Typography>}
                    action={
                      <IconButton aria-label={'phase-settings'}>
                        <MoreVertIcon />
                      </IconButton>
                    }
                  />
                </Card>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export interface RoutineBuilderScreenProps extends WithStyles<typeof styles> {
  DELETE_ME?: undefined;
}

export default withStyles(styles, { withTheme: true })(RoutineBuilderScreen);
