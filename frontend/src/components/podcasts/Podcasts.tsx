import React, { useState, useEffect } from 'react'
import useYoutubeApi from '../../hooks/useYoutubeApi'
import MenuBar from '../shared/MenuBar'
import './podcasts.scss'
import moment from 'moment'
import 'moment-duration-format';

const Podcasts = () => {

    const [response, setResponse] = useState<any>({})
    let youtubeApi = useYoutubeApi()

    useEffect(() => {
        youtubeApi.getVideosInPlaylist("PLQCLYF55tnNNKg4BuzRN2oZ1wMqYc9knF").then(response => {
            console.log(response)
            setResponse(response)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, []);

    return (
        <div className="podcast-page content">
            <MenuBar />
            <div className="video-list content top-page-margin">

                {response && response.items && response.items.map(video => {
                    return (
                        <div className="video-wrapper">
                            <img className="thumbnail" src={video.snippet.thumbnails.medium.url} />
                            <div className="duration-wrapper">
                                <div className="duration">{moment.duration(video.contentDetails.duration).format('hh:mm:ss')}</div>
                            </div>

                            <span className="title">{video.snippet.title}</span>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Podcasts

