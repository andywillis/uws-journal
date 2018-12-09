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
    links: data.links,
    tags: data.tags
  };
};

export const setJournalDisplayed = (bool) => {
  return {
    type: 'SET_JOURNAL_DISPLAYED',
    isDisplayed: bool
  };
};

export const toggleTagCloudVisibility = () => {
  return {
    type: 'TOGGLE_TAGCLOUD_VISIBILITY'
  };
};

export const setTagCloudHeight = (height) => {
  return {
    type: 'SET_TAGCLOUD_HEIGHT',
    height
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
      // callback();
    } catch (e) {
      dispatch(setFetchError(true));
      dispatch(setFetchLoader(false));
    }
  };
};
