import React from 'react';
import {
  GripType,
  gripTypes,
  GripWidth,
  gripWidths,
  EquipmentVO,
  equipmentList,
} from 'workout-app-common-core';
import { Grid, IconButton, Select, Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

export default function OptionalParams({
  params,
  selectOptionalParam,
}: OptionalParamsProps): JSX.Element {
  const classes = useStyles();
  const { gripWidthId, equipmentId, gripTypeId } = params;

  return (
    <Grid container alignItems={'center'}>
      <Grid item xs={12}>
        <Typography color={'textSecondary'}>{'Optional Parameters'}</Typography>
      </Grid>
      <Grid item xs={12}>
        {gripWidthId === '' ? (
          <Grid container alignItems={'center'}>
            <Grid item xs={8}>
              <Typography>{'Grip Width'}</Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton
                onClick={() => {
                  selectOptionalParam('gripWidth', gripWidths[0].id);
                }}
              >
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
        ) : (
          <Grid container alignItems={'center'}>
            <Grid item xs={8}>
              <FormControl className={classes.formControl}>
                <InputLabel id={'grip-width-label'}>{'Grip Width'}</InputLabel>
                <Select
                  labelId={'grip-width-label'}
                  id={'grip-width-select'}
                  value={gripWidthId}
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    selectOptionalParam(
                      'gripWidth',
                      event.target.value as string
                    );
                  }}
                >
                  {gripWidths.map((width: GripWidth, index: number) => (
                    <MenuItem value={width.id} key={index}>
                      {width.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <IconButton
                onClick={() => {
                  selectOptionalParam('gripWidth', '');
                }}
              >
                <Close />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        {gripTypeId === '' ? (
          <Grid container alignItems={'center'}>
            <Grid item xs={8}>
              <Typography>{'Grip Type'}</Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton
                onClick={() => {
                  selectOptionalParam('gripType', gripTypes[0].id);
                }}
              >
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
        ) : (
          <Grid container alignItems={'center'}>
            <Grid item xs={8}>
              <FormControl className={classes.formControl}>
                <InputLabel id={'grip-type-label'}>{'Grip Type'}</InputLabel>
                <Select
                  labelId={'grip-type-label'}
                  id={'grip-type-select'}
                  value={gripTypeId}
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    selectOptionalParam(
                      'gripType',
                      event.target.value as string
                    );
                  }}
                >
                  {gripTypes.map((type: GripType, index: number) => (
                    <MenuItem value={type.id} key={index}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <IconButton
                onClick={() => {
                  selectOptionalParam('gripType', '');
                }}
              >
                <Close />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        {equipmentId === '' ? (
          <Grid container alignItems={'center'}>
            <Grid item xs={8}>
              <Typography>{'Equipment'}</Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton
                onClick={() => {
                  selectOptionalParam('equipment', equipmentList[0].id);
                }}
              >
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
        ) : (
          <Grid container alignItems={'center'}>
            <Grid item xs={8}>
              <FormControl className={classes.formControl}>
                <InputLabel id={'equipment-label'}>{'Equipment'}</InputLabel>
                <Select
                  labelId={'equipment-label'}
                  id={'equipment-select'}
                  value={equipmentId}
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    selectOptionalParam(
                      'equipment',
                      event.target.value as string
                    );
                  }}
                >
                  {equipmentList.map(
                    (equipment: EquipmentVO, index: number) => (
                      <MenuItem value={equipment.id} key={index}>
                        {equipment.name}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <IconButton
                onClick={() => {
                  selectOptionalParam('equipment', '');
                }}
              >
                <Close />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

interface OptionalParamsProps {
  params: {
    gripWidthId: string;
    equipmentId: string;
    gripTypeId: string;
  };
  selectOptionalParam: (
    param: 'gripWidth' | 'gripType' | 'equipment',
    id: string
  ) => void;
}
