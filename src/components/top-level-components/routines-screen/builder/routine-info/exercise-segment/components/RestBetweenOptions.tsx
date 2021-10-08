import React from 'react';
import { Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import {
  restBetweenSetOptions,
  restBetweenNextSegmentOptions,
} from 'workout-app-common-core';

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

const RestBetweenOptions = ({
  type,
  restBetweenNextSegmentValue,
  restBetweenSetValue,
  updateRestHandler,
}: RestBetweenOptionsProps & PassedInProps): JSX.Element => {
  const classes = useStyles();

  const handleSelectChange = (option: string) => {
    updateRestHandler(option);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormControl fullWidth variant={'outlined'}>
          <InputLabel id={'rest-between-sets-label'}>{'Sets'}</InputLabel>
          <Select
            label={'Sets'}
            labelId={'rest-between-sets-label'}
            id={'rest-between-sets-select-menu'}
            value={String(restBetweenSetValue)}
            onChange={(
              e: React.ChangeEvent<{
                name?: string | undefined;
                value: unknown;
              }>
            ) => {
              // changeHandler(e.target.value as string);
            }}
          >
            {buildMenuOptions(restBetweenSetOptions).map(
              (info, index: number) => {
                return (
                  <MenuItem key={index} value={info.id}>
                    {info.name}
                  </MenuItem>
                );
              }
            )}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth variant={'outlined'}>
          <InputLabel id={'rest-between-next-segment-label'}>
            {'Next Segment'}
          </InputLabel>
          <Select
            label={'Next Segment'}
            labelId={'rest-between-next-segment-label'}
            id={'rest-between-next-segment-select-menu'}
            value={restBetweenNextSegmentValue}
            onChange={(
              e: React.ChangeEvent<{
                name?: string | undefined;
                value: unknown;
              }>
            ) => {
              // changeHandler(e.target.value as string);
            }}
          >
            {buildMenuOptions(restBetweenNextSegmentOptions).map(
              (info, index: number) => {
                return (
                  <MenuItem key={index} value={info.id}>
                    {info.name}
                  </MenuItem>
                );
              }
            )}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

interface PassedInProps {
  restBetweenSetValue: number;
  restBetweenNextSegmentValue: number;
  segmentId?: string;
  type?: 'Sets' | 'Segment';
}

export interface RestBetweenOptionsProps {
  updateRestHandler: (option: string) => void;
}

const mapStateToProps = (state: any): RestBetweenOptionsProps => {
  return {} as unknown as RestBetweenOptionsProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): RestBetweenOptionsProps =>
  ({
    // updateRestHandler: (option: string) => {
    //   dispatch(updateRestBetween(ownProps.type, ownProps.segmentId, option));
    // },
  } as unknown as RestBetweenOptionsProps);

export default connect(mapStateToProps, mapDispatchToProps)(RestBetweenOptions);
