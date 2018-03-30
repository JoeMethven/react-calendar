import React from 'react';
import ReactDOM from 'react-dom';

export default class CalendarDay extends React.Component {
  render() {
    const disabled = this.props.disabled(this.props.day),
          day = typeof this.props.day === 'number' ? <span>{this.props.day}</span> : null

    return (
      <li disabled={disabled} onClick={disabled ? null : () => this.props.handleClick(this.props.day)}>{day}</li>
    )
  }
}
