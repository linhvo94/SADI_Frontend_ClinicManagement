export const visitLogForm = (state = "", action) => {
    switch (action.type) {
        case "SEARCH_VISITLOG_FORM_BY_ID":
            return action.payload;
        default: 
            return state;
    }
}

export const visitLogDetail = (state = "", action) => {
    switch (action.type) {
        case "SEARCH_VISITLOG_DETAIL_BY_ID":
            return action.payload;
        default: 
            return state;
    }
}

export const visitLogSearchError = (state = "", action) => {
    switch (action.type) { 
        case "VISITLOG_NOT_FOUND": 
            state = action.payload;
            return state;
        default: 
            return "";
    }
}


