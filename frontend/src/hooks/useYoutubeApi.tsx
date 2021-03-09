const key = "AIzaSyBIuxy5ZyltcojVbkvk84z9ycSz4TrUcOU"

const useYoutubeApi = () => {

    const getVideosInPlaylist = async (playlistId: string) => {
        // const url = "https://www.googleapis.com/youtube/v3/channels?id=UCHvoyoD-8_RuVPDowvroAUg&key=AIzaSyBIuxy5ZyltcojVbkvk84z9ycSz4TrUcOU&part=snippet,contentDetails,statistics,status"
        const url = "https://www.googleapis.com/youtube/v3/playlistItems?" + new URLSearchParams({
            key: key,
            part: 'snippet,contentDetails',
            playlistId: playlistId,
            // playlistId: "PLQCLYF55tnNNKg4BuzRN2oZ1wMqYc9knF",
            order: "date",
            maxResults: "50"

        })


        const options = {
            // method: "GET",
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            // }
        }

        return fetch(url, options)
            .then(response => {
                return response.json()
            })
            .then(data => {
                let videoIds = ""
                data.items.forEach(element => {
                    videoIds += `${element.snippet.resourceId.videoId},`
                });

                // console.log(videoIds)
                return getVideoDetails(videoIds)
            })
            .catch(err => {
                throw new Error(err);
            });
    }

    const getVideoDetails = async (csvVideoIds: string) => {
        // const url = "https://www.googleapis.com/youtube/v3/channels?id=UCHvoyoD-8_RuVPDowvroAUg&key=AIzaSyBIuxy5ZyltcojVbkvk84z9ycSz4TrUcOU&part=snippet,contentDetails,statistics,status"
        const url = "https://www.googleapis.com/youtube/v3/videos?" + new URLSearchParams({
            key: key,
            part: 'snippet,contentDetails',
            id: csvVideoIds,
            // playlistId: "PLQCLYF55tnNNKg4BuzRN2oZ1wMqYc9knF",
            order: "date",
            maxResults: "50"

        })


        const options = {
            // method: "GET",
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            // }
        }

        return fetch(url, options)
            .then(response => response.json())
            .then(json => {
                // console.log(json)
                return json
            }).catch(err => {
                throw new Error(err);
            });
    }

    return {
        getVideosInPlaylist
    };
};
export default useYoutubeApi;