import axios from "axios";
import { useSelector } from "react-redux";
import { store } from "../store";
import { LOGOUT } from "../users/user.types";
import {
  GET_TICKETS_ERROR,
  GET_TICKETS_LOADING,
  GET_TICKETS_SUCCESS,
  GET_BUSID_SUCCESS,
} from "./ticekts.types";



export const GetTicket = (searchobj) => async (dispatch) => {
  dispatch({ type: GET_TICKETS_LOADING });
  console.log("search",searchobj)
  try {
    let res;
    if (searchobj.start) {
      
      res = await axios.get(
        `https://backendjson-9a24.onrender.com/aeroplane?destination=${searchobj.end}&start=${searchobj.start}&date=${searchobj.selectedDate}`
      );
      
      console.log("res",res)
    } else {
      res = await axios.get(`https://backendjson-9a24.onrender.com/aeroplane`);
    }
    const data = res.data;

    if (data) {
      dispatch({ type: GET_TICKETS_SUCCESS, payload: data });
    } else {
      dispatch({ type: GET_TICKETS_ERROR });
    }
  } catch (error) {
    dispatch({ type: GET_TICKETS_ERROR });
  }
};



export const GetBus = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://backendjson-9a24.onrender.com/aeroplane/${id}`
    );
    let data = res.data;

    if (data) {
      dispatch({ type: GET_BUSID_SUCCESS, payload: data });
    } else {
      console.log("ERROR");
    }
  } catch (error) {
    console.log(error);
  }
};
