import {
    SET_CAMPAIGN_LIST,
    SET_SEARCH_LIST,
    SET_SEARCH_DATE_LIST
} from '../actions/types';

const initialState = {
    campaignList : [],
    oldData: [],
    searchKey: '',
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_CAMPAIGN_LIST:{
            const listData = action.payload.data;
			return {
				...state,
				campaignList : [...state.campaignList,...listData],
                oldData:[...state.campaignList,...listData],
			};
        }
        case SET_SEARCH_LIST:{
            const searchKey = action.payload.data;
            let tempList = [...state.campaignList];
            if(searchKey){
                tempList = state.oldData.filter((cur)=> {
                    console.log(cur.name);    
                    return cur.name.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase());
                })
            }else{
                tempList = [...state.oldData]
            }
			return {
				...state,
                searchKey : searchKey,
				campaignList : [...tempList]
			};
        }
        case SET_SEARCH_DATE_LIST:{
            const dateObj = action.payload.data;
            let tempList = [...state.campaignList];
            if(dateObj){
                tempList = state.oldData.filter((cur)=> {
                    console.log(new Date(cur.startDate),new Date(dateObj.startDate),"aaaaaa");
                    if(dateObj["startDate"] && dateObj["endDate"]){
                        return new Date(cur["startDate"]) >= new Date(dateObj.startDate) && new Date(cur["endDate"]) <= new Date(dateObj.endDate);    
                    }else if(dateObj["startDate"]){
                        console.log(new Date(cur["startDate"]) >= new Date(dateObj.startDate),"XXXXXXXXXX")
                        return new Date(cur["startDate"]) >= new Date(dateObj.startDate);    
                    }else if(dateObj["endDate"]){
                        return new Date(cur["endDate"]) <= new Date(dateObj.endDate);    
                    }
                })
            }else{
                tempList = [...state.oldData]
            }
			return {
				...state,
				campaignList : [...tempList]
			};
        }
        default:
            return state;
    }
}