import React, { useState, useEffect } from 'react'
import useYoutubeApi from '../../hooks/useYoutubeApi'
import MenuBar from '../shared/MenuBar'
import './podcasts.scss'
import moment from 'moment'
import 'moment-duration-format';
import { useHistory } from 'react-router-dom';

const Podcasts = () => {

    const [videoList, setVideoList] = useState<any[]>([])
    let youtubeApi = useYoutubeApi()

    const history = useHistory()

    useEffect(() => {
        youtubeApi.getVideosInPlaylist("PLQCLYF55tnNNKg4BuzRN2oZ1wMqYc9knF")
            .then(response => {
                console.log(response)
                setVideoList(response.items.sort((a, b) => new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime()))
            })
            .catch(err => {
                console.log(err)
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, []);

    return (
        <div className="podcasts-page">
            <MenuBar />
            <div className="content top-page-margin">
                <div className="intro-wrapper">
                    <span className="page-title">🎧 Podcasts</span>
                    <p>One of our founders, Ed, is co-host of the Startup Microdose podcast series - interviewing leading startup founders, unpacking their stories,
                         opinions, quirks and wisdom. Look out for exclusive Venture Assembly content on its way very soon.</p>
                </div>

                <div className="video-list">
                    {videoList && videoList.map((video, index) => {
                        return (
                            <div key={index} className="video-wrapper" onClick={() => history.push(`/podcasts/${video.id}`)}>
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

        </div>
    )
}

export default Podcasts

