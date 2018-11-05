const initialState = {
  entries: [],
  links: [],
  pageLimit: 4,
  isDisplayed: false,
  isLoaded: false,
  hasErrored: false
};

const journal = (state = initialState, action) => {

  switch (action.type) {

    case 'SET_JOURNAL_DISPLAYED':
      return Object.assign({}, state, {
        isDisplayed: action.isDisplayed
      });

    case 'SET_FETCH_LOADER':
      return Object.assign({}, state, { isLoading: action.isLoading });

    case 'SET_FETCH_ERROR':
      return Object.assign({}, state, { hasErrored: action.hasErrored });

    case 'SET_FETCH_SUCCESS':
      return Object.assign({}, state, {
        entries: action.entries,
        links: action.links
      });

    default:
      return state;
  }

};

export default journal;
