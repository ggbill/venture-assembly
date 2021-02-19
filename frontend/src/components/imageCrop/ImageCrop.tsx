import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';
import './imageCrop.scss'

interface InputProps{
    src: any,
    pdfObject: App.PdfObject,
    setPdfObject: (pdfObject: App.PdfObject) => void
}

const ImageCrop = (props: InputProps) => {

    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: '%', aspect: 6 / 6 });
    // const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 9 });
    const [completedCrop, setCompletedCrop] = useState(null);

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image: any = imgRef.current;
        const canvas: any = previewCanvasRef.current;
        const crop: any = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        props.setPdfObject({...props.pdfObject, companyLogoBase64String: canvas.toDataURL('image/jpeg')})


    }, [completedCrop]);

    return (
        <div className="image-crop">
            <ReactCrop
                src={props.src}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
            />
            <div>
                <canvas
                    ref={previewCanvasRef}
                    style={{ display: "none" }}
                // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                // style={{
                //   width: Math.round(completedCrop?.width ?? 0),
                //   height: Math.round(completedCrop?.height ?? 0)
                // }}
                />
            </div>
            {/* <button
                type="button"
                //   disabled={!completedCrop?.width || !completedCrop?.height}
                onClick={() =>
                    generateDownload(previewCanvasRef.current, completedCrop)
                }
            >
                Download cropped image
        </button> */}
        </div>
    )
}

export default ImageCrop