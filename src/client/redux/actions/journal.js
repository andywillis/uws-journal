export const setFetchError = (bool) => {
  return {
    type: 'SET_FETCH_ERROR',
    hasErrored: bool
  };
};

export const setFetchLoader = (bool) => {
  return {
    type: 'SET_FETCH_LOADER',
    isLoading: bool
  };
};

export const setFetchSuccess = (data) => {
  return {
    type: 'SET_FETCH_SUCCESS',
    entries: data.entries,
    links: data.links
  };
};

export const fetchData = (endpoint) => {
  return async (dispatch) => {
    dispatch(setFetchLoader(true));
    try {
      const response = await fetch(endpoint);
      dispatch(setFetchLoader(false));
      const data = await response.json();
      dispatch(setFetchSuccess(data));
    } catch (e) {
      dispatch(setFetchError(true));
    }
  };
};
