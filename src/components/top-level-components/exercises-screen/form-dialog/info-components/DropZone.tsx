import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { DropzoneArea } from 'material-ui-dropzone';
import { updateFilesToUpload } from '../../../../../creators/exercise-form/exercise-form';

const PaperDropzone = (props: PaperDropzoneProps): JSX.Element => {
  return (
    <DropzoneArea
      onChange={props.updateHandler}
      showFileNames
      dropzoneText={'Drag and Drop file'}
      showAlerts={true}
      filesLimit={3}
      showPreviewsInDropzone
    />
  );
};

interface PaperDropzoneProps {
  updateHandler: (files: File[]) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): PaperDropzoneProps =>
  ({
    updateHandler: (files: File[]) => {
      dispatch(updateFilesToUpload(files));
    },
  } as unknown as PaperDropzoneProps);

export default connect(null, mapDispatchToProps)(PaperDropzone);
