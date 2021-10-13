import React from 'react';
import { Dispatch } from 'redux';
import {
  restBetweenSetOptions,
  NightfallSelectDropdown,
  restBetweenNextSegmentOptions,
} from 'workout-app-common-core';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import LineItemTitle from '../base-components/LineItemTitle';
import { updateRestBetween } from '../../../../../../../../../creators/routine-builder/builder';

interface MenuOptions {
  id: string;
  name: string;
}

function buildMenuOptions(options: string[]): MenuOptions[] {
  return options.map((option) => {
    return {
      id: option,
      name: `${option} seconds`,
    };
  });
}

const RestBetweenOptions = ({
  restBetweenNextSegmentValue,
  restBetweenSetValue,
  updateRestHandler,
}: RestBetweenOptionsProps & PassedInProps): JSX.Element => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} container alignItems={'center'}>
        <LineItemTitle title={'Rest between settings'} />
      </Grid>
      <Grid item xs={6}>
        <Grid container alignItems={'center'} justify={'center'} spacing={2}>
          <Grid item xs={12}>
            <NightfallSelectDropdown
              changeHandler={(option: string) => {
                updateRestHandler('set', option);
              }}
              data={buildMenuOptions(restBetweenSetOptions)}
              id={'rest-between-sets-select-menu'}
              label={'Sets'}
              value={String(restBetweenSetValue)}
              variant={'outlined'}
            />
          </Grid>

          <Grid item xs={12}>
            <NightfallSelectDropdown
              changeHandler={(option: string) => {
                updateRestHandler('segment', option);
              }}
              data={buildMenuOptions(restBetweenNextSegmentOptions)}
              id={'rest-between-next-segment-select-menu'}
              label={'Next Segment'}
              value={String(restBetweenNextSegmentValue)}
              variant={'outlined'}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

interface PassedInProps {
  restBetweenSetValue: number;
  restBetweenNextSegmentValue: number;
  segmentId: string;
}

export interface RestBetweenOptionsProps {
  updateRestHandler: (type: 'set' | 'segment', option: string) => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): RestBetweenOptionsProps =>
  ({
    updateRestHandler: (type: 'set' | 'segment', option: string) => {
      dispatch(updateRestBetween(type, ownProps.segmentId, option));
    },
  } as unknown as RestBetweenOptionsProps);

export default connect(null, mapDispatchToProps)(RestBetweenOptions);
