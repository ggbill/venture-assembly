import { Button } from '@material-ui/core'
import React, { useEffect, useState, useRef } from 'react'
import useFetch from '../../hooks/useFetch'
import MenuBar from '../shared/MenuBar'
import './impact.scss'
import MeasureTargetSection from './MeasureTargetSection'
import SelectSDGSection from './SelectSDGSection'


const Impact = () => {

    const [uniqueTagList, setUniqueTagList] = useState<string[]>([])
    const [sdgList, setSdgList] = useState<any[]>([])
    const [availableSdgList, setAvailableSdgList] = useState<any[]>([])
    const [selectedSdgList, setSelectedSdgList] = useState<any[]>([])
    const [targetList, setTargetList] = useState<any[]>([])
    const [filter, setFilter] = useState<string | null>(null)
    const [stepNumber, setStepNumber] = useState<number>(1)
    const [validationText, setValidationText] = useState<string>("")

    const myRef: any = useRef(null)
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
        setValidationText("")
    }

    const removeSdg = (sdgNumber) => {
        let newAvailableSdgList = Object.assign([], availableSdgList)
        let newSelectedSdgList = Object.assign([], selectedSdgList)


        selectedSdgList.forEach((sdg, index) => {
            if (sdg.fields.Number === sdgNumber) {
                newSelectedSdgList.splice(index, 1)
                // setSelectedSdgList(newSelectedSdgList.sort((a: any, b: any) => a.fields.Number - b.fields.Number))

                newAvailableSdgList.push(sdg)
                // setAvailableSdgList(newAvailableSdgList.sort((a: any, b: any) => a.fields.Number - b.fields.Number))
            }
        });

        // setFilter(null)
        // setAvailableSdgList(sdgList)

        setAvailableSdgList(newAvailableSdgList.sort((a: any, b: any) => a.fields.Number - b.fields.Number))
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
        if (value) {
            let newList = availableSdgList.filter(sdg => {
                if (sdg.fields.Tags) {
                    return (sdg.fields.Tags.toLowerCase().indexOf(value.toLowerCase()) !== -1)
                } else {
                    return (false)
                }
            })
            setAvailableSdgList(newList)
        } else {
            let tempAvailableSgdList: any[] = []

            sdgList.forEach(sdg => {
                let isMatched = false
                selectedSdgList.forEach(selected => {
                    if (sdg.fields.Number === selected.fields.Number) {
                        isMatched = true
                    }
                })
                if (!isMatched) {
                    tempAvailableSgdList.push(sdg)
                }
            });

            setAvailableSdgList(tempAvailableSgdList)
        }
    }

    const moveToNextStep = () => {
        if (selectedSdgList.length > 0) {
            window.scrollTo({top:0,behavior:'smooth'})
            setStepNumber(stepNumber + 1)
            getTargets()
            setValidationText("")
        } else {
            setValidationText("Please select at least 1 SDG")
        }


    }

    const moveToPreviousStep = () => {
        window.scrollTo({top:0,behavior:'smooth'})
        setStepNumber(stepNumber - 1)
    }

    const getTargets = () => {
        let numberListCsv = ""
        selectedSdgList.forEach(selectedSdg => {
            numberListCsv += `${selectedSdg.fields.Number},`
        });

        // console.log(numberListCsv)
        airtableApi.get(`get-targets/${numberListCsv}`).then((result) => {
            console.log(result)
            result.forEach(element => {
                element.selfAssessment = 1
                element.isVisible = true
            });
            setTargetList(result)
        }).catch((err: Error) => {
            console.log(err)
        })
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

            setUniqueTagList(Array.from(new Set(tempUniqueTagList.sort())))

        }).catch((err: Error) => {
            console.log(err)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, []);


    // useEffect(() => {
    //     console.log("avaiableSdgListChanged")
    //     filterAvailableSDGs(null, filter)

    //     // eslint-disable-next-line react-hooks/exhaustive-deps  
    // }, [availableSdgList, selectedSdgList]);


    return (
        <div className="impact-page">
            <MenuBar />
            <div className="content top-page-margin">
                <div className="intro-wrapper">
                    <span className="page-title">🌳 Sustainable Development Goals (SDGs)</span>
                    <p>The Venture Assembly SDG tool is designed to allow organisations to explore each of the <a href="https://www.un.org/sustainabledevelopment/" target="_blank" rel="noreferrer">United Nation's 17 SDGs</a> and then rate themselves against each of their sub-targets.
                    Impact investing is an exciting and rapidly growing industry powered by investors who are determined to generate social and environmental impact as well as financial returns. Demonstrating how your company  is helping to address these issues can be a potent addition to 
                    any pitch deck.</p>
                </div>
                {/* <span className="page-subtitle">Step {stepNumber} of 3</span> */}
                
                {stepNumber === 1 &&
                    <SelectSDGSection
                        uniqueTagList={uniqueTagList}
                        filterAvailableSDGs={filterAvailableSDGs}
                        filter={filter}
                        availableSdgList={availableSdgList}
                        selectedSdgList={selectedSdgList}
                        addSdg={addSdg}
                        removeSdg={removeSdg}
                        removeAllSdgs={removeAllSdgs}
                    />
                }
                {stepNumber === 2 &&
                    <MeasureTargetSection
                        selectedSdgList={selectedSdgList}
                        targetList={targetList}
                        setTargetList={setTargetList}
                    />
                }

                <div className="navigation-wrapper">
                    <span className="validation-text">{validationText}</span>
                    <div className="button-wrapper">
                        {stepNumber !== 1 &&
                            <Button className="va-button cancel" onClick={moveToPreviousStep}>
                                Back
                            </Button>
                        }
                        {stepNumber !== 2 &&
                            <Button id="submit" className="va-button confirm" onClick={moveToNextStep}>
                                Next
                            </Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Impact
