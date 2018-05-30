import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const SCAN_REQUEST = 'SCAN_REQUEST'
export const SCAN_SUCCESS = 'SCAN_SUCCESS'
export const SCAN_FAILURE = 'SCAN_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export const scanRequest = ticketNumber => dispatch => {
  dispatch({ type: SCAN_REQUEST })
  if (!ticketNumber || ticketNumber === '') {
    return dispatch(scanFailure('No ticket data'))
  }
  return axios
    .post('https://api.goosebump.com/scanTicket', {
      ticketNumber
    })
    .then(res => {
      const data = JSON.parse(res.data)
      return dispatch(scanSuccess(data))
    })
    .catch(error => {
      console.error(error)
      return dispatch(scanFailure(error))
    })
}

export const scanSuccess = data => {
  return {
    type: SCAN_SUCCESS,
    data
  }
}

export const scanFailure = error => {
  return {
    type: SCAN_FAILURE,
    error
  }
}

export const actions = {
  scanRequest,
  scanSuccess,
  scanFailure
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SCAN_REQUEST]: state => ({ ...state, fetching: true }),
  [SCAN_SUCCESS]: (state, action) => ({
    data: action.data,
    error: null,
    fetching: false
  }),
  [SCAN_FAILURE]: (state, action) => ({
    ...state,
    error: action.error,
    fetching: false
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: null,
  error: null,
  fetching: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
