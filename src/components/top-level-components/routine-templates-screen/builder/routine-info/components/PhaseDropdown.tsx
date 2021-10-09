import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Phase, phases, PhaseVO } from 'workout-app-common-core';
import BaseSelectDropdown from '../../../../../shared/BaseSelectDropdown';
import { selectPhase } from '../../../../../../creators/routine-builder/builder';

const PhaseDropdown = ({
  changeHandler,
  phase,
}: PhaseDropdownProps & PassedInProps): JSX.Element => {
  const handleSetChange = (phaseVOId: string) => {
    changeHandler(phase.id, phaseVOId);
  };

  return (
    <BaseSelectDropdown
      id={phase.id}
      label={'Phase'}
      variant={'standard'}
      value={phase.phaseId}
      changeHandler={handleSetChange}
      data={phases.map((phaseVO: PhaseVO) => {
        return {
          id: phaseVO.id,
          name: phaseVO.name,
        };
      })}
    />
  );
};

interface PassedInProps {
  phase: Phase;
}

interface PhaseDropdownProps {
  changeHandler: (workoutPhaseId: string, phaseId: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): PhaseDropdownProps =>
  ({
    changeHandler: (workoutPhaseId: string, phaseId: string) => {
      dispatch(selectPhase(workoutPhaseId, phaseId));
    },
  } as unknown as PhaseDropdownProps);

export default connect(null, mapDispatchToProps)(PhaseDropdown);
