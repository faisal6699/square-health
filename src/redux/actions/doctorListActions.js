import {
  GET_DOCTOR_REQUEST,
  GET_DOCTOR_SUCCESS,
  GET_DOCTOR_FAILED,
} from "../constants/doctorListConstants";
import axios from "axios";
import { config } from "../../config";

const BASE_URL = config.BASE_URL;

const doctorListActions = () => async (dispatch) => {
  dispatch({ type: GET_DOCTOR_REQUEST, payload: {} });
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}/faisal6699/db/blob/main/doctors`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
    });

    dispatch({ type: GET_DOCTOR_SUCCESS, payload: { response } });
  } catch (error) {
    dispatch({ type: GET_DOCTOR_FAILED, payload: error.message });
  }
};

export { doctorListActions };
