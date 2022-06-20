import * as actions from "../constants/SpotConstants";
import axios from "axios";

const url = 'https://your-wave-api.herokuapp.com/'

export const fetchSpots = () => async (dispatch) => {
  try {
    const data = await axios.get(url);
    dispatch({ type: actions.FETCH_SPOTS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createSpot = (newSpot) => async (dispatch) => {
  try {
    const data = await axios.post(url, newSpot);
    console.log(data, "DATA DEL CREATE");
    dispatch({ type: actions.CREATE_SPOT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

// export const searchSpots = (query) => (dispatch, getState) => {
//   const { SpotReducers } = getState();
//   const searchResults = SpotReducers.searchResults.filter((spot) =>
//     spot.spot_name.toLowerCase().includes(query.toLowerCase()) 
//   );
//   dispatch({ type: actions.SEARCH_SPOTS, payload: searchResults });
// };


// export const filterByRating = (rating) => (dispatch, getState) => {
// 	const { SpotReducers } = getState();
// 	const filteredSpots = SpotReducers.filteredSpots.filter((spot) => spot.rating == rating);
//   console.log(filteredSpots, "filteredSpots", rating, "rating");
// 	dispatch({ type: actions.FILTER_BY_RATING, payload: filteredSpots });
// };