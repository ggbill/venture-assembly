import React, { useEffect, useState } from 'react'
import useYoutubeApi from '../../hooks/useYoutubeApi'
import MenuBar from '../shared/MenuBar'
import './podcastPage.scss'
import YouTube from 'react-youtube';
import { Link } from "react-router-dom";


const PodcastPage = ({ match }) => {

    const [video, setVideo] = useState<any>({})
    let youtubeApi = useYoutubeApi()

    const opts: any = {
        // height: '585',
        // width: '960',
        playerVars: {
            autoplay: 0,
            start: 0
        },
    };

    useEffect(() => {
        youtubeApi.getVideoDetails(match.params.videoId)
            .then(response => {
                console.log(response.items[0])
                if (response.items) {
                    setVideo(response.items[0])
                }
            })
            .catch(err => {
                console.log(err)
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, []);


    return (
        <div className="podcast-page">
            <MenuBar />
            <div className="content top-page-margin intro-section">
                {/* <span className="page-title">TITLE.</span> */}
                <Link className="back-link-wrapper" to="/podcasts">
                    🔙
                    <div className="back-link"> Back to list</div>
                </Link>
                <YouTube className="youtube-player" videoId={match.params.videoId} opts={opts} />
                <div className="description-wrapper">
                    <div className="page-subtitle">Description.</div>
                    <span>{video.snippet && video.snippet.description}</span>
                </div>

            </div>
        </div>
    )
}

export default PodcastPage
