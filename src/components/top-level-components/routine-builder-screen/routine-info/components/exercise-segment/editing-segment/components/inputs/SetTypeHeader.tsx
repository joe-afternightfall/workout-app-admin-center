import React from 'react';
import { Dispatch } from 'redux';
import {
  Segment,
  TrainingSetTypeVO,
  NightfallSelectDropdown,
} from 'workout-app-common-core';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { State } from '../../../../../../../../../configs/redux/store';
import { getTrainingSetTypeName } from '../../../../../../../../../utils/get-name';
import { selectSetType } from '../../../../../../../../../creators/routine-builder/builder';

const SetTypeHeader = ({
  segment,
  changeHandler,
  trainingSetTypes,
}: SetTypeDropdownProps & PassedInProps): JSX.Element => {
  const handleSetChange = (setTypeId: string) => {
    changeHandler(setTypeId);
  };

  return (
    <Grid container alignItems={'center'} justify={'space-between'}>
      {segment.trainingSetTypeId ? (
        `Set type: ${getTrainingSetTypeName(
          trainingSetTypes,
          segment.trainingSetTypeId
        )}`
      ) : (
        <>
          <Grid item>
            <Typography variant={'subtitle1'} color={'textSecondary'}>
              {'Set type: '}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <NightfallSelectDropdown
              id={segment.id}
              label={'Set Type'}
              variant={'standard'}
              value={segment.trainingSetTypeId}
              changeHandler={handleSetChange}
              data={trainingSetTypes.map((set: TrainingSetTypeVO) => {
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
  trainingSetTypes: TrainingSetTypeVO[];
  changeHandler: (setTypeId: string) => void;
}

const mapStateToProps = (state: State): SetTypeDropdownProps => {
  return {
    trainingSetTypes:
      state.applicationState.workoutConfigurations.trainingSetTypes,
  } as unknown as SetTypeDropdownProps;
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
