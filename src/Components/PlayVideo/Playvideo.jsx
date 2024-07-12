import { API_KEY, value_converter } from "../../data";
import "./Playvideo.css";
import { useEffect, useState } from "react";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import moment from "moment";
import { useParams } from "react-router-dom";


const Playvideo = ({ categoryId }) => {
  const {videoId} = useParams();
  const [channelData, setchannelData] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [commentData, setcommentData] = useState([]); 


  const fetchVideoData = async () => {
    //fetching videos data
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url).then(res => res.json()).then(data => setApiData(data.items[0]));
  }
  const fetchOtherData = async () => {
    //fetching channel data
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY} `;
    await fetch(channelData_url).then(res => res.json()).then(data => setchannelData(data.items[0]));

    //fetching comment data
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
    await fetch(comment_url).then(res => res.json()).then(data => setcommentData(data.items));
  }

  

    


  useEffect(() => {
    fetchVideoData();
  }, [videoId]);
  useEffect(() => {
    fetchOtherData();
  }, [apiData]);
 
  return (
    <div className='play-video'>


      <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
      <div className='play-video-info'>
        <p>{apiData ? value_converter(apiData.statistics.viewCount) : "16K"}&bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : " "}</p>
        <div>
          <span><img src={like} alt='' />{apiData ? value_converter(apiData.statistics.likeCount) : 155}</span>
          <span><img src={dislike} alt='' />2</span>
          <span><img src={share} alt='' />Share</span>
          <span><img src={save} alt='' />Save</span>
        </div>
      </div>
      <hr />
      <div className='publisher'>
        <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt=' ' />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : "Channel Title"}</p>
          <span> {channelData ? value_converter(channelData.statistics.subscriberCount) : "1M"}Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className='video-description'>
        <p>{apiData ? apiData.snippet.description.slice(0, 250) : "Description Here"}</p>
        <hr />
        <h4>{apiData ? value_converter(apiData.statistics.commentCount) : "120"}         Comments</h4>
        {commentData.map((item, index) => {
          return (
            <div className='comments' key={index}>
              <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt='' />
              <div>
                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago.</span></h3> 
                <p>{
                  item.snippet.topLevelComment.snippet.textDisplay
                }</p>
                <div className='comment-action'>
                  <img src={like} alt='' />
                  <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                  <img src={dislike} alt='' />
                </div>
              </div>
            </div>
          )
        })}



      </div>
    </div>
  )
}

export default Playvideo