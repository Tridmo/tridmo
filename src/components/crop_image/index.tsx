import { useEffect, useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "../../utils/canvas_preview";
import 'react-image-crop/dist/ReactCrop.css';
import Buttons from "../buttons";
import { useDispatch } from "react-redux";
import { setOpenModal, setProfileImagePreview, setProfileImageState } from "../../data/modal_checker";
import { Box } from "@mui/material";
import { readFile } from "../inputs/file_input";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

interface Props {
  image: File,
  updateAvatar: (url) => any;
}

const ImageCropper = ({ image, updateAvatar, ...props }: Props) => {
  const dispatch = useDispatch<any>()
  const imgRef = useRef<any>(null);
  const previewCanvasRef = useRef<any>(null);
  const [imgSrc, setImgSrc] = useState<any>("");
  const [crop, setCrop] = useState<any>();
  const [error, setError] = useState("");

  const onSelectFile = (file: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e: any) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 pixels.");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  useEffect(() => {
    if (image) onSelectFile(image)
  }, [image])

  return (
    <>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {imgSrc && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <ReactCrop
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            onComplete={async () => {
              if (imgRef.current && previewCanvasRef.current) {
                setCanvasPreview(
                  imgRef.current, // HTMLImageElement
                  previewCanvasRef.current, // HTMLCanvasElement
                  convertToPixelCrop(
                    crop,
                    imgRef.current.width,
                    imgRef.current.height
                  )
                );
                previewCanvasRef.current.toBlob((blob) => {
                  updateAvatar(blob)
                })
              }
            }}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: "50vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
    </>
  );
};
export default ImageCropper;