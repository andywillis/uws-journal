const initialState = {
  entries: [],
  links: [],
  pageLimit: 4,
  isDisplayed: false,
  isLoaded: false,
  hasErrored: false,
  tagCloud: {
    visible: false,
    height: '0px'
  }
};

function journal(state = initialState, action) {

  switch (action.type) {

    case 'TOGGLE_TAGCLOUD_VISIBILITY': {
      const isVisible = state.tagCloud.visible;
      return {
        ...state,
        tagCloud: {
          ...state.tagCloud,
          visible: !isVisible
        }
      };
    }

    case 'SET_TAGCLOUD_HEIGHT': {
      return {
        ...state,
        tagCloud: {
          ...state.tagCloud,
          height: action.height
        }
      };
    }

    case 'SET_JOURNAL_DISPLAYED':
      return Object.assign({}, state, {
        isDisplayed: action.isDisplayed
      });

    case 'SET_FETCH_LOADER':
      return Object.assign({}, state, { isLoading: action.isLoading });

    case 'SET_FETCH_ERROR':
      return Object.assign({}, state, { hasErrored: action.hasErrored });

    case 'SET_FETCH_SUCCESS': {
      return {
        ...state,
        entries: action.entries,
        links: action.links,
        tags: action.tags
      };
    }

    default:
      return state;
  }

}

export default journal;
