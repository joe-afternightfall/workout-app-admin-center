import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { phases, PhaseVO } from 'workout-app-common-core';
import BaseSelectDropdown from '../../../base-components/BaseSelectDropdown';
import { updateRestBetween } from '../../../../../../../creators/routine-builder/builder';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

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

const RestBetweenDropdown = ({
  type,
  value,
  updateRestHandler,
}: RestBetweenDropdownProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  let data;
  let title = '';

  if (type === 'Sets') {
    title = 'Rest between sets:';
    data = buildMenuOptions(['15', '20', '25', '30', '45', '60']);
  } else {
    title = 'Rest between next segment:';
    data = buildMenuOptions(['30', '45', '60', '90', '120']);
  }

  const handleSelectChange = (option: string) => {
    updateRestHandler(option);
  };

  return (
    <Grid container alignItems={'center'}>
      <Grid item xs={6} sm={8}>
        <Typography variant={'body2'} color={'textSecondary'}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={6} sm={4}>
        <BaseSelectDropdown
          value={value}
          // label={type === 'Sets' ? type : 'Next Segment'}
          label={''}
          changeHandler={handleSelectChange}
          data={data}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

interface PassedInProps {
  value: string;
  segmentId: string;
  type: 'Sets' | 'Segment';
}
export interface RestBetweenDropdownProps {
  updateRestHandler: (option: string) => void;
}

const mapStateToProps = (state: any): RestBetweenDropdownProps => {
  return {} as unknown as RestBetweenDropdownProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): RestBetweenDropdownProps =>
  ({
    updateRestHandler: (option: string) => {
      dispatch(updateRestBetween(ownProps.type, ownProps.segmentId, option));
    },
  } as unknown as RestBetweenDropdownProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestBetweenDropdown);
