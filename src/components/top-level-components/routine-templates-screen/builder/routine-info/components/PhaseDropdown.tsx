import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../../../../../configs/redux/store';
import { Phase, phases, PhaseVO } from 'workout-app-common-core';
import BaseSelectDropdown from '../../../../../shared/BaseSelectDropdown';
import { selectPhase } from '../../../../../../creators/routine-builder/builder';

const PhaseDropdown = ({
  phase,
  changeHandler,
  selectedPhases,
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
        const foundPhase = selectedPhases.find(
          (phase) => phase.phaseId === phaseVO.id
        );
        return {
          id: phaseVO.id,
          name: phaseVO.name,
          disabled: foundPhase !== undefined,
        };
      })}
    />
  );
};

interface PassedInProps {
  phase: Phase;
}

interface PhaseDropdownProps {
  selectedPhases: Phase[];
  changeHandler: (workoutPhaseId: string, phaseId: string) => void;
}

const mapStateToProps = (state: State): PhaseDropdownProps => {
  return {
    selectedPhases: state.routineBuilderState.selectedRoutine.phases,
  } as unknown as PhaseDropdownProps;
};

const mapDispatchToProps = (dispatch: Dispatch): PhaseDropdownProps =>
  ({
    changeHandler: (workoutPhaseId: string, phaseId: string) => {
      dispatch(selectPhase(workoutPhaseId, phaseId));
    },
  } as unknown as PhaseDropdownProps);

export default connect(mapStateToProps, mapDispatchToProps)(PhaseDropdown);
