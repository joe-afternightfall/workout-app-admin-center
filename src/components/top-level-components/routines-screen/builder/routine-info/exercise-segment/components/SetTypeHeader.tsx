import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  getSetTypeName,
  Segment,
  TrainingSetType,
  trainingSetTypes,
} from 'workout-app-common-core';
import BaseSelectDropdown from '../../../../../routine-builder/form-view/base-components/BaseSelectDropdown';
import { selectSetType } from '../../../../../../../creators/routine-builder/builder';
import { Grid, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteSetTypeDialog from './DeleteSetTypeDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 200,
    },
  })
);

const SetTypeHeader = ({
  segment,
  changeHandler,
}: SetTypeDropdownProps & PassedInProps): JSX.Element => {
  const classes = useStyles();

  const handleSetChange = (setTypeId: string) => {
    changeHandler(setTypeId);
  };

  return (
    <Grid container alignItems={'center'} justify={'space-between'}>
      {segment.trainingSetTypeId ? (
        <>
          <Grid item>
            <Grid container alignItems={'center'} spacing={2}>
              <Grid item>
                <Typography variant={'body1'} color={'textSecondary'}>
                  {'Set type: '}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant={'h5'} color={'textPrimary'}>
                  {getSetTypeName(segment.trainingSetTypeId)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <DeleteSetTypeDialog />
          </Grid>
        </>
      ) : (
        <>
          <Grid item>
            <Typography variant={'h5'} color={'textSecondary'}>
              {'Set type: '}
            </Typography>
          </Grid>

          <Grid item>
            <BaseSelectDropdown
              // fullWidth
              id={segment.id}
              value={segment.trainingSetTypeId}
              changeHandler={handleSetChange}
              data={trainingSetTypes.map((set: TrainingSetType) => {
                return {
                  id: set.id,
                  name: set.name,
                };
              })}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

interface PassedInProps {
  segment: Segment;
}

interface SetTypeDropdownProps {
  changeHandler: (setTypeId: string) => void;
}

const mapStateToProps = (state: any): SetTypeDropdownProps => {
  return {} as unknown as SetTypeDropdownProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): SetTypeDropdownProps =>
  ({
    changeHandler: (setTypeId: string) => {
      dispatch(selectSetType(ownProps.segment.id, setTypeId));
    },
  } as unknown as SetTypeDropdownProps);

export default connect(mapStateToProps, mapDispatchToProps)(SetTypeHeader);
