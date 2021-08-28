import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Box, Chip, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { capitalizeFirstLetter } from '../../../../../utils/formatter';
import { toggleMuscleGroup } from '../../../../../creators/muscle-selector';
import muscleGroups, {
  MuscleGroup,
} from '../../../../../configs/models/workout-configurations/MuscleGroups';

const useStyles = makeStyles(() =>
  createStyles({
    chipsContainer: {
      background: '#f6f6f6',
      minHeight: '16vh',
      margin: '12px 0',
    },
  })
);

const SelectedMuscleGroupsBox = (
  props: SelectedMuscleGroupsBoxProps & PassedInProps
): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid item xs={12} container>
      <Grid item xs={12}>
        <Typography>{'Muscles Worked'}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Box className={classes.chipsContainer} component={'div'} m={1}>
          <Grid container spacing={2}>
            {props.selectedIds.map((muscleId: string, index: number) => {
              const foundMuscle = muscleGroups.find(
                (group: MuscleGroup) => group.id === muscleId
              );
              let chipLabel = '';
              if (foundMuscle) {
                chipLabel = capitalizeFirstLetter(foundMuscle.name);
              }
              return (
                <Grid item key={index}>
                  <Chip
                    size={'small'}
                    label={chipLabel}
                    onDelete={() => {
                      props.deleteHandler(muscleId);
                    }}
                    color={'primary'}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

interface PassedInProps {
  selectedIds: string[];
}

export interface SelectedMuscleGroupsBoxProps {
  deleteHandler: (muscleGroupCheckboxId: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): SelectedMuscleGroupsBoxProps =>
  ({
    deleteHandler: (muscleGroupCheckboxId: string) => {
      dispatch(toggleMuscleGroup(muscleGroupCheckboxId));
    },
  } as unknown as SelectedMuscleGroupsBoxProps);

export default connect(null, mapDispatchToProps)(SelectedMuscleGroupsBox);
