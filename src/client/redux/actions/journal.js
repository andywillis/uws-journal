export function setFetchError(bool) {
  return {
    type: 'SET_FETCH_ERROR',
    hasErrored: bool
  };
}

export function setFetchLoader(bool) {
  return {
    type: 'SET_FETCH_LOADER',
    isLoading: bool
  };
}

export function setFetchSuccess(data) {
  return {
    type: 'SET_FETCH_SUCCESS',
    entries: data.entries,
    links: data.links,
    tags: data.tags
  };
}

export function setJournalDisplayed(bool) {
  return {
    type: 'SET_JOURNAL_DISPLAYED',
    isDisplayed: bool
  };
}

export function toggleTagCloudVisibility() {
  return {
    type: 'TOGGLE_TAGCLOUD_VISIBILITY'
  };
}

export function setTagCloudHeight(height) {
  return {
    type: 'SET_TAGCLOUD_HEIGHT',
    height
  };
}

export function setDeviceWidth(width) {
  return {
    type: 'SET_DEVICE_WIDTH',
    width
  };
}

export function fetchData(endpoint) {
  return async (dispatch) => {
    dispatch(setFetchLoader(true));
    try {
      const response = await fetch(endpoint);
      dispatch(setFetchLoader(false));
      const data = await response.json();
      dispatch(setFetchSuccess(data));
    } catch (e) {
      dispatch(setFetchError(true));
      dispatch(setFetchLoader(false));
    }
  };
}
