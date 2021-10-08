import React from 'react';
import { Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import BaseListItem from '../../../base-components/BaseListItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import BaseSelectDropdown from '../../../base-components/BaseSelectDropdown';
import { updateRestBetween } from '../../../../../../../creators/routine-builder/builder';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

interface MenuOptions {
  id: string;
  name: string;
}

function buildMenuOptions(options: string[]): MenuOptions[] {
  return options.map((option) => {
    return {
      id: option,
      name: `${option} seconds`,
    };
  });
}

const RestBetweenDropdown = ({
  type,
  value,
  updateRestHandler,
}: RestBetweenDropdownProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  let data;
  let title = '';

  if (type === 'Sets') {
    title = 'Rest between sets:';
    data = buildMenuOptions(['15', '20', '25', '30', '45', '60']);
  } else {
    title = 'Rest between next segment:';
    data = buildMenuOptions(['30', '45', '60', '90', '120']);
  }

  const handleSelectChange = (option: string) => {
    updateRestHandler(option);
  };

  return (
    <BaseListItem
      title={title}
      hideEditButton
      component={
        <BaseSelectDropdown
          fullWidth
          data={data}
          id={uuidv4()}
          value={value}
          changeHandler={handleSelectChange}
        />
      }
    />
  );
};

interface PassedInProps {
  value: string;
  segmentId: string;
  type: 'Sets' | 'Segment';
}

export interface RestBetweenDropdownProps {
  updateRestHandler: (option: string) => void;
}

const mapStateToProps = (state: any): RestBetweenDropdownProps => {
  return {} as unknown as RestBetweenDropdownProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): RestBetweenDropdownProps =>
  ({
    updateRestHandler: (option: string) => {
      // dispatch(updateRestBetween(ownProps.type, ownProps.segmentId, option));
    },
  } as unknown as RestBetweenDropdownProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestBetweenDropdown);
