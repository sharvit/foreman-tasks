import API from 'foremanReact/API';
import { resolveQuery } from './TasksDashboardHelper';
import {
  FOREMAN_TASKS_DASHBOARD_INIT,
  FOREMAN_TASKS_DASHBOARD_UPDATE_TIME,
  FOREMAN_TASKS_DASHBOARD_UPDATE_QUERY,
  TASKS_DASHBOARD_CURRENT_TIME,
  TASKS_SUMMARY_FAILURE,
  TASKS_SUMMARY_REQUEST,
  TASKS_SUMMARY_SUCCESS,
  STATUS,
} from './TasksDashboardConstants';
import { selectTime } from './TasksDashboardSelectors';

export const initializeDashboard = ({ time, query }) => ({
  type: FOREMAN_TASKS_DASHBOARD_INIT,
  payload: { time, query },
});

export const updateTime = time => ({
  type: FOREMAN_TASKS_DASHBOARD_UPDATE_TIME,
  payload: time,
});

export const updateQuery = query => (dispatch, getState) => {
  if (query.time === TASKS_DASHBOARD_CURRENT_TIME)
    query.time = selectTime(getState());

  dispatch({
    type: FOREMAN_TASKS_DASHBOARD_UPDATE_QUERY,
    payload: query,
  });

  resolveQuery(query);
};

export const getTasksSummary = () => dispatch => {
  dispatch(startRequest());
  return createAPIRequest({ dispatch });
};

const startRequest = () => ({
  type: TASKS_SUMMARY_REQUEST,
  payload: {
    status: STATUS.PENDING,
  },
});

const createAPIRequest = ({ dispatch }) =>
  API.get('/foreman_tasks/tasks/summary/24')
    .then(({ data }) =>
      dispatch(
        requestSuccess({
          data,
        })
      )
    )
    .catch(error => dispatch(requestFailure({ error })));

const requestFailure = ({ error }) => ({
  type: TASKS_SUMMARY_FAILURE,
  payload: {
    results: [],
    error: error.message || error,
    status: STATUS.ERROR,
  },
});

const requestSuccess = ({ data }) => ({
  type: TASKS_SUMMARY_SUCCESS,
  payload: {
    ...data,
  },
});
