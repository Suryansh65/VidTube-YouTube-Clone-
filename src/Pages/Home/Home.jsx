import { useState } from "react";
import "./Home.css";
import Feed from '../../Components/Feed/Feed';
import Sidebar from '../../Components/Sidebar/Sidebar';


const Home = ({sidebar}) => {

  const [category,setcategory] = useState(0);
  return (
    <>
        <Sidebar sidebar={sidebar} category={category} setcategory={setcategory}/>
        <div className={`container ${sidebar?"":"large-container"}`}><Feed category={category} /></div>
    </>
  )
}


export default Home;