import React from 'react';
import ReactDOM from 'react-dom';

export default class CalendarDay extends React.Component {
  render() {
    const active = this.props.active ? 'calendar-day-active' : '',
          busy = this.props.busy ? 'calendar-day-busy' : '',
          day = typeof this.props.day === 'number' ? <span>{this.props.day}</span> : null;

    return (
      <li
        className={active + ' ' + busy}
        disabled={this.props.disabled}
        onClick={this.props.disabled ? null : () => this.props.renderDay(this.props.day)}>
        {day}
      </li>
    )
  }
}
