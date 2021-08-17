import React, { useRef, useState, useEffect } from 'react';

import './ImageUpload.css';
import Button from './Button';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState();

  const filePickerRef = useRef();

  let pickedFile;
  let fileIsValid = isValid;
  /**
   * @pickedHandler is the default picking file handler that bind with the @onChange
   * of the file @input field 
   */
  const pickedHandler = (e) => {
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    props.onInput(props.id, pickedFile, fileIsValid);
  };

  /**
   * @useEffect will rerun when the file is changed
   */
  useEffect(() => {
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file])

  /**
   * @pickImageHandler used in this way with this extra @ref to hide 
   * the default view of the input field of type file and use a custom 
   * UI that's implemented using custom @Button 
   * We do NOT need to do so, it's just to use custom UI for file input field
   */
  const pickImageHandler = () => {
    filePickerRef.current.click();
  }


  return (
    <div className="form-control" >
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept='.jpg, .jpeg, .png'
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && 'center'} `}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="preview" />}
          {!previewUrl && <p>Please pick an image</p>}
        </div>
        <Button type="button" onClick={pickImageHandler} >PICK IMAGE</Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  )
}

export default ImageUpload
