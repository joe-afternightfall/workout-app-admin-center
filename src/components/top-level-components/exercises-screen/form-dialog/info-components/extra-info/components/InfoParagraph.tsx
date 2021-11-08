import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import {
  removeInfo,
  updateInfoParagraph,
} from '../../../../../../../creators/exercise-form/exercise-form';
import { ExtraInfo } from 'workout-app-common-core/core/configs/interfaces/exercise-settings/ExtraInfo';

const InfoParagraph = (
  props: InfoParagraphProps & PassedInProps
): JSX.Element => {
  const { info } = props;

  return (
    <TextField
      fullWidth
      value={info.paragraph}
      id={`extra-info-paragraph-${info.id}`}
      multiline
      rows={4}
      variant={'filled'}
      label={'Paragraph Details'}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        props.changeHandler(info.id, e.target.value);
      }}
    />
  );
};

interface PassedInProps {
  info: ExtraInfo;
}

interface InfoParagraphProps {
  changeHandler: (id: string, value: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): InfoParagraphProps =>
  ({
    removeInfoClickHandler: (id: string) => {
      dispatch(removeInfo(id));
    },
    changeHandler: (id: string, value: string) => {
      dispatch(updateInfoParagraph(id, 'paragraph', value));
    },
  } as unknown as InfoParagraphProps);

export default connect(null, mapDispatchToProps)(InfoParagraph);
