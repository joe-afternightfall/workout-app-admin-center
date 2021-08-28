import React from 'react';
import {
  List,
  Checkbox,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListSubheader,
} from '@material-ui/core';
import { capitalizeSetType } from '../../../../../utils/formatter';
import { SetType } from '../../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeDAO';

export default function SetTypes(props: SetTypesProps): JSX.Element {
  return (
    <List subheader={<ListSubheader>{'Exercise Set Type'}</ListSubheader>}>
      {Object.values(SetType).map((type: string, index: number) => {
        return (
          <ListItem key={index}>
            <ListItemIcon>
              <Checkbox
                checked={props.checked === type}
                onChange={props.clickHandler}
                name={type}
              />
            </ListItemIcon>
            <ListItemText primary={capitalizeSetType(type)} />
          </ListItem>
        );
      })}
    </List>
  );
}

export interface SetTypesProps {
  clickHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: string;
}
