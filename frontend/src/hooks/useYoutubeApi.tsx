const key = process.env.REACT_APP_GOOGLE_API_KEY || ""

const useYoutubeApi = () => {

    const getVideosInPlaylist = async (playlistId: string) => {
        const url = "https://www.googleapis.com/youtube/v3/playlistItems?" + new URLSearchParams({
            key: key,
            part: 'snippet,contentDetails',
            playlistId: playlistId,
            // order: "date",
            maxResults: "50"

        })

        return fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                let videoIds = ""
                data.items.forEach(element => {
                    videoIds += `${element.snippet.resourceId.videoId},`
                });

                return getVideoDetails(videoIds)
            })
            .catch(err => {
                console.log(err)
                throw new Error(err);
            });
    }

    const getVideoDetails = async (csvVideoIds: string) => {
        const url = "https://www.googleapis.com/youtube/v3/videos?" + new URLSearchParams({
            key: key,
            part: 'snippet,contentDetails,statistics',
            id: csvVideoIds,
            // order: "date",
            maxResults: "50"

        })

        return fetch(url)
            .then(response => response.json())
            .then(json => {
                // console.log(json)
                return json
            }).catch(err => {
                throw new Error(err);
            });
    }

    return {
        getVideosInPlaylist,
        getVideoDetails
    };
};
export default useYoutubeApi;