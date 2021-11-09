import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import InfoTitle from './components/InfoTitle';
import AddInfoLink from './components/AddInfoLink';
import InfoParagraph from './components/InfoParagraph';
import RemoveInfoButton from './components/RemoveInfoButton';
import { State } from '../../../../../../configs/redux/store';
import {
  removeInfo,
  updateInfoParagraph,
} from '../../../../../../creators/exercise-form/exercise-form';
import { ExtraInfo } from 'workout-app-common-core/core/configs/interfaces/exercise-settings/ExtraInfo';

const ExtraInfoContainer = (props: ExtraInfoContainerProps): JSX.Element => {
  const { extraInfo } = props;

  return (
    <Grid container spacing={2}>
      {extraInfo?.map((info, index) => {
        return (
          <Grid key={index} item xs={12} container>
            <Grid item xs={12} container>
              <Grid item xs={10}>
                <InfoTitle info={info} />
              </Grid>
              <RemoveInfoButton infoId={info.id} />
            </Grid>
            <Grid item xs={12} style={{ marginTop: 12 }}>
              <InfoParagraph info={info} />
            </Grid>
          </Grid>
        );
      })}
      <Grid item xs={12}>
        <AddInfoLink />
      </Grid>
    </Grid>
  );
};

interface ExtraInfoContainerProps {
  extraInfo: ExtraInfo[];
  changeHandler: (
    id: string,
    field: 'title' | 'paragraph',
    value: string
  ) => void;
  removeInfoClickHandler: (id: string) => void;
}
const mapStateToProps = (state: State): ExtraInfoContainerProps => {
  return {
    extraInfo: state.exerciseFormState.exerciseForm.extraInfo,
  } as unknown as ExtraInfoContainerProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ExtraInfoContainerProps =>
  ({
    removeInfoClickHandler: (id: string) => {
      dispatch(removeInfo(id));
    },
    changeHandler: (
      id: string,
      field: 'title' | 'paragraph',
      value: string
    ) => {
      dispatch(updateInfoParagraph(id, field, value));
    },
  } as unknown as ExtraInfoContainerProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExtraInfoContainer);
