import React from 'react';
import {
  Card,
  Grid,
  Typography,
  CardContent,
  CardActionArea,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { addSegmentToPhase } from '../../../../../../creators/routine-builder/builder';

const ClickToAddCard = (
  props: ClickToAddCardProps & PassedInProps
): JSX.Element => {
  return (
    <Card>
      <CardActionArea onClick={props.addSegmentHandler}>
        <CardContent>
          <Grid container justify={'center'}>
            <Typography gutterBottom variant={'h5'} color={'textSecondary'}>
              {'click to add'}
            </Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

interface PassedInProps {
  phaseId: string;
}

interface ClickToAddCardProps {
  addSegmentHandler: () => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): ClickToAddCardProps =>
  ({
    addSegmentHandler: () => {
      dispatch(addSegmentToPhase(ownProps.phaseId));
    },
  } as unknown as ClickToAddCardProps);

export default connect(null, mapDispatchToProps)(ClickToAddCard);
