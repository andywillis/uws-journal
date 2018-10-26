import * as types from './index';

describe('Type constants', () => {

  it('returns an object', () => {
    expect(types).toEqual(expect.any(Object));
  });

  it('returns an object containing all app types', () => {
    expect(types).toEqual(expect.objectContaining({
      SET_FETCH_ERROR: expect.stringMatching(/SET_FETCH_ERROR/),
      SET_FETCH_LOADER: expect.stringMatching(/SET_FETCH_LOADER/),
      SET_FETCH_SUCCESS: expect.stringMatching(/SET_FETCH_SUCCESS/),
      ADD_FAVOURITE: expect.stringMatching(/ADD_FAVOURITE/),
      REMOVE_FAVOURITE: expect.stringMatching(/REMOVE_FAVOURITE/)
    }));
  });

});
