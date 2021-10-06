import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import InfoCard from './routine-info/InfoCard';
import { Phase } from 'workout-app-common-core';
import { State } from '../../../../configs/redux/store';
import RoutineTitleCard from './title/RoutineTitleCard';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

const RoutineFormView = ({ phases }: RoutineFormViewProps): JSX.Element => {
  const classes = useStyles();
  const [editingCardId, setEditingCardId] = React.useState<string>('');

  const handleEditClick = (id: string) => {
    setEditingCardId(id);
  };

  return (
    <Grid container>
      <Grid item xs={7} container spacing={2}>
        <Grid item xs={12}>
          <RoutineTitleCard
            editingCardId={editingCardId}
            editHandler={handleEditClick}
          />
        </Grid>

        {editingCardId !== 'routine-title-card' &&
          phases.map((phase: Phase, index: number) => {
            return (
              <Grid item xs={12} key={index}>
                <InfoCard
                  phase={phase}
                  editingCardId={editingCardId}
                  editHandler={handleEditClick}
                />
              </Grid>
            );
          })}
      </Grid>
    </Grid>
  );
};

export interface RoutineFormViewProps {
  phases: Phase[];
}

const mapStateToProps = (state: State): RoutineFormViewProps => {
  return {
    phases: state.routineBuilderState.selectedRoutine.phases,
  } as unknown as RoutineFormViewProps;
};

const mapDispatchToProps = (): RoutineFormViewProps =>
  ({} as unknown as RoutineFormViewProps);

export default connect(mapStateToProps, mapDispatchToProps)(RoutineFormView);
