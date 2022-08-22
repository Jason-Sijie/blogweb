import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import Resizer from 'react-image-file-resizer';
import { updateProfile, uploadProfileAvatar } from '../../actions/profileRequest';
import AvatarEdit from './home/AvatarEdit';
import ImageCrop from './util/ImageCrop';

const TestComponent = (props) => {
  const [file, setFile] = useState(null)
  const [show, setShow] = useState(false)
  const [newSrc, setNewSrc] = useState("")

  let readFileData = (e) => {
    const file = e.target.files[0];
    console.log(file)
    const url = URL.createObjectURL(file)
    console.log(url)
    setFile(url)
    setShow(true)

    const reader = new FileReader();
    reader.onload = (event) => {
      let buffer = event.target.result
      console.log(buffer);
      let bytes = new Uint8Array(buffer);

      // uploadProfileAvatar(bytes, data => console.log("succeeded: ", data), error => console.log("error: ", error.message))
    };

    reader.onerror = (err) => {
    };

    reader.readAsArrayBuffer(file);
  }

  return (
    <div>

      <AvatarEdit userId="8" handleModalShow={props.handleModalShow}/>
      
    </div>
    
  )
}

export default TestComponent;