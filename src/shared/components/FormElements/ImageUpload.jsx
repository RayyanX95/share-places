import React, { useRef } from 'react';

import './ImageUpload.css';
import Button from './Button';

const ImageUpload = (props) => {
  const filePickerRef = useRef();

  const pickImageHandler = () => {
    filePickerRef.current.click();
  }

  const pickedHandler = (e) => {
    console.log('e.target', e.target);
  }
  return (
    <div className="form-control" >
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept='jpg, jpeg, png'
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && 'center'} `}>
        <div className="image-upload__preview">
          <img src="" alt="preview" />
        </div>
        <Button type="button" onClick={pickImageHandler} >PICK IMAGE</Button>
      </div>

    </div>
  )
}

export default ImageUpload
