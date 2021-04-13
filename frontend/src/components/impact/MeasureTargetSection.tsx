import { Card, Tooltip, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import React from 'react'
import './impact.scss'
import CustomVASlider from '../shared/CustomVASlider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

    const hideTarget = (targetIndex: number) => {
        let tempTargetList: any[] = Object.assign([], props.targetList)
        tempTargetList.forEach((target, index) => {
            if (index === targetIndex) {
                target.isVisible = false
            }
        });
        props.setTargetList(tempTargetList)
    }

    const restoreTargets = (SDGNumber: number) => {
        let tempTargetList: any[] = Object.assign([], props.targetList)
        tempTargetList.forEach((target, index) => {
            if (target.fields["SDG Number"][0] === SDGNumber) {
                target.isVisible = true
            }
        });
        props.setTargetList(tempTargetList)
    }

    const isTargetsHidden = (SDGNumber: number) => {
        let isHiddenFound = false
        props.targetList.forEach((target) => {
            if (target.fields["SDG Number"][0] === SDGNumber && target.isVisible === false) {
                isHiddenFound = true
            }
        });
        return isHiddenFound
    }
    const targetCount = (SDGNumber: number) => {
        let count = 0
        props.targetList.forEach((target) => {
            if (target.fields["SDG Number"][0] === SDGNumber && target.isVisible === true) {
                count++
            }
        });
        return count
    }

    return (
        <div className="measure-target-section">
            <p>Next, review each of the targets associated to your selected goals and assess how much impact you feel your organisation has against each goal.</p>
            {props.selectedSdgList.map((selectedSDG, index) => {
                return (
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <div className="column-title">SDG: {selectedSDG.fields.Goal} ({targetCount(selectedSDG.fields.Number)}) &nbsp;
                            {isTargetsHidden(selectedSDG.fields.Number) &&
                                <div className="clear-all hyperlink" onClick={()=>restoreTargets(selectedSDG.fields.Number)}>Restore targets</div>
                            }
                            </div>
                            
                            
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="sdg-container">
                                {props.targetList.map((target, index) => {
                                    return (
                                        <>
                                            {target.fields.Identifier.split(".")[0] === String(selectedSDG.fields.Number) && target.isVisible &&
                                                <Card key={index} className="target-card">
                                                    <img src={target.fields.Image[0].thumbnails.large.url} alt={target.fields.SDG[0]} />
                                                    <div className="right-section">
                                                        <div className="remove-button-wrapper">
                                                            <Tooltip title="Remove Target">
                                                                <div className="remove-button" onClick={() => hideTarget(index)}>X</div>
                                                            </Tooltip>
                                                        </div>

                                                        <span className="target-title">{target.fields.Title}</span>
                                                        <div className="target-description">{target.fields.description}</div>
                                                        <span className="label">Please assess how much impact you feel your oranisation has on this target:</span>
                                                        <div className="slider-wrapper">
                                                            {target.selfAssessment === 1 &&
                                                                <span className="self-assessment">Low Impact</span>
                                                            }
                                                            {target.selfAssessment === 2 &&
                                                                <span className="self-assessment">Medium Impact</span>
                                                            }
                                                            {target.selfAssessment === 3 &&
                                                                <span className="self-assessment">High Impact</span>
                                                            }
                                                            <CustomVASlider
                                                                key="team"
                                                                defaultValue={target.selfAssessment}
                                                                aria-labelledby="discrete-slider"
                                                                step={1}
                                                                min={1}
                                                                max={3}
                                                                onChange={(event, value) => updateTargetList(index, value)}
                                                                color={target.fields.Color}
                                                            />
                                                        </div>
                                                    </div>
                                                </Card>
                                            }
                                        </>
                                    )
                                })}
                            </div>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </div>
    )
}

export default MeasureTargetSection
