import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { Modal, Button } from "react-bootstrap";

// Reference: https://blog.logrocket.com/top-react-image-cropping-libraries/

const ImageCrop = ({ showModal, onModalHide, imgURL, onSaveHandler }) => {
  const [crop, setCrop] = useState({ x: 2, y: 2 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState("");

  const getCroppedImg = (sourceImage, crop, fileName) => {
    console.log("Start Cropping")
    const canvas = document.createElement("canvas");
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      sourceImage,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    console.log("canvas: " + canvas)
    try {
      return new Promise((resolve) => {
        canvas.toBlob((file) => {
          const url = URL.createObjectURL(file)
          console.log("new image url: " + url)
          resolve(url);
        }, "image/jpeg");
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);
  const showCroppedImage = useCallback(async () => {
    try {
      const image = new Image();
      image.src = imgURL;
      const croppedImageURL = await getCroppedImg(image, croppedArea, 0);
      return croppedImageURL;
    } catch (error) {
      console.error(error);
    }
  }, [croppedArea, imgURL]);

  return (
    <Modal show={showModal} size="lg" onHide={() => {
      onModalHide()
    }} >
      <Modal.Header closeButton>
        <Modal.Title>Edit Avatar</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{minHeight: "600px"}}>
        <Cropper image={imgURL}
              crop={crop}
              zoom={zoom}
              cropShape={"round"}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={async () => {
                onSaveHandler(await showCroppedImage())
                onModalHide()
              }}>
          Complete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageCrop;