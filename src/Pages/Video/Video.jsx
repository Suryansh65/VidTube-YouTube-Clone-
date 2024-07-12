import { useParams } from "react-router-dom";
import "./Video.css";
import Playvideo from '../../Components/PlayVideo/Playvideo';
import Recommended from "../../Components/Recommended/Recommended";

const Video = () => {
  const{videoId,categoryId} = useParams();
  return (
    <div className='play-container'>
      <Playvideo videoId={videoId} categoryId={categoryId}/>
      <Recommended categoryId={categoryId}/>
    </div>
  )
}

export default Video