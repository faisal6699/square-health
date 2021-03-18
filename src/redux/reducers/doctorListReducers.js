import {
  GET_DOCTOR_REQUEST,
  GET_DOCTOR_SUCCESS,
  GET_DOCTOR_FAILED,
} from "../constants/doctorListConstants";

function doctorListReducers(state = {}, action) {
  switch (action.type) {
    case GET_DOCTOR_REQUEST:
      return { loading: true };
    case GET_DOCTOR_SUCCESS:
      return { loading: false, doctorInfo: action.payload, loaded: true };
    case GET_DOCTOR_FAILED:
      return { loading: false, error: action.payload, loaded: false };
    default:
      return state;
  }
}

export { doctorListReducers };
