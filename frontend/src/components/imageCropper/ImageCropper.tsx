import React, { useCallback, useEffect, useRef, useState } from 'react'
import './imageCropper.scss'
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import "./imageCropper.scss";

interface InputProps {
    src: any,
    pdfObject: App.PdfObject,
    setPdfObject: (pdfObject: App.PdfObject) => void
}

const ImageCropper = (props: InputProps) => {

    const imageElement: any = useRef(null);

    useEffect(() => {
        const cropper = new Cropper(imageElement.current, {
            zoomable: true,
            scalable: true,
            aspectRatio: 1,
            cropend: () => {
                const canvas = cropper.getCroppedCanvas();
                props.setPdfObject({ ...props.pdfObject, companyLogoBase64String: canvas.toDataURL() })
            }
        });

        return () => {
            cropper.destroy()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, [props.src]);

    return (
        <div className="image-cropper">
            <div className="img-container">
                <img ref={imageElement} src={props.src} alt="Source" />
            </div>
            {/* <img src={imageDestination} className="img-preview" alt="Destination" /> */}
        </div>
    )
}

export default ImageCropper