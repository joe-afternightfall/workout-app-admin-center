import React from 'react';
import { Dispatch } from 'redux';
import {
  Segment,
  getSetTypeName,
  TrainingSetType,
  trainingSetTypes,
} from 'workout-app-common-core';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { selectSetType } from '../../../../../../../../../creators/routine-builder/builder';
import BaseSelectDropdown from '../../../../../../../../shared/BaseSelectDropdown';

const SetTypeHeader = ({
  segment,
  changeHandler,
}: SetTypeDropdownProps & PassedInProps): JSX.Element => {
  const handleSetChange = (setTypeId: string) => {
    changeHandler(setTypeId);
  };

  return (
    <Grid container alignItems={'center'} justify={'space-between'}>
      {segment.trainingSetTypeId ? (
        `Set type: ${getSetTypeName(segment.trainingSetTypeId)}`
      ) : (
        <>
          <Grid item>
            <Typography variant={'h5'} color={'textSecondary'}>
              {'Set type: '}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <BaseSelectDropdown
              id={segment.id}
              label={'Set Type'}
              variant={'standard'}
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

const mapStateToProps = (): SetTypeDropdownProps => {
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
