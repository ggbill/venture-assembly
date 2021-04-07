import { Card } from '@material-ui/core'
import React from 'react'
import './impact.scss'
import CustomVASlider from '../shared/CustomVASlider';

interface InputProps {
    selectedSdgList: any[],
    targetList: any[],
    setTargetList: (targetList: any[]) => void
}



const MeasureTargetSection = (props: InputProps) => {

    const updateTargetList = (targetIndex: number, value: number) => {
        let tempTargetList: any[] = Object.assign([], props.targetList)
        tempTargetList.forEach((target, index) => {
            if (index === targetIndex) {
                target.selfAssessment = value
            }
        });
        props.setTargetList(tempTargetList)
    }

    return (
        <div className="measure-target-section">
             <p>Next, review each of the targets associated to your selected goals and assess how much impact you feel your organisation has against each goal.</p>
            {props.selectedSdgList.map((selectedSDG, index) => {
                return (
                    <div>
                        <div className="page-subtitle">SDG: {selectedSDG.fields.Goal}</div>
                        <div className="sdg-container">
                            {props.targetList.map((target, index) => {
                                return (
                                    <>
                                        {target.fields.Identifier.split(".")[0] === String(selectedSDG.fields.Number) &&
                                            <Card key={index} className="target-card">
                                                <img src={target.fields.Image[0].thumbnails.large.url} alt={target.fields.SDG[0]} />
                                                <div className="right-section">
                                                    <span>{target.fields.description}</span>
                                                    <span className="label">Please assess how much impact you feel your oranisation has on this target:</span>
                                                    <div className="slider-wrapper">
                                                        {target.selfAssessment === 0 &&
                                                            <span className="self-assessment">No Impact</span>
                                                        }
                                                        {target.selfAssessment === 1 &&
                                                            <span className="self-assessment">Some Impact</span>
                                                        }
                                                        {target.selfAssessment === 2 &&
                                                            <span className="self-assessment">Significant Impact</span>
                                                        }
                                                        <CustomVASlider
                                                            key="team"
                                                            value={target.selfAssessment}
                                                            aria-labelledby="discrete-slider"
                                                            step={1}
                                                            min={0}
                                                            max={2}
                                                            onChange={(event, value) => updateTargetList(index, value)}
                                                        />
                                                    </div>
                                                </div>
                                            </Card>
                                        }
                                    </>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default MeasureTargetSection
