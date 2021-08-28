import clsx from 'clsx';
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  applyHoverStylesToMuscleGroup,
  clearHoverStylesForMuscleGroup,
  toggleMuscleGroup,
} from '../../../../../creators/muscle-selector';
import { State } from '../../../../../configs/redux/store';
import muscleGroups, {
  MuscleGroup,
} from '../../../../../configs/models/workout-configurations/MuscleGroups';

const useStyles = makeStyles(() =>
  createStyles({
    checkbox: {
      display: 'none',
    },
    label: {
      width: 50,
      display: 'block',
      marginBottom: '0.5rem',
      cursor: 'pointer',
      fontSize: '0.7rem',
      opacity: 0.5,
      position: 'relative',
      zIndex: 200,
      borderLeft: '5px solid transparent',
      paddingLeft: 6,
      marginLeft: -11,
      '&:hover': {
        opacity: 1,
        borderColor: 'rgba(51, 51, 51, .75)',
      },
    },
    checkedLabel: {
      opacity: 1,
      fontWeight: 'bold',
      color: '#00bcd4',
    },
    hovering: {
      opacity: 1,
      borderColor: 'rgba(51, 51, 51, .75)',
    },
  })
);

const Selector = (
  props: SelectorControlProps & SelectorControlsPassedInProps
): JSX.Element => {
  const classes = useStyles();
  const foundMuscle = muscleGroups.find(
    (group: MuscleGroup) => group.name === props.muscleName
  );
  let checkboxInputId = '';
  let foundIndex = -1;

  if (foundMuscle) {
    checkboxInputId = `${foundMuscle.name}-checkbox`;
    foundIndex = props.selectedMuscleGroupIds.indexOf(foundMuscle.id);
  }

  const handleToggle = () => {
    if (foundMuscle) {
      props.selectHandler(foundMuscle.id);
    }
  };

  const handleMouseOver = () => {
    if (foundMuscle) {
      props.mouseOverHandler(foundMuscle.id);
    }
  };

  const handleMouseOut = () => {
    props.mouseOutHandler();
  };

  const checkForHover = (): boolean => {
    if (foundMuscle) {
      return props.hoveringOverGroup === foundMuscle.id;
    }
    return false;
  };

  return (
    <>
      <input
        type={'checkbox'}
        className={clsx(classes.checkbox, props.muscleName)}
        id={checkboxInputId}
        value={' '}
        onChange={() => {
          handleToggle();
        }}
      />

      <label
        htmlFor={checkboxInputId}
        className={clsx(classes.label, {
          [classes.checkedLabel]: foundIndex !== -1,
          [classes.hovering]: checkForHover(),
        })}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <Typography>{props.title}</Typography>
      </label>
    </>
  );
};

export interface SelectorControlProps {
  hoveringOverGroup: string;
  selectedMuscleGroupIds: string[];
  selectHandler: (muscleGroupCheckboxId: string) => void;
  mouseOverHandler: (muscleGroupId: string) => void;
  mouseOutHandler: () => void;
}

export interface SelectorControlsPassedInProps {
  muscleName: string;
  title: string;
}

const mapStateToProps = (state: State): SelectorControlProps => {
  return {
    hoveringOverGroup: state.applicationState.applyHoverStylesToMuscleGroup,
    selectedMuscleGroupIds: state.applicationState.selectedMuscleGroupIds,
  } as unknown as SelectorControlProps;
};

const mapDispatchToProps = (dispatch: Dispatch): SelectorControlProps =>
  ({
    selectHandler: (muscleGroupCheckboxId: string) => {
      dispatch(toggleMuscleGroup(muscleGroupCheckboxId));
    },
    mouseOverHandler: (muscleGroupId: string) => {
      dispatch(applyHoverStylesToMuscleGroup(muscleGroupId));
    },
    mouseOutHandler: () => {
      dispatch(clearHoverStylesForMuscleGroup());
    },
  } as unknown as SelectorControlProps);

export default connect(mapStateToProps, mapDispatchToProps)(Selector);
