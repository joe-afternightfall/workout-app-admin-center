import React from 'react';
import { Dispatch } from 'redux';
import {
  Phase,
  PhaseVO,
  NightfallSelectDropdown,
} from 'workout-app-common-core';
import { connect } from 'react-redux';
import { State } from '../../../../../../../configs/redux/store';
import { selectPhase } from '../../../../../../../creators/routine-builder/builder';

const PhaseDropdown = ({
  phase,
  phases,
  changeHandler,
  selectedPhases,
}: PhaseDropdownProps & PassedInProps): JSX.Element => {
  const handleSetChange = (phaseVOId: string) => {
    changeHandler(phase.id, phaseVOId);
  };

  return (
    <NightfallSelectDropdown
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
  phases: PhaseVO[];
  selectedPhases: Phase[];
  changeHandler: (workoutPhaseId: string, phaseId: string) => void;
}

const mapStateToProps = (state: State): PhaseDropdownProps => {
  return {
    phases: state.applicationState.workoutConfigurations.phases,
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
