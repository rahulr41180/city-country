
const initialState = {

    allData : [],

}

export const countryReducer = (store = initialState, action) => {
    console.log('store2:', store)
    switch(action.type) {
        case "ADD_DATA" : return {
            ...store,
            allData : action.payload,
        }
        case "SORT_DATA" : return {
            ...store,
            // allData : [...store.allData].sort((a,b) => a[action.payload] > b[action.payload] ? 1 : a[action.payload] < b[action.payload] ? -1 : 0 )
            allData : [...store.allData].sort((a,b) => {
                return (
                    action.payload === "asc" ? a["population"] - b["population"] : b["population"] - a["population"]
                )
            })}
            
        default : return store;
    }
}