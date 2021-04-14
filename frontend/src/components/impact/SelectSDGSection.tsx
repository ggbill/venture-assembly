import React from 'react'
import './impact.scss'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Card, Tooltip } from '@material-ui/core'
import { ReactComponent as MinusSVG } from '../../images/minus.svg'
import { ReactComponent as AddSVG } from '../../images/add.svg'

interface InputProps {
    uniqueTagList: string[],
    filterAvailableSDGs: (event: any, value: any) => void,
    filter: string | null,
    availableSdgList: any[],
    selectedSdgList: any[],
    addSdg: (sdgNumber: number) => void,
    removeSdg: (sdgNumber: number) => void,
    removeAllSdgs: () => void,
}


const SelectSDGSection = (props: InputProps) => {
    return (
        <div className="select-sdg-section">
            <span className="page-subtitle">Select SDGs</span>
            <p>Select the SDGs that apply to your business from the list below or use the search box to help select based on key words and then click "Next"
                at the bottom of the page. </p>

            <Autocomplete
                options={props.uniqueTagList}
                // getOptionLabel={(option) => option.title}
                // style={{ width: 300 }}
                onChange={props.filterAvailableSDGs}
                value={props.filter}
                renderInput={(params) => <TextField {...params} label="Filter SDGs" variant="outlined" />}
            />

            {/* {JSON.stringify(availableSdgList)} */}

            <div className="sdg-list-section">
                <div className="available-sdg-section">
                    <div className="column-title">Available SDGs</div>
                    <div className="sdg-container">
                        {props.availableSdgList.length > 0 ?
                            <>
                                {props.availableSdgList.map((sdg, index) => {
                                    return (
                                        <Card key={index} className="sdg-card" onClick={() => props.addSdg(sdg.fields.Number)}>
                                            <div className="left-content" aria-readonly>
                                                <img src={sdg.fields.Image[0].url} alt={sdg.fields.Goal} />
                                                <span>{sdg.fields.Goal}</span>
                                            </div>

                                            <Tooltip title="Select SDG">
                                                <AddSVG />
                                            </Tooltip>
                                        </Card>
                                    )
                                })}
                            </>
                            :
                            <div className="none-selected">No SDGs available</div>
                        }
                    </div>

                </div>
                <div className="selected-sdg-section">
                    <div className="column-title">
                        Selected SDGs &nbsp;
                            {props.selectedSdgList.length > 0 && <div className="clear-all hyperlink" onClick={() => props.removeAllSdgs()}>Clear all</div>}
                    </div>
                    <div className="sdg-container">
                        {props.selectedSdgList.length > 0 ?
                            <>
                                {props.selectedSdgList.map((sdg, index) => {
                                    return (
                                        <Card key={index} className="sdg-card" onClick={() => props.removeSdg(sdg.fields.Number)}>
                                            <div className="left-content">
                                                <img src={sdg.fields.Image[0].url} alt={sdg.fields.Goal} />
                                                <span>{sdg.fields.Goal}</span>
                                            </div>

                                            <Tooltip title="Remove SDG">
                                                <MinusSVG />
                                            </Tooltip>
                                        </Card>
                                    )
                                })}
                            </>
                            :
                            <div className="none-selected">No SDGs selected</div>
                        }

                    </div>
                </div>

            </div>

        </div>
    )
}

export default SelectSDGSection
