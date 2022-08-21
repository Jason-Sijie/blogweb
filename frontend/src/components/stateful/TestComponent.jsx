import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import Resizer from 'react-image-file-resizer';
import { updateProfile, uploadProfileAvatar } from '../../actions/profileRequest';

const TestComponent = (props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [array, setArray] = useState(null)
  const resizeFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
    uri => {
      resolve(uri);
    }, 'base64' );
});

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
  }, [])

  let readFileDataAsBase64 = (e) => {
    const file = e.target.files[0];
    console.log(file)

    const reader = new FileReader();
    reader.onload = (event) => {
      let buffer = event.target.result
      console.log(buffer);
      let bytes = new Uint8Array(buffer);
      console.log(bytes.toString())
      setArray("data:image/jpeg;base64," + buffer.toString('base64'));


      // uploadProfileAvatar(bytes, data => console.log("succeeded: ", data), error => console.log("error: ", error.message))
    };

    reader.onerror = (err) => {
    };

    reader.readAsArrayBuffer(file);
  }

  return (
    <div>
      <input type="file" id="avatar"  accept="image/png, image/jpeg" 
            onChange={readFileDataAsBase64} />

      {array ? <Cropper
          image={array}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        /> : <></>}
      
    </div>
    
  )
}

export default TestComponent;