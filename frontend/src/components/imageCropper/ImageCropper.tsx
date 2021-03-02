import React, { useEffect, useRef } from 'react'
import './imageCropper.scss'
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import "./imageCropper.scss";

interface InputProps {
    src: any,
    roundDetails: App.RoundDetails
    setRoundDetails: (roundDetails: App.RoundDetails) => void
}

const ImageCropper = (props: InputProps) => {

    const imageElement: any = useRef(null);


    useEffect(() => {
        const cropper = new Cropper(imageElement.current, {
            zoomable: true,
            scalable: true,
            aspectRatio: 1,
            dragMode: "move",
            cropend: () => {
                const canvas = cropper.getCroppedCanvas();
                props.setRoundDetails({ ...props.roundDetails, companyLogoBase64String: canvas.toDataURL() })
            },
            toggleDragModeOnDblclick: false,
            minCropBoxWidth: 20,
            minCropBoxHeight: 20
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