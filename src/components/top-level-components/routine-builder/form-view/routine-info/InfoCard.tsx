import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Add } from '@material-ui/icons';
import SegmentCard from './components/sections/SegmentCard';
import BaseCard from '../base-components/BaseCard';
import { Grid, IconButton } from '@material-ui/core';
import PhaseDropdown from './components/dropdowns/PhaseDropdown';
import { Phase, phases } from 'workout-app-common-core';
import { State } from '../../../../../configs/redux/store';
import { addSegmentToPhase } from '../../../../../creators/routine-builder/builder';

const InfoCard = ({
  phase,
  activeCardId,
  addSegmentToPhaseHandler,
}: InfoCardProps & PassedInProps): JSX.Element => {
  const cardId = `${phase.id}-'info-card'`;
  const isActive = activeCardId === cardId;
  let phaseTitle = 'Untitled Phase';
  phases.find((phaseVO) => {
    if (phaseVO.id === phase.phaseId) {
      phaseTitle = phaseVO.name;
    }
  });

  return (
    <BaseCard
      isActive={isActive}
      activeTitleComponent={
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PhaseDropdown phase={phase} />
          </Grid>
        </Grid>
      }
      cardId={cardId}
      baseTitleText={phaseTitle}
      actionButton={
        <IconButton onClick={addSegmentToPhaseHandler}>
          <Add />
        </IconButton>
      }
      cardContent={
        <Grid item xs={12} container>
          {phase.phaseId
            ? phase.segments.map((segment, index) => (
                <SegmentCard key={index} segment={segment} />
              ))
            : undefined}
        </Grid>
      }
    />
  );
};

interface PassedInProps {
  phase: Phase;
}

export interface InfoCardProps {
  activeCardId: string;
  addSegmentToPhaseHandler: () => void;
}

const mapStateToProps = (state: State): InfoCardProps => {
  return {
    activeCardId: state.routineBuilderState.activeCardId,
  } as unknown as InfoCardProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): InfoCardProps =>
  ({
    addSegmentToPhaseHandler: () => {
      dispatch(addSegmentToPhase(ownProps.phase.id));
    },
  } as unknown as InfoCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(InfoCard);
