import { useSelector,useDispatch } from 'react-redux';
import {useState} from "react";
import './home.css';
import { FaSearch } from "react-icons/fa";
import {handleSearchData, filterDateData} from '../../actions/homeAction'

const Home=()=>{
    const dispatch = useDispatch();
    const listing = useSelector((state)=> state.homeReducer.campaignList);
    const searchKey = useSelector((state)=> state.homeReducer.searchKey);
    console.log(listing, "aaaaaa");
    const [error, setError] = useState({});
    const [dateObj, setDateObj] = useState({});

    const budgetRound = (num) => {
        if(num<1000) return num
        if(num => 1000 && num<1000000){
          return (num/1000).toFixed(1) + "K"
        }
        else if(num=>1000000 && num<1000000000){
          return (num/1000000).toFixed(1) + "M"
        } 
        else {
          return (num/1000000000).toFixed(1) + "B"
        }
    };

    const handleSearch =(e)=>{
        dispatch(handleSearchData(e.target.value));
    }

    const checkActiveStatus = (date) =>{
        const currentDate = new Date()
        const endDate = new Date(date);
        const diffTime = endDate - currentDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays > 0 ? "Active" : 'InActive';
    }

    const checkValidation = (firstDate, secondDate) =>{
        const startDate = new Date(firstDate);
        const endDate = new Date(secondDate);
        let errObj = {};
        if(startDate > endDate){
            errObj["startDate"] = 'Cannot be grater than end date!!!'   
            errObj["endDate"] = 'Cannot be grater than end date!!!'   
        }
        setError(errObj);
    }

    const handleDateChange=(e,key)=>{
        let tempObj = {...dateObj};
        tempObj[key] = e.target.value;
        setDateObj(tempObj);
        if(tempObj.startDate && tempObj.endDate){
            checkValidation(tempObj.startDate,tempObj.endDate);
        }
        dispatch(filterDateData(tempObj));
    }

    return (
        <div className="home-conatiner">
            <div className="home-action-holder">
                <div className="home-filter">
                    <span className="datebx">
                        <input 
                            type="date" 
                            data-testid= 'start-date'
                            value={dateObj.startDate || ''} 
                            onChange={(e)=>handleDateChange(e, "startDate")} 
                            className={`${error.startDate ? "error" : ""} start-date`} 
                            placeholder="Start Date"
                            />
                    </span>
                    <span className="datebx">
                        <input 
                            type="date" 
                            value={dateObj.endDate || ''} 
                            data-testid= 'end-date'
                            onChange={(e)=>handleDateChange(e, "endDate")} 
                            className={`${error.endDate ? "error" : ""} end-date`} 
                            placeholder="End Date"
                        />
                    </span>
                    {
                        error.startDate ? 
                            <div className="error-msg">{error.startDate}</div>
                        :   null
                    }
                </div>
                <div className="home-search">
                    <input 
                        type="text" 
                        className="search-input"
                        data-testid= "search-input" 
                        onChange={(e)=>handleSearch(e)} 
                        value={searchKey} 
                        placeholder="Search by name"
                    />
                    <button type="button" className="search-btn"><FaSearch/></button>
                </div>
            </div>
            <div className="home-listing-holder">
                <div className="home-listing">
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>User Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Active</th>
                            <th>Budget</th>
                        </tr>
                        {listing.length > 0 ?
                            listing.map((cur, index)=>{
                                return (
                                    <tr>
                                        <td>{cur.name}</td>
                                        <td>{cur.username}</td>
                                        <td>{cur.startDate}</td>
                                        <td>{cur.endDate}</td>
                                        <td>{checkActiveStatus(cur.endDate)}</td>
                                        <td>{budgetRound(cur.Budget)}</td>
                                    </tr>
                                )
                            }) 
                            :
                            (<div className="msg-upload">
                                <p>Please upload Campaign through window.addCampaign(data)!!!</p>
                            </div>)
                        }
                    </table>
                </div>

            </div>
        </div>
    )
}
export default Home