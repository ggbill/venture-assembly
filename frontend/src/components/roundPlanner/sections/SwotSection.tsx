import './swotSection.scss'
import React from 'react'
import RadarChart from './RadarChart';
import CustomVASlider from '../../shared/CustomVASlider';
import useSwotHelperTextGenerator from './useSwotHelperTextGenerator';

interface InputProps {
    roundDetails: App.RoundDetails
    setRoundDetails: (roundDetails: App.RoundDetails) => void
    setNotificationDialogProperties: (any: any) => void
}

const SwotSection = (props: InputProps) => {

    const swotHelperTextGenerator = useSwotHelperTextGenerator()

    const handleSwotChange = (name, value) => {
        let tempSwot = { ...props.roundDetails.swot }
        tempSwot[name] = value

        props.setRoundDetails({ ...props.roundDetails, swot: tempSwot })
    }

    return (
        <div className="swot-section">
            <div className="content">
                <h1>SWOT.</h1>
                <div className="row-wrapper">
                    <div className="inputs-wrapper">
                        <div className="slider-wrapper">
                            <div className="selected-figure">
                                <span className="label">
                                    {`Team: `}
                                </span>
                                <span className="value">
                                    {props.roundDetails.swot.team}
                                </span>
                            </div>

                            <CustomVASlider
                                defaultValue={props.roundDetails.swot.team}
                                aria-labelledby="discrete-slider"
                                step={1}
                                min={1}
                                max={5}
                                onChange={(event, value) => handleSwotChange("team", value)}
                            />
                            
                            <div className="helper-text">
                            <span>{swotHelperTextGenerator.getHelperText("team", props.roundDetails.swot.team)}</span>
                            </div>
                        </div>
                        <div className="slider-wrapper">
                            <div className="selected-figure">
                                <span className="label">
                                    {`Technology: `}
                                </span>
                                <span className="value">
                                    {props.roundDetails.swot.technology}
                                </span>
                            </div>

                            <CustomVASlider
                                defaultValue={props.roundDetails.swot.team}
                                aria-labelledby="discrete-slider"
                                step={1}
                                min={1}
                                max={5}
                                onChange={(event, value) => handleSwotChange("technology", value)}
                            />
                            
                            <div className="helper-text">
                                <span>{swotHelperTextGenerator.getHelperText("technology", props.roundDetails.swot.technology)}</span>
                            </div>
                        </div>
                        <div className="slider-wrapper">
                            <div className="selected-figure">
                                <span className="label">
                                    {`Advisors: `}
                                </span>
                                <span className="value">
                                    {props.roundDetails.swot.advisors}
                                </span>
                            </div>

                            <CustomVASlider
                                defaultValue={props.roundDetails.swot.advisors}
                                aria-labelledby="discrete-slider"
                                step={1}
                                min={1}
                                max={5}
                                onChange={(event, value) => handleSwotChange("advisors", value)}
                            />
                            
                            <div className="helper-text">
                            <span>{swotHelperTextGenerator.getHelperText("advisors", props.roundDetails.swot.advisors)}</span>
                            </div>
                        </div>
                        <div className="slider-wrapper">
                            <div className="selected-figure">
                                <span className="label">
                                    {`Traction: `}
                                </span>
                                <span className="value">
                                    {props.roundDetails.swot.traction}
                                </span>
                            </div>

                            <CustomVASlider
                                defaultValue={props.roundDetails.swot.traction}
                                aria-labelledby="discrete-slider"
                                step={1}
                                min={1}
                                max={5}
                                onChange={(event, value) => handleSwotChange("traction", value)}
                            />
                            
                            <div className="helper-text">
                            <span>{swotHelperTextGenerator.getHelperText("traction", props.roundDetails.swot.traction)}</span>
                            </div>
                        </div>
                        <div className="slider-wrapper">
                            <div className="selected-figure">
                                <span className="label">
                                    {`Market: `}
                                </span>
                                <span className="value">
                                    {props.roundDetails.swot.market}
                                </span>
                            </div>

                            <CustomVASlider
                                defaultValue={props.roundDetails.swot.market}
                                aria-labelledby="discrete-slider"
                                step={1}
                                min={1}
                                max={5}
                                onChange={(event, value) => handleSwotChange("market", value)}
                            />

                            <div className="helper-text">
                            <span>{swotHelperTextGenerator.getHelperText("market", props.roundDetails.swot.market)}</span>
                            </div>
                        </div>
                        {/* <div className="slider-wrapper">
                            <div className="selected-figure">
                                <span className="label">
                                    {`Uniqueness: `}
                                </span>
                                <span className="value">
                                    {props.roundDetails.swot.uniqueness}
                                </span>
                            </div>

                            <CustomVASlider
                                defaultValue={props.roundDetails.swot.uniqueness}
                                aria-labelledby="discrete-slider"
                                step={1}
                                min={1}
                                max={5}
                                onChange={(event, value) => handleSwotChange("uniqueness", value)}
                            />

                            <div className="helper-text">
                            <span>{swotHelperTextGenerator.getHelperText("uniqueness", props.roundDetails.swot.uniqueness)}</span>
                            </div>
                        </div> */}
                    </div>
                    <div className="chart-wrapper">
                        <RadarChart roundDetails={props.roundDetails} />
                    </div>

                </div>



            </div>
        </div>
    )
}

export default SwotSection