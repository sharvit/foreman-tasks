import Immutable from 'seamless-immutable';
import {
  TASKS_DASHBOARD_AVAILABLE_TIMES,
  FOREMAN_TASKS_DASHBOARD_INIT,
  FOREMAN_TASKS_DASHBOARD_UPDATE_TIME,
  FOREMAN_TASKS_DASHBOARD_UPDATE_QUERY,
  TASKS_SUMMARY_SUCCESS,
  TASKS_SUMMARY_REQUEST,
  TASKS_SUMMARY_ZERO,
} from './TasksDashboardConstants';

const initialState = Immutable({
  time: TASKS_DASHBOARD_AVAILABLE_TIMES.H24,
  query: {},
  tasksSummary: TASKS_SUMMARY_ZERO,
});

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FOREMAN_TASKS_DASHBOARD_INIT:
      return state
        .set('time', payload.time || initialState.time)
        .set('query', payload.query || initialState.query);
    case FOREMAN_TASKS_DASHBOARD_UPDATE_TIME:
      return state.set('time', payload);
    case FOREMAN_TASKS_DASHBOARD_UPDATE_QUERY:
      return state.set('query', payload);
    case TASKS_SUMMARY_SUCCESS:
      return state.set('tasksSummary', payload).set('isLoading', false);
    case TASKS_SUMMARY_REQUEST:
      return state.set('isLoading', true);
    default:
      return state;
  }
};
