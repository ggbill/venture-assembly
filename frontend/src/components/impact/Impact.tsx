import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import MenuBar from '../shared/MenuBar'
import './impact.scss'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Card, Tooltip } from '@material-ui/core'
import { ReactComponent as MinusSVG } from '../../images/minus.svg'
import { ReactComponent as AddSVG } from '../../images/add.svg'

const Impact = () => {

    const [uniqueTagList, setUniqueTagList] = useState<string[]>([])
    const [sdgList, setSdgList] = useState<any[]>([])
    const [availableSdgList, setAvailableSdgList] = useState<any[]>([])
    const [selectedSdgList, setSelectedSdgList] = useState<any[]>([])
    const [filter, setFilter] = useState<string | null>(null)

    const airtableApi = useFetch("airtable")

    const addSdg = (sdgNumber) => {
        let newAvailableSdgList = Object.assign([], availableSdgList)
        let newSelectedSdgList = Object.assign([], selectedSdgList)

        availableSdgList.forEach((sdg, index) => {
            if (sdg.fields.Number === sdgNumber) {
                newAvailableSdgList.splice(index, 1)
                // setAvailableSdgList(newAvailableSdgList.sort((a: any, b: any) => a.fields.Number - b.fields.Number))

                newSelectedSdgList.push(sdg)
                // setSelectedSdgList(newSelectedSdgList.sort((a: any, b: any) => a.fields.Number - b.fields.Number))
            }
        });

        setAvailableSdgList(newAvailableSdgList.sort((a: any, b: any) => a.fields.Number - b.fields.Number))
        setSelectedSdgList(newSelectedSdgList.sort((a: any, b: any) => a.fields.Number - b.fields.Number))
    }

    const removeSdg = (sdgNumber) => {
        let newAvailableSdgList = Object.assign([], availableSdgList)
        let newSelectedSdgList = Object.assign([], selectedSdgList)
        

        selectedSdgList.forEach((sdg, index) => {
            if (sdg.fields.Number === sdgNumber) {
                newSelectedSdgList.splice(index, 1)
                // setSelectedSdgList(newSelectedSdgList.sort((a: any, b: any) => a.fields.Number - b.fields.Number))

                // newAvailableSdgList.push(sdg)
                // setAvailableSdgList(newAvailableSdgList.sort((a: any, b: any) => a.fields.Number - b.fields.Number))
            }
        });

        // setFilter(null)
        // setAvailableSdgList(sdgList)

        filterAvailableSDGs(null, filter)
        setSelectedSdgList(newSelectedSdgList.sort((a: any, b: any) => a.fields.Number - b.fields.Number))
    }

    const removeAllSdgs = () => {
        setAvailableSdgList(sdgList)
        setSelectedSdgList([])
        setFilter(null)
    }

    const filterAvailableSDGs = (event, value) => {
        console.log(value)
        setFilter(value)
        if (value){
            let newList = availableSdgList.filter(sdg => {
                if (sdg.fields.Tags){
                    return(sdg.fields.Tags.toLowerCase().indexOf(value.toLowerCase()) !== -1)
                }else{
                    return(false)
                }
            })
            setAvailableSdgList(newList)
        }else{
            let tempAvailableSgdList: any[] = []

            sdgList.forEach(sdg => {
                let isMatched = false
                selectedSdgList.forEach(selected => {
                    if (sdg.fields.Number === selected.fields.Number){
                        isMatched = true
                    }  
                })
                if (!isMatched){
                    tempAvailableSgdList.push(sdg)
                }   
            });

            setAvailableSdgList(tempAvailableSgdList)
        }
    }

    useEffect(() => {
        airtableApi.get("get-sdgs").then((result) => {
            // console.log(result)
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

            setUniqueTagList(Array.from(new Set(tempUniqueTagList.sort())))

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
                    options={uniqueTagList}
                    // getOptionLabel={(option) => option.title}
                    style={{ width: 300 }}
                    onChange={filterAvailableSDGs}
                    value={filter}
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
                                            <AddSVG />
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

        </div>
    )
}

export default Impact
