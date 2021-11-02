import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import ColorSelectionGrid from './components/ColorSelectionGrid';
import { colorChoices } from '../../../../../../../configs/constants/color-choices';

export default function ColorSelector(props: ColorSelectorProps): JSX.Element {
  const { chosenColorIds, selectedColorId, selectColorHandler } = props;

  const foundColor = colorChoices.find(
    (choice) => choice.id === selectedColorId
  );
  let selectedColorName = '';
  if (foundColor) {
    selectedColorName = foundColor.name;
  }

  return (
    <Grid item xs={12} container>
      <Grid item>
        <Typography variant={'h6'}>
          {`Workout Category Color: ${selectedColorName}`}
        </Typography>
      </Grid>

      <ColorSelectionGrid
        chosenColorIds={chosenColorIds}
        selectedColorName={selectedColorName}
        selectColorHandler={selectColorHandler}
      />
    </Grid>
  );
}

export interface ColorSelectorProps {
  chosenColorIds: string[];
  selectedColorId: string;
  selectColorHandler: (colorId: string) => void;
}
