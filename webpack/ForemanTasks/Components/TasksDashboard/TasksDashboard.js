import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'patternfly-react';

import TasksTimeRow from './Components/TasksTimeRow/TasksTimeRow';
import TasksCardsGrid from './Components/TasksCardsGrid/TasksCardsGrid';
import TasksLabelsRow from './Components/TasksLabelsRow/TasksLabelsRow';

import { TASKS_DASHBOARD_AVAILABLE_TIMES } from './TasksDashboardConstants';
import { getQueryFromUrl } from './TasksDashboardHelper';
import { timePropType, queryPropType } from './TasksDashboardPropTypes';
import './TasksDashboard.scss';

class TasksDashboard extends React.Component {
  componentDidMount() {
    const query = getQueryFromUrl();
    this.props.getTasksSummary();
    this.props.initializeDashboard({
      time: query.time,
      query,
    });
  }

  render() {
    const { time, query, tasksSummary, updateTime, updateQuery } = this.props;

    return (
      <Grid fluid className="tasks-dashboard-grid">
        <TasksTimeRow time={time} updateTime={updateTime} />
        <TasksCardsGrid
          time={time}
          query={query}
          data={tasksSummary}
          updateQuery={updateQuery}
        />
        <TasksLabelsRow query={query} updateQuery={updateQuery} />
      </Grid>
    );
  }
}

TasksDashboard.propTypes = {
  time: timePropType,
  query: queryPropType,
  initializeDashboard: PropTypes.func,
  updateTime: PropTypes.func,
  updateQuery: PropTypes.func,
  getTasksSummary: PropTypes.func,
  tasksSummary: TasksCardsGrid.propTypes.data,
};

TasksDashboard.defaultProps = {
  time: TASKS_DASHBOARD_AVAILABLE_TIMES.H24,
  query: {},
  initializeDashboard: () => null,
  updateTime: () => null,
  updateQuery: () => null,
  getTasksSummary: () => null,
  tasksSummary: TasksCardsGrid.defaultProps.data,
};

export default TasksDashboard;
