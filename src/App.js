import { useDispatch, connect } from 'react-redux';
import {setCampaignList} from "./actions/homeAction";
import Home from './components/home/Home';
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  
  window.addCampaign = async(data) =>{
    console.log("window function ==>");
    let res = await axios.get("https://jsonplaceholder.typicode.com/users");
    data.forEach((cur,index)=>{
      const userData = res.data.find((item) => item.id === cur.id)
      if(userData?.username){
        cur["username"] = userData.username
      }else{
        cur["username"] = "unknown"
      }
    })
    dispatch(setCampaignList(data));    
  }
  
  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
