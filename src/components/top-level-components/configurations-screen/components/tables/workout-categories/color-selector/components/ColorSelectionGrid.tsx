import clsx from 'clsx';
import React from 'react';
import Color from './Color';
import { Grid } from '@material-ui/core';
import { NightfallTooltip } from 'workout-app-common-core';
import {
  ColorChoice,
  colorChoices,
} from '../../../../../../../../configs/constants/color-choices';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    colorChoice: {
      height: 50,
      width: '100%',
      '&:hover': {
        cursor: 'pointer',
      },
      borderColor: '#fff',
    },
    selected: {
      border: '1px solid #fff',
    },
    chosen: {
      border: '1px solid #000',
      opacity: 0.5,
    },
  })
);

export default function ColorSelectionGrid(
  props: ColorChoicesProps
): JSX.Element {
  const classes = useStyles();

  return (
    <Grid
      container
      justify={'center'}
      style={{ width: '100%', margin: 'auto' }}
    >
      {colorChoices.map((colorChoice: ColorChoice, index: number) => {
        const selectedColorName = props.selectedColorName;
        const found = props.chosenColorIds.some((colorId: string) => {
          return colorId === colorChoice.id;
        });

        return (
          <NightfallTooltip
            key={index}
            placement={'right'}
            title={found ? 'Taken' : colorChoice.name}
            component={
              <Grid
                item
                xs={3}
                data-testid={colorChoice.name}
                className={clsx(classes.colorChoice, {
                  [classes.selected]: selectedColorName === colorChoice.name,
                  [classes.chosen]: found,
                })}
                style={{
                  backgroundColor: colorChoice.color,
                }}
                onClick={() =>
                  found ? undefined : props.selectColorHandler(colorChoice.id)
                }
              >
                {found ? (
                  <Color color={'#000'} />
                ) : (
                  selectedColorName === colorChoice.name && (
                    <Color color={'#fff'} />
                  )
                )}
              </Grid>
            }
          />
        );
      })}
    </Grid>
  );
}

interface ColorChoicesProps {
  chosenColorIds: string[];
  selectedColorName: string;
  selectColorHandler: (colorId: string) => void;
}
