import React from 'react';
import ReactDOM from 'react-dom';

export default class CalendarDay extends React.Component {
  render() {
    const disabled = this.props.disabled(this.props.day),
          active = this.props.active ? this.props.active(this.props.day) : null,
          day = typeof this.props.day === 'number' ? <span>{this.props.day}</span> : null

    return (
      <li className={active} disabled={disabled} onClick={disabled ? null : () => this.props.renderDay(this.props.day)}>{day}</li>
    )
  }
}
