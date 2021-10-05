import React, { ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Grid, Paper, TextField } from '@material-ui/core';
import { Segment } from 'workout-app-common-core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SetTypeDropdown from './SetTypeDropdown';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: 4,
      backgroundColor: '#EDEDED',
      minHeight: 300,
      padding: 24,
    },
  })
);

const SegmentCard = ({
  segment,
}: SegmentCardProps & PassedInProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Paper style={{ padding: 16 }} elevation={0}>
        <Grid container>
          <Grid item xs={12}>
            <SetTypeDropdown segment={segment} />
          </Grid>
          {/*<Grid item xs={12}>*/}
          {/*  <Autocomplete*/}
          {/*    fullWidth*/}
          {/*    value={defaultValue}*/}
          {/*    id={'set-exercise'}*/}
          {/*    options={options.sort(*/}
          {/*      (a, b) => -b.firstLetter.localeCompare(a.firstLetter)*/}
          {/*    )}*/}
          {/*    getOptionLabel={(option) => option.name}*/}
          {/*    renderInput={(params) => (*/}
          {/*      <TextField*/}
          {/*        {...params}*/}
          {/*        label={'Exercise'}*/}
          {/*        variant={'outlined'}*/}
          {/*      />*/}
          {/*    )}*/}
          {/*    onChange={(e: ChangeEvent<Record<string, never>>, newValue) => {*/}
          {/*      newValue && selectExerciseHandler(newValue.id);*/}
          {/*    }}*/}
          {/*    getOptionSelected={(option, value) => option.id === value.id}*/}
          {/*  />*/}
          {/*</Grid>*/}
        </Grid>
      </Paper>
    </Box>
  );
};

interface PassedInProps {
  segment: Segment;
}

export interface SegmentCardProps {
  DELETE_ME?: undefined;
}

const mapStateToProps = (state: any): SegmentCardProps => {
  return {} as unknown as SegmentCardProps;
};

const mapDispatchToProps = (dispatch: Dispatch): SegmentCardProps =>
  ({} as unknown as SegmentCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(SegmentCard);
