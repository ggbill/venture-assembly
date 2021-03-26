import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import MenuBar from '../shared/MenuBar'
import './impact.scss'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Card, Tooltip } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

const Impact = () => {

    const [uniqueTagList, setUniqueTagList] = useState<string[]>([])
    const [sdgList, setSdgList] = useState<any[]>([])
    const [availableSdgList, setAvailableSdgList] = useState<any[]>([])
    const [selectedSdgList, setSelectedSdgList] = useState<any[]>([])

    const airtableApi = useFetch("airtable")

    const addSdg = (sdgNumber) => {
        let newAvailableSdgList = Object.assign([], availableSdgList)
        let newSelectedSdgList = Object.assign([], selectedSdgList)

        availableSdgList.forEach((sdg, index) => {
            if (sdg.fields.Number === sdgNumber) {
                newAvailableSdgList.splice(index, 1)
                setAvailableSdgList(newAvailableSdgList.sort((a: any, b: any) => a.fields.Number - b.fields.Number))

                newSelectedSdgList.push(sdg)
                setSelectedSdgList(newSelectedSdgList.sort((a: any, b: any) => a.fields.Number - b.fields.Number))
            }
        });
    }

    const removeSdg = (sdgNumber) => {
        let newAvailableSdgList = Object.assign([], availableSdgList)
        let newSelectedSdgList = Object.assign([], selectedSdgList)

        selectedSdgList.forEach((sdg, index) => {
            if (sdg.fields.Number === sdgNumber) {
                newSelectedSdgList.splice(index, 1)
                setSelectedSdgList(newSelectedSdgList.sort((a: any, b: any) => a.fields.Number - b.fields.Number))

                newAvailableSdgList.push(sdg)
                setAvailableSdgList(newAvailableSdgList.sort((a: any, b: any) => a.fields.Number - b.fields.Number))
            }
        });

    }

    const removeAllSdgs = () => {
        setAvailableSdgList(sdgList)
        setSelectedSdgList([])
    }

    useEffect(() => {
        airtableApi.get("get-sdgs").then((result) => {
            console.log(result)
            setSdgList(result)
            setAvailableSdgList(result)

            let tempUniqueTagList: string[] = []

            result.forEach(row => {
                if (row.fields.Tags) {
                    row.fields.Tags.split(",").forEach((tag: string) => {
                        tempUniqueTagList.push(tag.trim())
                    })
                }

            })

            setUniqueTagList(tempUniqueTagList.sort())

        }).catch((err: Error) => {
            console.log(err)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, []);


    return (
        <div className="impact-page">
            <MenuBar />
            <div className="content top-page-margin">
                <div className="intro-wrapper">
                    <span className="page-title">🌳 Sustainable Development Goals (SDGs)</span>
                    <p>Select the SDGs that apply to your business from the list below or use the search box to help select based on key words.</p>
                </div>
                <Autocomplete
                    id="combo-box-demo"
                    options={uniqueTagList}
                    // getOptionLabel={(option) => option.title}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Filter SDGs" variant="outlined" />}
                />

                {/* {JSON.stringify(availableSdgList)} */}

                <div className="sdg-list-section">
                    <div className="available-sdg-section">
                        <div className="page-subtitle">Available SDGs</div>
                        <div className="sdg-container">
                            {availableSdgList.map((sdg, index) => {
                                return (
                                    <Card key={index} className="sdg-card" onClick={() => addSdg(sdg.fields.Number)}>
                                        <div className="left-content">
                                            <img src={sdg.fields.Image[0].url} alt={sdg.fields.Goal} />
                                            <span>{sdg.fields.Goal}</span>
                                        </div>

                                        <Tooltip title="Select SDG">
                                            <AddCircleOutlineIcon />
                                        </Tooltip>
                                    </Card>
                                )
                            })}
                        </div>

                    </div>
                    <div className="selected-sdg-section">
                        <div className="page-subtitle">
                            Selected SDGs &nbsp;
                            {selectedSdgList.length > 0 && <div className="clear-all" onClick={() => removeAllSdgs()}>Clear all</div>}
                        </div>
                        <div className="sdg-container">
                            {selectedSdgList.length > 0 ?
                                <>
                                    {selectedSdgList.map((sdg, index) => {
                                        return (
                                            <Card key={index} className="sdg-card" onClick={() => removeSdg(sdg.fields.Number)}>
                                                <div className="left-content">
                                                    <img src={sdg.fields.Image[0].url} alt={sdg.fields.Goal} />
                                                    <span>{sdg.fields.Goal}</span>
                                                </div>

                                                <Tooltip title="Remove SDG">
                                                    <RemoveCircleOutlineIcon />
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

        </div>
    )
}

export default Impact
