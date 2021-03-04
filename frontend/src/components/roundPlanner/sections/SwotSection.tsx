import './swotSection.scss'
import React from 'react'
import RadarChart from './RadarChart';
import CustomVASlider from '../../shared/CustomVASlider';
import useSwotHelperTextGenerator from './useSwotHelperTextGenerator';
import useSwotTooltipGenerator from './useSwotTooltipGenerator';

interface InputProps {
    roundDetails: App.RoundDetails
    setRoundDetails: (roundDetails: App.RoundDetails) => void
    setNotificationDialogProperties: (any: any) => void
}

const SwotSection = (props: InputProps) => {

    const swotHelperTextGenerator = useSwotHelperTextGenerator()
    const swotTooltipGenerator = useSwotTooltipGenerator()

    const handleSwotChange = (name, value) => {
        let tempSwot = { ...props.roundDetails.swot }
        tempSwot[name] = value
        props.setRoundDetails({ ...props.roundDetails, swot: tempSwot })
    }

    return (
        <div id="swot-section" className="swot-section">
            <div className="content">
                <span className="page-subtitle">Strengths & Weaknesses.</span>
                <div className="row-wrapper">
                    <div id="swot-sliders" className="inputs-wrapper">
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
                                key="team"
                                // defaultValue={props.roundDetails.swot.team}
                                value={props.roundDetails.swot.team}
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
                            key="technology"
                                value={props.roundDetails.swot.technology}
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
                                key="advisors"
                                value={props.roundDetails.swot.advisors}
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
                            key="traction"
                                value={props.roundDetails.swot.traction}
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
                            key="market"
                                value={props.roundDetails.swot.market}
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
                        <RadarChart roundDetails={props.roundDetails} setRoundDetails={props.setRoundDetails} />
                    </div>

                </div>
            </div>


            <div className="results-wrapper">
                <div className="results content">
                    <div className="swot-tooltip-wrapper">
                        {swotTooltipGenerator.getTooltip(props.roundDetails.swot)}
                        {/* <span>😎 Wow all 5s - this looks like it could be the next unicorn!</span>  */}
                        {/* <span>🦇 THE BATMAN - xxx</span>  */}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default SwotSection