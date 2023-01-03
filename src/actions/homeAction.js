import {
    SET_CAMPAIGN_LIST,
    SET_SEARCH_LIST,
    SET_SEARCH_DATE_LIST
} from './types';

export const setCampaignList =(data)=> {
    return (dispatch)=>{
        dispatch({
            type: SET_CAMPAIGN_LIST,
            payload: {
                data : data,
            }
        });
    }
}

export const handleSearchData =(searchKey)=> {
    return (dispatch)=>{
        dispatch({
            type: SET_SEARCH_LIST,
            payload: {
                data : searchKey,
            }
        });
    }
}

export const filterDateData =(date)=> {
    return (dispatch)=>{
        dispatch({
            type: SET_SEARCH_DATE_LIST,
            payload: {
                data : date,
            }
        });
    }
}