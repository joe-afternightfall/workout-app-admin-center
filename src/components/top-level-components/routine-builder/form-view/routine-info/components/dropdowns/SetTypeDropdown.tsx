import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Segment,
  TrainingSetType,
  trainingSetTypes,
} from 'workout-app-common-core';
import BaseSelectDropdown from '../../../base-components/BaseSelectDropdown';
import { selectSetType } from '../../../../../../../creators/routine-builder/builder';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 200,
    },
  })
);

const SetTypeDropdown = ({
  segment,
  changeHandler,
}: SetTypeDropdownProps & PassedInProps): JSX.Element => {
  const classes = useStyles();

  const handleSetChange = (setTypeId: string) => {
    changeHandler(segment.id, setTypeId);
  };

  return (
    <BaseSelectDropdown
      fullWidth
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
  );
};

interface PassedInProps {
  segment: Segment;
}

interface SetTypeDropdownProps {
  changeHandler: (segmentId: string, setTypeId: string) => void;
}

const mapStateToProps = (state: any): SetTypeDropdownProps => {
  return {} as unknown as SetTypeDropdownProps;
};

const mapDispatchToProps = (dispatch: Dispatch): SetTypeDropdownProps =>
  ({
    changeHandler: (segmentId: string, setTypeId: string) => {
      dispatch(selectSetType(segmentId, setTypeId));
    },
  } as unknown as SetTypeDropdownProps);

export default connect(mapStateToProps, mapDispatchToProps)(SetTypeDropdown);
