import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'patternfly-react';
import classNames from 'classnames';
import { capitalize } from 'lodash';
import { translate as __ } from 'foremanReact/common/I18n';

import {
  timePropType,
  queryPropType,
} from '../../../../TasksDashboardPropTypes';
import {
  TASKS_DASHBOARD_AVAILABLE_TIMES,
  TASKS_DASHBOARD_AVAILABLE_QUERY_STATES,
  TASKS_DASHBOARD_AVAILABLE_QUERY_MODES,
} from '../../../../TasksDashboardConstants';
import { getTimeText } from '../../../../TasksDashboardHelper';
import './StoppedTasksCard.scss';

const StoppedTasksCard = ({
  data,
  query,
  time,
  className,
  updateQuery,
  ...props
}) => {
  const { STOPPED } = TASKS_DASHBOARD_AVAILABLE_QUERY_STATES;
  const { LAST } = TASKS_DASHBOARD_AVAILABLE_QUERY_MODES;

  return (
    <Card
      className={classNames(
        'tasks-donut-card',
        'stopped-tasks-card',
        className,
        {
          'selected-tasks-card': query.state === STOPPED,
        }
      )}
      {...props}
    >
      <Card.Title onClick={() => updateQuery({ state: STOPPED })}>
        {__('Stopped')}
      </Card.Title>
      <Card.Body>
        <table className="table table-bordered table-striped stopped-table">
          <thead>
            <tr>
              <th />
              <th>{__('Total')}</th>
              <th>{getTimeText(time)}</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([result, { total, last }]) => {
              const active = query.state === STOPPED && query.result === result;
              const activeTotal = active && query.mode !== LAST;
              const activeLast =
                active && query.mode === LAST && query.time === time;
              return (
                <tr className={`${result}-row`} key={result}>
                  <td>{capitalize(result)}</td>
                  <td
                    className={classNames('total-col', {
                      active: activeTotal,
                      'not-focused':
                        query.state &&
                        !(query.state === STOPPED && !query.result) &&
                        !activeTotal,
                    })}
                    onClick={() => updateQuery({ state: STOPPED, result })}
                  >
                    {total}
                  </td>
                  <td
                    className={classNames('last-col', {
                      active: activeLast,
                      'not-focused':
                        query.state &&
                        !(query.state === STOPPED && !query.result) &&
                        !activeLast,
                    })}
                    onClick={() =>
                      updateQuery({
                        state: STOPPED,
                        result,
                        mode: LAST,
                        time,
                      })
                    }
                  >
                    {last}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
};

const resultPropType = PropTypes.shape({
  total: PropTypes.number.isRequired,
  last: PropTypes.number.isRequired,
});

StoppedTasksCard.propTypes = {
  data: PropTypes.shape({
    error: resultPropType.isRequired,
    warning: resultPropType.isRequired,
    success: resultPropType.isRequired,
  }),
  time: timePropType,
  query: queryPropType,
  className: PropTypes.string,
  updateQuery: PropTypes.func,
};

StoppedTasksCard.defaultProps = {
  data: {
    error: { total: 0, last: 0 },
    warning: { total: 0, last: 0 },
    success: { total: 0, last: 0 },
  },
  time: TASKS_DASHBOARD_AVAILABLE_TIMES.H24,
  query: {},
  className: '',
  updateQuery: () => null,
};

export default StoppedTasksCard;
