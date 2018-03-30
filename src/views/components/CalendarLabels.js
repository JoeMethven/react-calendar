import React from 'react';
import ReactDOM from 'react-dom';

export default class CalendarLabels extends React.Component {
  render() {
    const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'].map((item, i) => <li key={i}>{item}</li>)

    return (
      <ul className="calendar-labels">
        {days}
      </ul>
    )
  }
}
