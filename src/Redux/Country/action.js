
const ADD_DATA = "ADD_DATA";

const SORT_DATA = "SORT_DATA";

// const getCity = require("../../utils/ApiRoute");

export const addData = (data) => {
    return {
        type : ADD_DATA,
        payload : data
    }
}

export const sortData = (by) => {
    return {
        type : SORT_DATA,
        payload : by,
    }
}


export const getData = () => async (dispatch) => {

    const data = await fetch("http://localhost:8080/add-city").then((element) => element.json());
    // console.log('data:', data)
    dispatch(addData(data));

}