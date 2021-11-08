import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { ExtraInfo } from 'workout-app-common-core/core/configs/interfaces/exercise-settings/ExtraInfo';
import { updateInfoParagraph } from '../../../../../../../creators/exercise-form/exercise-form';

const InfoTitle = (props: InfoTitleProps & PassedInProps): JSX.Element => {
  const { info } = props;

  return (
    <TextField
      fullWidth
      value={info.title}
      id={`extra-info-title-${info.id}`}
      variant={'outlined'}
      label={'Paragraph Title'}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        props.changeHandler(info.id, e.target.value);
      }}
    />
  );
};

interface PassedInProps {
  info: ExtraInfo;
}

interface InfoTitleProps {
  changeHandler: (id: string, value: string) => void;
}
const mapDispatchToProps = (dispatch: Dispatch): InfoTitleProps =>
  ({
    changeHandler: (id: string, value: string) => {
      dispatch(updateInfoParagraph(id, 'title', value));
    },
  } as unknown as InfoTitleProps);

export default connect(null, mapDispatchToProps)(InfoTitle);
