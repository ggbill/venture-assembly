import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import MenuBar from '../shared/MenuBar'
import './impact.scss'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Impact = () => {

    const [uniqueTagList, setUniqueTagList] = useState<string[]>([])

    const airtableApi = useFetch("airtable")

    useEffect(() => {
        airtableApi.get("get-tags").then((result) => {
            // console.log(result)
            setUniqueTagList(result)
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
                    <span className="page-title">🌳 Impact</span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                         Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
                </div>
                <Autocomplete
                    id="combo-box-demo"
                    options={uniqueTagList}
                    // getOptionLabel={(option) => option.title}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                />
            </div>

        </div>
    )
}

export default Impact
